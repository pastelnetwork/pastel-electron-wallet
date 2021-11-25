import React, { FormEvent, useState, useCallback } from 'react'
import { useMutation, UseMutationResult } from 'react-query'
import cn from 'classnames'

import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import { PrevButton, NextButton } from './Buttons'
import AddressList from './AddressList'
import { isValidPrivateKey } from 'common/utils/wallet'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { encode } from 'common/utils/encryption'
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

  const handleNextClick = () => {
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
  }

  const handleBack = () => {
    store.goBack()
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

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    store.setSelectedPSLAddress(null)
    if (isPastelPromoCode) {
      store.setPromoCode(e.currentTarget.value.trim())
    } else {
      store.setPSLAddressPrivateKey(e.currentTarget.value.trim())
    }
  }, [])

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
          store.pslAddressPrivateKey && promoCodeQuery.isSuccess
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
              onClick={handleAddNewPrivateKey}
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
