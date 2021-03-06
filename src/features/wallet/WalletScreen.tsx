import React, { useState, useEffect, useCallback, memo } from 'react'
import { useLocation } from 'react-router-dom'

import {
  useTAddresses,
  useTAddressBalances,
  useZAddresses,
  useZAddressBalances,
  useTotalBalance,
  walletRPC,
  transactionRPC,
} from 'api/pastel-rpc'
import { TPaymentSources, TDate } from './walletScreen.types'
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
import { useFilterAddresses, useSelectedAmount } from './walletScreen.hooks'
import { TAddress } from '../../types/rpc'
import {
  useCombineQueryArray,
  useCombineQueryObject,
} from '../../common/utils/query'
import { ROUTES } from '../../common/constants/routes'
import Modals from './Modals'
import { useReadPastelPromoCode } from 'common/utils/PastelPromoCode'
import dayjs from 'common/utils/initDayjs'
import { translate } from 'features/app/translations'

export type TSelectionPslProps = {
  address: string
  amount: number
  valid: boolean
  date: number
}

function CreatePaymentButton({
  setPaymentModalOpen,
}: {
  setPaymentModalOpen: (val: boolean) => void
}): JSX.Element {
  const handleClick = useCallback(() => {
    setPaymentModalOpen(true)
  }, [])

  return (
    <Button
      onClick={handleClick}
      className='ml-30px w-[190px] px-0'
      childrenClassName='w-full'
    >
      <div className='flex items-center ml-5'>
        <div className='text-white text-h4-leading-28-heavy'>+</div>{' '}
        <div className='ml-2 text-white text-h5-heavy'>
          {translate('createAPaymentButton')}
        </div>
      </div>
    </Button>
  )
}

function PastelPromoCodeButton({
  setAddPastelPromoCodeModalOpen,
}: {
  setAddPastelPromoCodeModalOpen: (val: boolean) => void
}): JSX.Element {
  const handleClick = useCallback(() => {
    setAddPastelPromoCodeModalOpen(true)
  }, [])

  return (
    <Button
      onClick={handleClick}
      variant='secondary'
      className='w-[240px] px-0'
      childrenClassName='w-full'
    >
      <div className='flex items-center ml-5'>
        <div className='text-blue-3f text-h5-medium'>+</div>{' '}
        <div className='ml-2 text-blue-3f text-h5-medium'>
          {translate('addPastelPromoCode')}
        </div>
      </div>
    </Button>
  )
}

function AddNewAddressButton({
  onCreateNewAddress,
  isLoading,
}: {
  onCreateNewAddress: () => void
  isLoading: boolean
}): JSX.Element {
  const currencyName = useCurrencyName()

  const handleClick = useCallback(() => {
    onCreateNewAddress()
  }, [])

  return (
    <Button
      variant='secondary'
      className='w-[264px] ml-30px px-0'
      childrenClassName='w-full'
      onClick={handleClick}
      disabled={isLoading}
    >
      <div className='flex items-center ml-[19px]'>
        <ElectricityIcon size={11} className='text-blue-3f py-3' />
        <div className='ml-11px text-blue-3f text-h5-medium'>
          {translate('addNewAddressButton', { currencyName })}
        </div>
      </div>
    </Button>
  )
}

