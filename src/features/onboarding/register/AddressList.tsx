import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'

import { useCurrencyName } from 'common/hooks/appInfo'
import Scrollbar from 'common/components/Scrollbar'
import Radio from 'common/components/Radio/Radio'
import { formatPrice, formatAddress } from 'common/utils/format'
import { walletRPC } from 'api/pastel-rpc'
import { useRegisterStore, TPromoCode } from './Register.store'
import { TListUnspentResponse, TZListUnspentResponse } from '../../../types/rpc'

const generateAddresses = (
  tUnspent: TListUnspentResponse,
  zUnspent: TZListUnspentResponse,
): TPromoCode[] => {
  let balances: TPromoCode[] = []
  tUnspent.forEach(t => {
    const balance = balances.find(b => b.address === t.address)
    if (!balance) {
      balances.push({
        address: t.address,
        balance: t.amount,
      })
    } else {
      balances = balances.map(b =>
        b.address === t.address ? { ...b, balance: t.amount + b.balance } : b,
      )
    }
  })
  zUnspent.forEach(z => {
    const balance = balances.find(b => b.address === z.address)
    if (!balance) {
      balances.push({
        address: z.address,
        balance: z.amount,
      })
    } else {
      balances = balances.map(b =>
        b.address === z.address ? { ...b, balance: z.amount + b.balance } : b,
      )
    }
  })

  return balances
}

function AddressItem({
  address,
  currencyName,
}: {
  address: TPromoCode
  currencyName: string
}): JSX.Element {
  const store = useRegisterStore(state => ({
    selectedPSLAddress: state.selectedPSLAddress,
    setSelectedPSLAddress: state.setSelectedPSLAddress,
  }))

  const handleChangeAddress = useCallback(() => {
    store.setSelectedPSLAddress(address)
  }, [])

  return (
    <Radio
      checked={store.selectedPSLAddress?.address === address.address}
      onChange={handleChangeAddress}
      variant='secondary'
    >
      <span
        className={cn(
          'text-base leading-5',
          store.selectedPSLAddress?.address === address.address
            ? 'text-gray-4a font-extrabold'
            : 'text-gray-4a text-opacity-50 font-medium',
        )}
      >
        {formatAddress(address.address, 12, -4)}(
        {formatPrice(address.balance, currencyName)})
      </span>
    </Radio>
  )
}

export default function AddressList(): JSX.Element {
  const [addresses, setAddresses] = useState<TPromoCode[]>([])
  const currencyName = useCurrencyName()
  const store = useRegisterStore(state => ({
    selectedPSLAddress: state.selectedPSLAddress,
    setSelectedPSLAddress: state.setSelectedPSLAddress,
  }))

  useEffect(() => {
    const fetchData = async () => {
      const [tUnspent, zUnspent] = await Promise.all([
        walletRPC.fetchTListUnspent(),
        walletRPC.fetchZListUnspent(),
      ])

      setAddresses(generateAddresses(tUnspent, zUnspent))
    }

    fetchData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  })

  const handleChangeAddress = useCallback(() => {
    store.setSelectedPSLAddress(null)
  }, [])

  const renderNoneOption = () => (
    <div className='flex items-center mt-4'>
      <Radio
        checked={!store.selectedPSLAddress?.address}
        onChange={handleChangeAddress}
        variant='secondary'
      >
        <span
          className={cn(
            'text-base leading-5',
            !store.selectedPSLAddress?.address
              ? 'text-gray-4a font-extrabold'
              : 'text-gray-4a text-opacity-50 font-medium',
          )}
        >
          None
        </span>
      </Radio>
    </div>
  )

  return (
    <Scrollbar>
      {renderNoneOption()}
      {addresses.map(address => (
        <div className='flex items-center mt-4' key={address.address}>
          <AddressItem address={address} currencyName={currencyName} />
        </div>
      ))}
    </Scrollbar>
  )
}
