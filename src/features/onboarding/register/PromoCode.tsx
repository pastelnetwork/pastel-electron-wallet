import React, { FormEvent, useState } from 'react'
import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import { PrevButton, NextButton } from './Buttons'
import { isValidPrivateKey } from 'common/utils/wallet'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { walletRPC } from 'api/pastel-rpc'
import {
  useRegisterStore,
  targetBalance,
  PaymentMethods,
} from './Register.store'
import { useMutation, UseMutationResult } from 'react-query'

type TPromoCode = {
  address: string
  balance: number
}

const useImportPromoCode = (): UseMutationResult<TPromoCode, Error, string> => {
  const paymentMethod = useRegisterStore(state => state.paymentMethod)
  return useMutation(async promoCode => {
    if (!isValidPrivateKey(promoCode)) {
      throw new Error(
        paymentMethod === PaymentMethods.PastelPromoCode
          ? 'Promo Code is invalid.'
          : 'PSL Address Private Key is invalid.',
      )
    }

    const address = await importPastelPromoCode(promoCode)
    if (!address) {
      throw new Error(
        paymentMethod === PaymentMethods.PastelPromoCode
          ? 'Promo Code is invalid.'
          : 'PSL Address Private Key is invalid.',
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
  }))
  const isPastelPromoCode =
    store.paymentMethod === PaymentMethods.PastelPromoCode
  const promoCodeQuery = useImportPromoCode()

  const handleNextClick = () => {
    setAddNew(false)
    const promoCode = promoCodeQuery.data
    if (promoCode) {
      store.createPastelIdQuery.mutate({
        password: `${store.password}${store.username}`,
        address: promoCode.address,
      })
    } else {
      promoCodeQuery.mutate(
        isPastelPromoCode ? store.promoCodeKey : store.pslAddressPrivateKey,
      )
    }
  }

  const isLoading =
    status === 'loading' ||
    store.createPastelIdQuery.isLoading ||
    promoCodeQuery.isLoading
  const error = promoCodeQuery.error || store.createPastelIdQuery.error
  const errorMessage = error?.message
  const addressBalance = promoCodeQuery.data?.balance || 0

  let promoCodeIsValid = null
  if (promoCodeQuery.error) {
    promoCodeIsValid = false
  }

  return (
    <>
      <div className='flex-grow pt-28'>
        <h1 className='text-gray-23 text-xl font-black'>
          {isPastelPromoCode
            ? 'Pastel Promo Code'
            : 'PSL Address Private Key Import'}
        </h1>
        <div className='mt-4 airdrop'>
          <Input
            className='w-full'
            type='text'
            placeholder={
              isPastelPromoCode
                ? 'Paste your promo code here'
                : 'PSL Address Private Key here'
            }
            onChange={(e: FormEvent<HTMLInputElement>) => {
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
              isPastelPromoCode
                ? store.promoCodeKey
                : store.pslAddressPrivateKey
            }
            readOnly={isLoading}
          />
        </div>
        {promoCodeQuery.isSuccess && addressBalance && (
          <div className='mt-6 text-gray-71 text-base font-normal'>
            Congratulations, your{' '}
            {isPastelPromoCode
              ? 'personalized promotional code'
              : 'PSL Address Private Key'}{' '}
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
                : 'Add new PSL Address Private Key.'}
            </button>
          </div>
        )}
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={store.goBack} disabled={isLoading} />
        <NextButton
          className='min-w-160px'
          onClick={handleNextClick}
          text={
            isLoading
              ? 'Applying'
              : promoCodeQuery.isSuccess && !isAddNew
              ? `Proceed to ${formatNumber(
                  targetBalance,
                )} ${currencyName} Payment`
              : 'Apply'
          }
          disabled={
            !(isPastelPromoCode
              ? store.promoCodeKey
              : store.pslAddressPrivateKey) ||
            isLoading ||
            (promoCodeQuery.isSuccess &&
              addressBalance < targetBalance &&
              !isAddNew)
          }
        />
      </div>
    </>
  )
}