const WalletScreenContent = memo(function WalletScreenContent(): JSX.Element {
  const location = useLocation()
  const currencyName = useCurrencyName()
  const {
    activePeriod,
    setActivePeriod,
    setTransactionHistoryModalOpen,
    totalBalances,
    allAddresses,
    setPaymentModalOpen,
    setAddPastelPromoCodeModalOpen,
    activeTab,
    tAddresses,
    zAddresses,
    setExportKeysModalOpen,
    setCurrentAddress,
    setNewAddress,
    selectedDate,
    setSelectedDate,
  } = useWalletScreenContext()
  const [isLoading, setLoading] = useState(false)
  const [filterTransactions, setFilterTransactions] = useState({
    week: 0,
    month: 0,
    year: 0,
  })
  const [date, setDate] = useState<Date[]>([])

  const createNewAddress = useCallback(async () => {
    setLoading(true)
    const isZAddress = activeTab === 2
    const result = await walletRPC.createNewAddress(isZAddress)
    if (result) {
      if (isZAddress) {
        zAddresses.refetch()
      } else {
        tAddresses.refetch()
      }
      setCurrentAddress(result)
      setExportKeysModalOpen(true)
      setNewAddress(true)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (location.state) {
      setPaymentModalOpen(true)
    }
  }, [location])

  useEffect(() => {
    const getTransaction = async () => {
      const trans = await transactionRPC.fetchTAndZTransactions()
      const dayOfWeek = dayjs()
        .add(-7, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
      const dayOfMonth = dayjs()
        .add(-30, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
      const dayOfYear = dayjs()
        .add(-365, 'day')
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
      setDate([dayOfWeek.toDate(), dayOfMonth.toDate(), dayOfYear.toDate()])
      setFilterTransactions({
        week: trans.filter(
          t =>
            dayjs.unix(parseInt(t.time?.toString())).valueOf() >=
            dayOfWeek.valueOf(),
        ).length,
        month: trans.filter(
          t =>
            dayjs.unix(parseInt(t.time?.toString())).valueOf() >=
            dayOfMonth.valueOf(),
        ).length,
        year: trans.filter(
          t =>
            dayjs.unix(parseInt(t.time?.toString())).valueOf() >=
            dayOfYear.valueOf(),
        ).length,
      })

      setSelectedDate({
        ...selectedDate,
        start: dayOfWeek.toDate(),
      })
    }

    getTransaction()
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

  const onTabToggle = useCallback((index: number) => {
    setActivePeriod(index)
    setSelectedDate({
      ...selectedDate,
      start: date[index],
    })
  }, [])

  const handleShowTransactionHistoryModal = useCallback(() => {
    setTransactionHistoryModalOpen(true)
  }, [])

  const renderWalletHeader = () => {
    return (
      <>
        <div className='font-extrabold text-h1 text-gray-1a flex items-center'>
          <div className='mr-8 text-gray-1a text-h1-heavy'>
            {translate('pslWallet', { currencyName })}
          </div>
          <MultiToggleSwitch
            data={[
              { label: translate('week'), count: filterTransactions.week },
              { label: translate('month'), count: filterTransactions.month },
              { label: translate('year'), count: filterTransactions.year },
            ]}
            activeIndex={activePeriod}
            onToggle={onTabToggle}
            itemActiveClassName='bg-gray-4a rounded-full text-white'
            countInactiveClassName='bg-warning-hover font-extrabold'
            showEmpty
          />
        </div>
        <div
          className='flex cursor-pointer'
          onClick={handleShowTransactionHistoryModal}
          role='button'
          aria-hidden
          tabIndex={0}
        >
          <Clock size={18} className='text-blue-3f' />
          <div className='ml-3.5 text-blue-3f text-h4-leading-22'>
            {translate('transactionHistory')}
          </div>
        </div>
      </>
    )
  }

  const renderEmptyContentBlock = () => {
    return totalBalances.data?.total && totalBalances.data?.total <= 0 ? (
      <Alert variant='warning' className='mt-7 relative' showClose onShowing>
        <strong className='font-bold'>{translate('warning')}! </strong>
        <span className='block sm:inline'>
          {translate('yourTotalBalanceIsEmptyNow')}
        </span>
      </Alert>
    ) : null
  }

  const renderWalletScreenBody = () => (
    <div className='bg-gray-f8 pt-6 sm:px-10 md:px-60px'>
      <BalanceCards />
      {renderEmptyContentBlock()}
      <WalletAddresses />
      <div className='flex justify-end mt-5 pb-[30px]'>
        <PastelPromoCodeButton
          setAddPastelPromoCodeModalOpen={setAddPastelPromoCodeModalOpen}
        />
        {allAddresses.data?.length ? (
          <AddNewAddressButton
            onCreateNewAddress={createNewAddress}
            isLoading={isLoading}
          />
        ) : null}
        <CreatePaymentButton setPaymentModalOpen={setPaymentModalOpen} />
      </div>
    </div>
  )

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: translate('wallet'),
            route: ROUTES.WALLET,
          },
          {
            label: translate('transparent'),
          },
        ]}
      />
      <div className='w-full h-20 flex justify-between items-center bg-white px-60px'>
        {renderWalletHeader()}
      </div>
      {renderWalletScreenBody()}
      <Modals />
    </div>
  )
})

export default function WalletScreen(): JSX.Element {
  const tAddressesOriginal = useTAddresses()
  const tAddressAmounts = useTAddressBalances()
  const zAddressesOriginal = useZAddresses()
  const zAddressAmounts = useZAddressBalances()
  const totalBalances = useTotalBalance()
  const addressBook = useAddressBook()
  const lastActivityTimes = useAddressesLastActivityTime()
  const [isNewAddress, setNewAddress] = useToggle(false)
  const [hideEmptyAddresses, toggleHideEmptyAddresses] = useToggle(true)
  const [selectedAddresses, setSelectedAddresses] = useState<TAddress[]>([])
  const [selectedAddressesModal, setSelectedAddressesModal] = useState<
    TAddress[]
  >([])
  const [paymentSources, setPaymentSources] = useState<TPaymentSources>({})
  const [
    paymentSourcesModal,
    setPaymentSourcesModal,
  ] = useState<TPaymentSources>({})
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
  const [selectedDate, setSelectedDate] = useState<TDate>({
    start: new Date(),
    end: new Date(),
  })

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
    paymentSourcesModal,
    setPaymentSourcesModal,
    selectedAddressesModal,
    setSelectedAddressesModal,
    isNewAddress,
    setNewAddress,
    selectedDate,
    setSelectedDate,
  }

  return (
    <WalletScreenContext.Provider value={values}>
      <WalletScreenContent />
    </WalletScreenContext.Provider>
  )
}
