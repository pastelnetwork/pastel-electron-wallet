import React, { FormEvent, useState, useEffect } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import md5 from 'md5'
import cn from 'classnames'

import { TListUnspentResponse, TZListUnspentResponse } from '../../../types/rpc'
import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber, formatPrice, formatAddress } from 'common/utils/format'
import { PrevButton, NextButton } from './Buttons'
import { isValidPrivateKey } from 'common/utils/wallet'
import Radio from 'common/components/Radio/Radio'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { walletRPC } from 'api/pastel-rpc'
import {
  useRegisterStore,
  targetBalance,
  PaymentMethods,
  TPromoCode,
} from './Register.store'

const useImportPromoCode = (): UseMutationResult<TPromoCode, Error, string> => {
  const paymentMethod = useRegisterStore(state => state.paymentMethod)
  const selectedPSLAddress = useRegisterStore(state => state.selectedPSLAddress)
  const isPastelPromoCode = paymentMethod === PaymentMethods.PastelPromoCode
  const currencyName = useCurrencyName()
  return useMutation(async promoCode => {
    if (selectedPSLAddress) {
      return {
        address: selectedPSLAddress.address,
        balance: selectedPSLAddress.balance,
      }
    }

    if (!isValidPrivateKey(promoCode)) {
      throw new Error(
        isPastelPromoCode
          ? 'Promo Code is invalid.'
          : `${currencyName} Address Private Key is invalid.`,
      )
    }
    const address = await importPastelPromoCode(promoCode, !!isPastelPromoCode)
    if (!address) {
      throw new Error(
        isPastelPromoCode
          ? 'Promo Code is invalid.'
          : `${currencyName} Address Private Key is invalid.`,
      )
    }

    const [tUnspent, zUnspent] = await Promise.all([
      walletRPC.fetchTListUnspent(),
      walletRPC.fetchZListUnspent(),
    ])
    const unspent = [...tUnspent, ...zUnspent].find(
      item => item.address === address,
    )
    const balance = unspent?.amount || 0
    return {
      address,
      balance,
    }
  })
}

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

