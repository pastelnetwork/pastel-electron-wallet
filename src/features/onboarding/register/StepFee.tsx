import React, { useState, FormEvent, useEffect } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'
import { PrevButton, NextButton } from './Buttons'
import Radio from 'common/components/Radio/Radio'
import { Input } from 'common/components/Inputs'
import Link from 'common/components/Link'
import styles from './Register.module.css'
import { Clipboard } from 'common/components/Icons'
import { useCurrencyName } from 'common/hooks/appInfo'
import PromoCode from './PromoCode'
import {
  PaymentMethods,
  TCentralizedExchangeEntity,
  useRegisterStore,
  targetBalance,
} from './Register.store'
import shallow from 'zustand/shallow'
import { walletRPC } from 'api/pastel-rpc'
import { formatNumber } from 'common/utils/format'

const StepFee = (): JSX.Element => {
  const currencyName = useCurrencyName()
  const [copying, setCopying] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [totalBalance, setTotalBalance] = useState<number>(1000)
  const [addresses, setAddresses] = useState<string[]>([])
  const store = useRegisterStore(
    state => ({
      paymentMethod: state.paymentMethod,
      centralizedExchangeName: state.centralizedExchangeName,
      setCentralizedExchangeName: state.setCentralizedExchangeName,
      promoCode: state.promoCode,
      setPromoCode: state.setPromoCode,
      exchangeAddress: state.exchangeAddress,
      password: state.password,
      username: state.username,
      setExchangeAddress: state.setExchangeAddress,
      goBack: state.goBack,
      goToNextStep: state.goToNextStep,
      createPastelIdQuery: state.createPastelIdQuery,
    }),
    shallow,
  )

  useEffect(() => {
    const getData = async () => {
      const result = await walletRPC.fetchAllAddresses()
      setAddresses(result)

      const [tUnspent, zUnspent] = await Promise.all([
        walletRPC.fetchTListUnspent(),
        walletRPC.fetchZListUnspent(),
      ])
      const unspent = [...tUnspent, ...zUnspent].find(
        item => item.address === store.exchangeAddress,
      )
      setTotalBalance(unspent?.amount || 0)
    }

    getData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
  }, [])

  // maybe it would be better to load this list from somewhere
  const centralizedExs: TCentralizedExchangeEntity[] = [
    {
      name: 'Gemini.com',
    },
    {
      name: 'Kucoin.com',
    },
    {
      name: 'Bitcoin.com',
    },
  ]

  const onChangePayPlatform = (platformName: string, state: boolean) => {
    if (!state) {
      return
    }
    store.setCentralizedExchangeName(platformName)

    const addr = addresses[0]
    store.setExchangeAddress(addr)
    setCopied(false)
  }

  const toClipboard = () => {
    setCopying(true) // animate icon
    setTimeout(() => setCopying(false), 200)

    navigator.clipboard.writeText(store.exchangeAddress)
    setCopied(true)
  }

  const handleNextClick = async () => {
    if (!isSuccess) {
      setSuccess(true)
    } else {
      if (totalBalance < 1) {
        toast.error(
          `You will need ${formatNumber(
            targetBalance,
          )} ${currencyName} coins to write this ticket to the blockchain.`,
        )
        return
      }

      try {
        store.createPastelIdQuery.mutate({
          password: `${store.password}${store.username}`,
          address: store.exchangeAddress,
        })
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  const showWarn =
    !copied &&
    ((store.paymentMethod === PaymentMethods.CentralizedExchange &&
      store.centralizedExchangeName) ||
      store.paymentMethod === PaymentMethods.DecentralizedExchange ||
      store.paymentMethod === PaymentMethods.PslAddress)

  const nextActive =
    (store.paymentMethod === PaymentMethods.AirdropPromoCode &&
      store.promoCode.length > 0) ||
    (store.paymentMethod === PaymentMethods.CentralizedExchange &&
      store.centralizedExchangeName &&
      store.centralizedExchangeName.length > 0 &&
      copied) ||
    (store.paymentMethod === PaymentMethods.DecentralizedExchange && copied) ||
    store.paymentMethod === PaymentMethods.PslAddress

  const isLoading = status === 'loading' || store.createPastelIdQuery.isLoading

  return (
    <div className='flex flex-col h-full'>
      {store.paymentMethod === PaymentMethods.PastelPromoCode ? (
        <PromoCode />
      ) : (
        <>
          <div className='flex-grow pt-28'>
            {store.paymentMethod !== PaymentMethods.AirdropPromoCode && (
              <>
                <h1 className='text-gray-4a text-h3 font-extrabold'>
                  Choose Exchange to Purchase {currencyName}
                </h1>
                <h2 className='text-gray-71 text-base font-normal '>
                  Copy address
                </h2>

                <div className='mt-7'>
                  <div
                    className={cn(
                      'w-full flex justify-between items-center border rounded px-4 py-2',
                      showWarn ? 'border-orange-63' : 'border-gray-200',
                    )}
                  >
                    <div className='mr-3 overflow-hidden overflow-ellipsis h-5'>
                      {store.exchangeAddress}
                    </div>
                    <button type='button' onClick={toClipboard}>
                      <Clipboard
                        size={20}
                        className={cn(
                          'cursor-pointer transition-transform duration-100 ease-in-out text-gray-88',
                          copying ? 'transform scale-150' : '',
                        )}
                      />
                    </button>
                  </div>
                  <div className='text-sm font-medium text-orange-63 h-4'>
                    {showWarn ? 'copy your address first' : ''}
                  </div>
                </div>

                {store.paymentMethod === PaymentMethods.CentralizedExchange && (
                  <div className='mt-5'>
                    <div className='text-base text-gray-a0'>
                      Choose platform and pay
                    </div>

                    {centralizedExs.map((item, i) => (
                      <div className='mt-3' key={i}>
                        <Radio
                          key={i}
                          checked={store.centralizedExchangeName === item.name}
                          onChange={val => onChangePayPlatform(item.name, val)}
                        >
                          <span
                            className={cn(
                              store.centralizedExchangeName === item.name
                                ? 'text-gray-4a font-black text-base'
                                : 'text-gray-4a text-opacity-50 text-base font-medium',
                            )}
                          >
                            {item.name}
                          </span>
                        </Radio>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {store.paymentMethod === PaymentMethods.AirdropPromoCode && (
              <>
                <h1 className='text-gray-23 text-xl font-black'>
                  Airdrop Promo Code
                </h1>
                <h2 className='text-gray-77 text-sm font-normal'>
                  To Request a code, please fill in the form{' '}
                  <Link to='#' className='text-blue-3f'>
                    here
                  </Link>
                </h2>

                <div className={cn('mt-4 airdrop', styles.airdrop)}>
                  <Input
                    className='w-full'
                    type='text'
                    placeholder='Paste your promo code here'
                    onChange={(e: FormEvent<HTMLInputElement>) =>
                      store.setPromoCode(e.currentTarget.value)
                    }
                  />
                  <div />
                </div>
              </>
            )}
          </div>
          <div className='mt-7 flex justify-between'>
            <PrevButton onClick={store.goBack} />
            <NextButton
              className='min-w-160px'
              onClick={handleNextClick}
              text={
                isLoading
                  ? 'Applying'
                  : !isSuccess
                  ? 'Apply'
                  : `Proceed to ${formatNumber(
                      targetBalance,
                    )} ${currencyName} Payment`
              }
              disabled={!nextActive && totalBalance < targetBalance}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default StepFee
