import React, { FormEvent, useState } from 'react'
import { Input } from 'common/components/Inputs'
import { useCurrencyName } from 'common/hooks/appInfo'
import { formatNumber } from 'common/utils/format'
import { PrevButton, NextButton } from './Buttons'
import { isValidPrivateKey } from 'common/utils/wallet'
import { importPastelPromoCode } from 'common/utils/PastelPromoCode'
import { walletRPC } from 'api/pastel-rpc'
import { useRegisterStore, targetBalance } from './Register.store'
import { useMutation, UseMutationResult } from 'react-query'

type TPromoCode = {
  address: string
  balance: number
}

const useImportPromoCode = (): UseMutationResult<TPromoCode, Error, string> => {
  return useMutation(async promoCode => {
    if (!isValidPrivateKey(promoCode)) {
      throw new Error('Promo Code is invalid.')
    }

    const address = await importPastelPromoCode(promoCode)
    if (!address) {
      throw new Error('Promo Code is invalid.')
    }

    const [tUnspent, zUnspent] = await Promise.all([
      walletRPC.fetchTListUnspent(),
      walletRPC.fetchZListUnspent(),
    ])
    const unspent = [...tUnspent, ...zUnspent].find(
      item => item.address === address,
    )

    const balance = unspent?.amount || 0
    if (balance < targetBalance) {
      throw new Error('Promo Code is invalid.')
    }

    return {
      address,
      balance,
    }
  })
}

export default function PromoCode(): JSX.Element {
  const currencyName = useCurrencyName()
  const goBack = useRegisterStore(state => state.goBack)
  const promoCodeQuery = useImportPromoCode()
  const createPastelIdQuery = useRegisterStore(
    state => state.createPastelIdQuery,
  )
  const walletBalance = walletRPC.useTotalBalance()
  const [promoCodeKey, setPromoCodeKey] = useState('')
  const password = useRegisterStore(state => state.password)
  const userName = useRegisterStore(state => state.username)

  const handleNextClick = () => {
    const promoCode = promoCodeQuery.data
    if (promoCode) {
      createPastelIdQuery.mutate({
        password: `${password}${userName}`,
        address: promoCode.address,
      })
    } else {
      promoCodeQuery.mutate(promoCodeKey)
    }
  }

  const isLoading =
    status === 'loading' ||
    createPastelIdQuery.isLoading ||
    promoCodeQuery.isLoading
  const error = promoCodeQuery.error || createPastelIdQuery.error
  const errorMessage = error?.message
  const totalBalance = walletBalance.data?.total

  return (
    <>
      <div className='flex-grow pt-28'>
        <h1 className='text-gray-23 text-xl font-black'>Pastel Promo Code</h1>
        <div className='mt-4 airdrop'>
          <Input
            className='w-full'
            type='text'
            placeholder='Paste your promo code here'
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setPromoCodeKey(e.currentTarget.value.trim())
            }
            isValid={!promoCodeQuery.error}
            errorMessage={errorMessage}
            hint
            hintAsTooltip={false}
            value={promoCodeKey}
            readOnly={isLoading}
          />
        </div>
        {promoCodeQuery.isSuccess && totalBalance && (
          <div className='mt-6 text-gray-71 text-base font-normal'>
            Congratulations, your personalized promotional code has been
            accepted! You now have {formatNumber(totalBalance)} {currencyName}{' '}
            in your wallet.{' '}
            <button
              type='button'
              className='link'
              onClick={() => {
                setPromoCodeKey('')
                promoCodeQuery.reset()
              }}
            >
              Add new pastel promo code.
            </button>
          </div>
        )}
      </div>
      <div className='mt-7 flex justify-between'>
        <PrevButton onClick={goBack} />
        <NextButton
          className='min-w-160px'
          onClick={handleNextClick}
          text={
            isLoading
              ? 'Applying'
              : promoCodeQuery.isSuccess
              ? `Proceed to ${formatNumber(
                  targetBalance,
                )} ${currencyName} Payment`
              : 'Apply'
          }
          disabled={!promoCodeKey || isLoading}
        />
      </div>
    </>
  )
}