export default function PromoCode(): JSX.Element {
  const currencyName = useCurrencyName()
  const [isAddNew, setAddNew] = useState(false)
  const [addresses, setAddresses] = useState<TPromoCode[]>([])
  const store = useRegisterStore(state => ({
    goBack: state.goBack,
    promoCodeKey: state.promoCode,
    setPromoCode: state.setPromoCode,
    paymentMethod: state.paymentMethod,
    pslAddressPrivateKey: state.pslAddressPrivateKey,
    setPSLAddressPrivateKey: state.setPSLAddressPrivateKey,
    createPastelIdQuery: state.createPastelIdQuery,
    username: state.username,
    password: state.password,
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

  const isPastelPromoCode =
    store.paymentMethod === PaymentMethods.PastelPromoCode
  const promoCodeQuery = useImportPromoCode()

  const handleNextClick = () => {
    setAddNew(false)
    if (store.selectedPSLAddress) {
      const password: string = md5(store.password) || ''
      const username: string = store.username || ''
      store.createPastelIdQuery.mutate({
        password: `${password}${username}`,
        address: store.selectedPSLAddress.address,
        username: store.username,
      })
    } else {
      const promoCode = promoCodeQuery.data
      if (promoCode) {
        const password: string = md5(store.password) || ''
        const username: string = store.username || ''
        store.createPastelIdQuery.mutate({
          password: `${password}${username}`,
          address: promoCode.address,
          username: store.username,
        })
      } else {
        promoCodeQuery.mutate(
          isPastelPromoCode ? store.promoCodeKey : store.pslAddressPrivateKey,
        )
      }
    }
  }

  const handleBack = () => {
    store.goBack()
  }

  const handleChangeAddress = (address: TPromoCode | null) => {
    store.setSelectedPSLAddress(address)
  }

  const isLoading =
    status === 'loading' ||
    store.createPastelIdQuery.isLoading ||
    promoCodeQuery.isLoading
  const error = promoCodeQuery.error || store.createPastelIdQuery.error
  const errorMessage = error?.message
  const addressBalance = promoCodeQuery.data?.balance || 0

  let promoCodeIsValid: boolean | null = null
  if (promoCodeQuery.error) {
    promoCodeIsValid = false
  }

  const renderPromoCodeInput = () => {
    return (
      <div className='mt-4 airdrop'>
        <Input
          className='w-full'
          type='text'
          placeholder={
            isPastelPromoCode
              ? 'Paste your promo code here'
              : `${currencyName} Address Private Key here`
          }
          onChange={(e: FormEvent<HTMLInputElement>) => {
            store.setSelectedPSLAddress(null)
            if (isPastelPromoCode) {
              store.setPromoCode(e.currentTarget.value.trim())
            } else {
              store.setPSLAddressPrivateKey(e.currentTarget.value.trim())
            }
          }}
          isValid={promoCodeIsValid}
          errorMessage={errorMessage}
          hint
          hintAsTooltip={false}
          value={
            isPastelPromoCode ? store.promoCodeKey : store.pslAddressPrivateKey
          }
          disabled={isLoading}
        />
      </div>
    )
  }

  const renderAddressList = () => {
    if (isPastelPromoCode) {
      return null
    }

    return (
      <div
        className={cn(
          'mt-4 overflow-auto',
          store.pslAddressPrivateKey && promoCodeQuery.isSuccess
            ? 'max-h-[150px]'
            : 'max-h-[220px]',
        )}
      >
        <div className='flex items-center mt-4'>
          <Radio
            checked={!store.selectedPSLAddress?.address}
            onChange={() => handleChangeAddress(null)}
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
        {addresses.map(address => (
          <div className='flex items-center mt-4' key={address.address}>
            <Radio
              checked={store.selectedPSLAddress?.address === address.address}
              onChange={() => handleChangeAddress(address)}
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
          </div>
        ))}
      </div>
    )
  }

  const isValid = () => {
    if (store.selectedPSLAddress) {
      return isLoading || store.selectedPSLAddress.balance < targetBalance
    }

    return (
      !(isPastelPromoCode ? store.promoCodeKey : store.pslAddressPrivateKey) ||
      isLoading ||
      (promoCodeQuery.isSuccess && addressBalance < targetBalance && !isAddNew)
    )
  }

  return (
    <>
      <div className='flex-grow pt-28'>
        <h1 className='text-gray-23 text-xl font-black'>
          {isPastelPromoCode
            ? 'Pastel Promo Code'
            : `${currencyName} Address Private Key Import`}
        </h1>
        {renderPromoCodeInput()}
        {promoCodeQuery.isSuccess && !store.selectedPSLAddress ? (
          <div className='mt-6 text-gray-71 text-base font-normal'>
            Congratulations, your{' '}
            {isPastelPromoCode
              ? 'personalized promotional code'
              : `${currencyName} Address Private Key`}{' '}
            has been accepted! You now have {formatNumber(addressBalance)}{' '}
            {currencyName} in your wallet.{' '}
            <button
              type='button'
              className='link'
              onClick={() => {
                if (isPastelPromoCode) {
                  store.setPromoCode('')
                } else {
                  store.setPSLAddressPrivateKey('')
                }
                promoCodeQuery.reset()
                setAddNew(true)
              }}
            >
              {isPastelPromoCode
                ? 'Add new pastel promo code.'
                : `Add new ${currencyName} Address Private Key.`}
            </button>
          </div>
        ) : null}
        {renderAddressList()}
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={handleBack} disabled={isLoading} />
        <NextButton
          className='min-w-160px'
          onClick={handleNextClick}
          text={
            isLoading
              ? 'Applying'
              : (promoCodeQuery.isSuccess && !isAddNew) ||
                (store.selectedPSLAddress &&
                  store.selectedPSLAddress.balance > targetBalance)
              ? `Proceed to ${formatNumber(
                  targetBalance,
                )} ${currencyName} Payment`
              : 'Apply'
          }
          disabled={isValid()}
        />
      </div>
    </>
  )
}
