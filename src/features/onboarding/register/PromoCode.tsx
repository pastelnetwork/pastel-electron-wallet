import React, { FormEvent, useState, useCallback } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import cn from 'classnames'

import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import { PrevButton, NextButton } from './Buttons'
import AddressList from './AddressList'
import { isValidTPrivateKey } from 'common/utils/wallet'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { encode } from 'common/utils/encryption'
import { walletRPC } from 'api/pastel-rpc'
import {
  useRegisterStore,
  targetBalance,
  PaymentMethods,
  TPromoCode,
} from './Register.store'
import { translate } from 'features/app/translations'

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

    if (!isValidTPrivateKey(promoCode)) {
      throw new Error(
        isPastelPromoCode
          ? translate('promoCodeIsInvalidSupportOnlyTransparentAddressForNow')
          : translate(
              'pslAddressPrivateKeyIsInvalidSupportOnlyTransparentAddressForNow',
              { currencyName },
            ),
      )
    }
    const address = await importPastelPromoCode(promoCode, !!isPastelPromoCode)
    if (!address) {
      throw new Error(
        isPastelPromoCode
          ? translate('promoCodeIsInvalid')
          : translate('pslAddressPrivateKeyIsInvalid', { currencyName }),
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

export default function PromoCode(): JSX.Element {
  const currencyName = useCurrencyName()
  const [isAddNew, setAddNew] = useState(false)
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

  const isPastelPromoCode =
    store.paymentMethod === PaymentMethods.PastelPromoCode
  const promoCodeQuery = useImportPromoCode()

  const handleNextClick = useCallback(() => {
    setAddNew(false)
    if (store.selectedPSLAddress) {
      const password: string = encode(store.password) || ''
      const username: string = store.username || ''
      store.createPastelIdQuery.mutate({
        password: `${password}${username}`,
        address: store.selectedPSLAddress.address,
        username: store.username,
      })
    } else {
      const promoCode = promoCodeQuery.data
      if (promoCode) {
        const password: string = encode(store.password) || ''
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
  }, [store])

  const handleBack = useCallback(() => {
    store.goBack()
  }, [])

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

  const handleInputChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      store.setSelectedPSLAddress(null)
      if (isPastelPromoCode) {
        store.setPromoCode(e.currentTarget.value.trim())
      } else {
        store.setPSLAddressPrivateKey(e.currentTarget.value.trim())
      }
    },
    [store],
  )

  const renderPromoCodeInput = () => {
    return (
      <div className='mt-4 airdrop'>
        <Input
          className='w-full'
          type='text'
          placeholder={
            isPastelPromoCode
              ? translate('pasteYourPromoCodeHere')
              : translate('pslAddressPrivateKeyHere', { currencyName })
          }
          onChange={handleInputChange}
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
          'mt-4 overflow-hidden',
          store.pslAddressPrivateKey &&
            promoCodeQuery.isSuccess &&
            !store.selectedPSLAddress
            ? 'h-[150px]'
            : 'h-[220px]',
        )}
      >
        <AddressList />
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

  const handleAddNewPrivateKey = useCallback(() => {
    if (isPastelPromoCode) {
      store.setPromoCode('')
    } else {
      store.setPSLAddressPrivateKey('')
    }
    promoCodeQuery.reset()
    setAddNew(true)
  }, [])

  return (
    <>
      <div className='flex-grow pt-28'>
        <h1 className='text-gray-23 text-xl font-black'>
          {isPastelPromoCode
            ? translate('pastelPromoCodeTitle')
            : translate('pslAddressPrivateKeyImport', { currencyName })}
        </h1>
        {renderPromoCodeInput()}
        {promoCodeQuery.isSuccess && !store.selectedPSLAddress ? (
          <div className='mt-6 text-gray-71 text-base font-normal'>
            {isPastelPromoCode
              ? translate('congratulationsImportPastelPromoCode', {
                  addressBalance: formatNumber(addressBalance),
                  currencyName,
                })
              : translate('congratulationsImportPastelPSLPrivateKey', {
                  addressBalance: formatNumber(addressBalance),
                  currencyName,
                })}{' '}
            <button
              type='button'
              className='link'
              onClick={handleAddNewPrivateKey}
            >
              {isPastelPromoCode
                ? translate('addNewPastelPromoCode')
                : translate('addNewPSLAddressPrivateKey', { currencyName })}
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
              ? translate('applying')
              : (promoCodeQuery.isSuccess && !isAddNew) ||
                (store.selectedPSLAddress &&
                  store.selectedPSLAddress.balance > targetBalance)
              ? translate('proceedPayment', {
                  targetBalance: formatNumber(targetBalance),
                  currencyName,
                })
              : translate('apply')
          }
          disabled={isValid()}
        />
      </div>
    </>
  )
}
