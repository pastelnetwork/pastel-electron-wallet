import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import { walletRPC } from 'api/pastel-rpc'
import { TPaymentSources } from './walletScreen.types'
import { useAddressBook } from 'common/hooks'
import Alert from 'common/components/Alert'
import { Button } from 'common/components/Buttons'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import Breadcrumbs from 'common/components/Breadcrumbs'
import BalanceCards from './BalanceCards'
import { ElectricityIcon, Clock } from 'common/components/Icons'
import WalletAddresses from './WalletAddresses'
import { useToggle } from 'react-use'
import { useCurrencyName } from '../../common/hooks/appInfo'
import {
  TWalletScreenContextValues,
  useWalletScreenContext,
  WalletScreenContext,
} from './walletScreen.context'
import { useAddressesLastActivityTime } from '../pastelDB/wallet/transactions.repo'
import {
  useCreateNewAddress,
  useFilterAddresses,
  useSelectedAmount,
} from './walletScreen.hooks'
import { TAddress } from '../../types/rpc'
import {
  useCombineQueryArray,
  useCombineQueryObject,
} from '../../common/utils/query'
import { ROUTES } from '../../common/constants/routes'
import Modals from './Modals'
import { useReadPastelPromoCode } from 'common/utils/PastelPromoCode'

export type TSelectionPslProps = {
  address: string
  amount: number
  valid: boolean
  date: number
}

export default function WalletScreen(): JSX.Element {
  const tAddressesOriginal = walletRPC.useTAddresses()
  const tAddressAmounts = walletRPC.useTAddressBalances()
  const zAddressesOriginal = walletRPC.useZAddresses()
  const zAddressAmounts = walletRPC.useZAddressBalances()
  const totalBalances = walletRPC.useTotalBalance()
  const addressBook = useAddressBook()
  const lastActivityTimes = useAddressesLastActivityTime()
  const [hideEmptyAddresses, toggleHideEmptyAddresses] = useToggle(false)
  const [selectedAddresses, setSelectedAddresses] = useState<TAddress[]>([])
  const [paymentSources, setPaymentSources] = useState<TPaymentSources>({})
  const [activeTab, setActiveTab] = useState(0)
  const [activePeriod, setActivePeriod] = useState(0)
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)
  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)
  const [isExportKeysModalOpen, setExportKeysModalOpen] = useState(false)
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false)
  const [
    isAddPastelPromoCodeModalOpen,
    setAddPastelPromoCodeModalOpen,
  ] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<string>()

  const tAddresses = useFilterAddresses(
    tAddressesOriginal,
    tAddressAmounts,
    hideEmptyAddresses,
  )
  const zAddresses = useFilterAddresses(
    zAddressesOriginal,
    zAddressAmounts,
    hideEmptyAddresses,
  )

  const allAddresses = useCombineQueryArray([tAddresses, zAddresses])
  const allAddressAmounts = useCombineQueryObject([
    tAddressAmounts,
    zAddressAmounts,
  ])

  const selectedAmount = useSelectedAmount({
    addresses: allAddresses.data,
    amounts: allAddressAmounts.data,
    selectedAddresses,
    paymentSources,
  })

  const pastelPromoCode = useReadPastelPromoCode()

  const values: TWalletScreenContextValues = {
    tAddresses,
    tAddressAmounts,
    zAddresses,
    zAddressAmounts,
    allAddresses,
    allAddressAmounts,
    totalBalances,
    addressBook,
    lastActivityTimes,
    hideEmptyAddresses,
    toggleHideEmptyAddresses,
    selectedAddresses,
    setSelectedAddresses,
    paymentSources,
    setPaymentSources,
    activeTab,
    setActiveTab,
    activePeriod,
    setActivePeriod,
    isPaymentModalOpen,
    setPaymentModalOpen,
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
    isExportKeysModalOpen,
    setExportKeysModalOpen,
    isQRCodeModalOpen,
    setIsQRCodeModalOpen,
    isAddPastelPromoCodeModalOpen,
    setAddPastelPromoCodeModalOpen,
    currentAddress,
    setCurrentAddress,
    selectedAmount,
    pastelPromoCode,
  }

  return (
    <WalletScreenContext.Provider value={values}>
      <WalletScreenContent />
    </WalletScreenContext.Provider>
  )
}

const WalletScreenContent = (): JSX.Element => {
  const currencyName = useCurrencyName()
  const {
    activePeriod,
    setActivePeriod,
    setTransactionHistoryModalOpen,
    totalBalances,
    allAddresses,
    setPaymentModalOpen,
    setAddPastelPromoCodeModalOpen,
  } = useWalletScreenContext()

  const createNewAddress = useCreateNewAddress()

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Wallet',
            route: ROUTES.WALLET,
          },
          {
            label: 'Transparent',
          },
        ]}
      />

      <div className='w-full h-20 flex justify-between items-center bg-white px-60px'>
        <div className='font-extrabold text-h1 text-gray-1a flex items-center'>
          <div className='mr-8 text-gray-1a text-h1-heavy'>
            {currencyName} Wallet
          </div>
          <MultiToggleSwitch
            data={[
              { label: 'Week', count: 1122 },
              { label: 'Month', count: 12 },
              { label: 'Year', count: 12 },
            ]}
            activeIndex={activePeriod}
            onToggle={setActivePeriod}
            itemActiveClassName='bg-gray-4a rounded-full text-white'
            countInactiveClassName='bg-warning-hover font-extrabold'
          />
        </div>
        <div
          className='flex cursor-pointer'
          onClick={() => setTransactionHistoryModalOpen(true)}
        >
          <Clock size={18} className='text-blue-3f' />
          <div className='ml-3.5 text-blue-3f text-h4-leading-22'>
            Transaction history
          </div>
        </div>
      </div>

      <div className='bg-gray-f8 pt-6 sm:px-10 md:px-60px'>
        <BalanceCards />
        {totalBalances.data?.total && totalBalances.data?.total <= 0 && (
          <Alert
            variant='warning'
            className='mt-7 relative'
            showClose={true}
            onShowing={true}
          >
            <strong className='font-bold'>Warning! </strong>
            <span className='block sm:inline'>
              Your total balance is empty now.
            </span>
          </Alert>
        )}

        <WalletAddresses />

        <div className='flex justify-end mt-5 pb-[30px]'>
          <Button
            onClick={() => setAddPastelPromoCodeModalOpen(true)}
            variant='secondary'
            className='w-[240px] px-0'
            childrenClassName='w-full'
          >
            <div className='flex items-center ml-5'>
              <div className='text-blue-3f text-h5-medium'>+</div>{' '}
              <div className='ml-2 text-blue-3f text-h5-medium'>
                Add Pastel Promo Code
              </div>
            </div>
          </Button>

          {allAddresses.data?.length && (
            <Button
              variant='secondary'
              className='w-[264px] ml-30px px-0'
              childrenClassName='w-full'
              onClick={createNewAddress}
            >
              <div className='flex items-center ml-[19px]'>
                <ElectricityIcon size={11} className='text-blue-3f py-3' />
                <div className='ml-11px text-blue-3f text-h5-medium'>
                  Generate a new {currencyName} Address
                </div>
              </div>
            </Button>
          )}
          <Button
            onClick={() => setPaymentModalOpen(true)}
            className='ml-30px w-[190px] px-0'
            childrenClassName='w-full'
          >
            <div className='flex items-center ml-5'>
              <div className='text-white text-h4-leading-28-heavy'>+</div>{' '}
              <div className='ml-2 text-white text-h5-heavy'>
                Create a payment
              </div>
            </div>
          </Button>
        </div>
      </div>

      <Modals />

      <ToastContainer
        className='flex flex-grow w-auto'
        hideProgressBar={true}
        autoClose={false}
      />
    </div>
  )
}
