import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import cn from 'classnames'

import Tooltip from 'common/components/Tooltip'
import Toggle from 'common/components/Toggle'
import Select from 'common/components/Select/Select'
import { Button } from 'common/components/Buttons'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import Table, { TRow } from 'common/components/Table'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import Breadcrumbs from 'common/components/Breadcrumbs'
import Typography, { TypographyVariant } from 'common/components/Typography'
import { WalletRPC } from 'api/pastel-rpc'
import {
  TAddressRow,
  TBalanceCard,
  TTotalBalance,
  TAddressBalance,
} from 'types/rpc'
import { useAppSelector } from 'redux/hooks'
import { RootState } from '../../redux/store'
import dayjs from 'dayjs'
import { AddressForm } from './AddressForm'
import Alert from 'common/components/Alert'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { isSapling } from 'api/helpers'
import { useAddressBook } from 'common/hooks'

import styles from './WalletScreen.module.css'

import {
  ShieldedBalance,
  TotalBalance,
  TransparencyBalance,
  ElectricityIcon,
  Clock,
  EliminationIcon,
  FilePDFIcon,
  QRCode,
} from 'common/components/Icons'

const paymentSources = [
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
  },
  {
    hash: 'Michael Francis',
  },
]

enum Tab {
  GENERAL,
  BOARD,
  MYSECURITY,
}

type TBalanceCarProps = TBalanceCard & { tooltipWidth: number }

const WalletScreen = (): JSX.Element => {
  const { info } = useAppSelector(state => state.appInfo)
  const Columns = [
    {
      key: 'address',
      colClasses: 'w-1/3 text-h6 leading-5 font-normal',
      name: 'Address name',
      headerColClasses: '-ml-5',
      custom: (value: string | number, row: TRow | undefined) => (
        <AddressForm
          address={value.toString()}
          currentRow={row}
          saveAddressLabel={saveAddressLabel}
        />
      ),
    },
    {
      key: 'time',
      name: 'Last Activity',
      colClasses: 'w-190px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: () => (
        <Typography
          variant={TypographyVariant.h5_16_24_medium}
          customColor='text-gray-71'
          className='mr-3 md:mr-0'
        >
          {dayjs(lastFetched).fromNow(true)}
        </Typography>
      ),
    },
    {
      key: 'qrCode',
      name: 'Address QR',
      colClasses:
        'min-w-80px w-132px 1500px:w-244px text-h6 leading-5 font-normal text-center',
      custom: () => (
        <div className='flex pl-30px'>
          <QRCode size={20} />
        </div>
      ),
    },

    {
      key: 'address',
      name: 'Keys',
      colClasses:
        'min-w-130px w-176px 1500px:w-244px flex-grow-0 text-h6 leading-5 font-normal',
      custom: (value: string | number) => {
        return (
          <div className='flex items-center'>
            <Typography
              variant={TypographyVariant.h5_16_24_medium}
              customColor='text-gray-71'
            >
              private key
            </Typography>
            <span
              onClick={() => {
                setCurrentAddress(value.toString())
                setExportKeysModalOpen(true)
              }}
            >
              <FilePDFIcon
                size={20}
                className='text-gray-88 ml-9px cursor-pointer'
              />
            </span>
          </div>
        )
      },
    },
    {
      key: 'amount',
      name: 'Balance',
      colClasses: 'w-131px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: (value: string | number) => (
        <Typography
          variant={TypographyVariant.h5_16_24_medium}
          customColor='text-gray-71'
        >
          {info?.currencyName}{' '}
          <NumberFormat
            value={value}
            displayType='text'
            thousandSeparator={true}
          />
        </Typography>
      ),
    },
    {
      key: 'psl',
      name: '',
      colClasses: 'min-w-[120px] w-[120px]',
      custom: (value: number | string) => (
        <div className='z-0'>
          <Select
            className='text-gray-2d w-28 bg-white'
            autocomplete={true}
            min={100}
            max={totalBalances?.total || 20000}
            step={100}
            value={typeof value === 'string' ? parseInt(value) : value}
            onChange={async () => {
              // TODO: Implement later
              // const amount = +(value || 0)
              // const address = row?.address?.toString() || ''
              // sendPsl(amount, address)
            }}
          />
        </div>
      ),
    },
  ]
  const cardItems = [
    {
      style: {
        type: 'total_balance',
        info: true,
      },
      psl: 0,
      activeIcon: <TotalBalance />,
      inactiveIcon: <TotalBalance variant='inactive' />,
      info: 'Total Balance',
      tooltipWidth: 108,
    },
    {
      style: {
        type: 'transparent',
        info: true,
      },
      psl: 0,
      activeIcon: <TransparencyBalance />,
      inactiveIcon: <TransparencyBalance variant='inactive' />,
      info: 'Transparent Information',
      tooltipWidth: 130,
    },
    {
      style: {
        type: 'shielded',
        info: true,
      },
      psl: 0,
      activeIcon: <ShieldedBalance />,
      inactiveIcon: <ShieldedBalance variant='inactive' />,
      info: 'Shielded Information',
      tooltipWidth: 150,
    },
  ]

  const { lastFetched } = useAppSelector<RootState['pastelPrice']>(
    ({ pastelPrice }) => pastelPrice,
  )

  const walletRPC = new WalletRPC()

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)

  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)

  const [isExportKeysModalOpen, setExportKeysModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState('')
  const [active, setActive] = useState(0)
  const [tabActive, setTabActive] = useState<number>(Tab.GENERAL)

  const [selectedAmount, setSelectedAmount] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])
  const [balanceCards, setBalanceCards] = useState<TBalanceCarProps[]>(
    cardItems,
  )
  const [totalBalances, setTotalBalances] = useState<TTotalBalance>()
  const [walletAddresses, setWalletAddresses] = useState<TAddressRow[]>([])
  const [walletOriginAddresses, setWalletOriginAddresses] = useState<
    TAddressRow[]
  >([])
  const {
    addressBook,
    updateAddressBook,
    isAddressBookLoaded,
  } = useAddressBook()
  /**
   * Fetch total balances
   */
  const fetchTotalBalances = async () => {
    // Total balance
    const balances: TTotalBalance = await walletRPC.fetchTotalBalance()
    setTotalBalances(balances)
    setBalanceCards([
      {
        style: {
          type: 'total_balance',
          info: true,
        },
        psl: balances.total,
        activeIcon: <TotalBalance />,
        inactiveIcon: <TotalBalance variant='inactive' />,
        info: 'Total Balance',
        tooltipWidth: 108,
      },
      {
        style: {
          type: 'transparent',
          info: true,
        },
        psl: balances.transparent,
        activeIcon: <TransparencyBalance />,
        inactiveIcon: <TransparencyBalance variant='inactive' />,
        info: 'Transparent Information',
        tooltipWidth: 130,
      },
      {
        style: {
          type: 'shielded',
          info: true,
        },
        psl: balances.private,
        activeIcon: <ShieldedBalance />,
        inactiveIcon: <ShieldedBalance variant='inactive' />,
        info: 'Shielded Information',
        tooltipWidth: 150,
      },
    ])
  }

  /**
   * Fetch wallet addresses
   */
  const fetchWalletAddresses = async () => {
    // Get addresses with balance
    const balanceAddresses = await walletRPC.fetchTandZAddressesWithBalance()
    const addresses: TAddressRow[] = balanceAddresses.map(
      (a: TAddressBalance) => {
        const address = a.address.toString()
        const type = isSapling(address) ? 'shielded' : 'transparent'
        const [book] = addressBook.filter(b => b.address === address) || []
        return {
          id: address,
          address: address,
          amount: a.balance,
          psl: info.pslPrice || 0,
          type: type,
          time: '',
          qrCode: '',
          viewKey: '',
          privateKey: '',
          addressNick: book ? book.label : '',
        } as TAddressRow
      },
    )
    setWalletAddresses(addresses)
    setWalletOriginAddresses(addresses)
  }

  const saveAddressLabel = (address: string, label: string): void => {
    // Update address nick
    const newWalletAddress: TAddressRow[] = walletAddresses.map(a => {
      return {
        ...a,
        addressNick: a.address === address ? label : a.addressNick || '',
      }
    })
    setWalletAddresses(newWalletAddress)

    updateAddressBook({ address, label })
  }

  useEffect(() => {
    const getTotalBalances = async () => {
      await Promise.all([fetchTotalBalances(), fetchWalletAddresses()])
    }
    if (isAddressBookLoaded) {
      getTotalBalances()
    }
  }, [isAddressBookLoaded])

  useEffect(() => {
    let tempSelectedAmount = 0
    walletAddresses.forEach(item => {
      for (let i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i] === item.address) {
          if (item.amount) {
            tempSelectedAmount += item.amount
          }
        }
      }
    })
    setSelectedAmount(tempSelectedAmount)
  }, [selectedRows, walletAddresses])

  const setSelectedRowsFunction = (row: TRow) => {
    if (row) {
      const temp = selectedRows
      if (temp.includes(row.address.toString())) {
        temp.forEach((item, index) => {
          item == row.address.toString() && temp.splice(index, 1)
        })
      } else {
        temp.push(row.address.toString())
      }
      setSelectedRows([...temp])
    }
  }

  const hideEmptyAddress = (check: boolean) => {
    if (check) {
      setWalletAddresses(walletOriginAddresses.filter(a => a.amount > 0))
    } else {
      setWalletAddresses(walletOriginAddresses)
    }
  }

  const onTabToggle = (index: number) => {
    setTabActive(index)
  }

  const temp = [
    ...walletAddresses,
    ...walletAddresses,
    ...walletAddresses,
    ...walletAddresses,
    ...walletAddresses,
    ...walletAddresses,
  ]

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Wallet',
            route: '/wallet',
          },
          {
            label: 'Transparent',
          },
        ]}
      />
      <div className='w-full h-20 flex justify-between items-center bg-white px-60px'>
        <div className='font-extrabold text-h1 text-gray-1a flex items-center'>
          <Typography
            variant={TypographyVariant.h1_32_40_heavy}
            customColor='text-gray-1a'
            className='mr-8'
          >
            {info?.currencyName} Wallet
          </Typography>
          <MultiToggleSwitch
            data={[
              { label: 'Week', count: 1122 },
              { label: 'Month', count: 12 },
              { label: 'Year', count: 12 },
            ]}
            activeIndex={tabActive}
            onToggle={onTabToggle}
            itemActiveClassName='bg-gray-4a rounded-full text-white'
            countInactiveClassName='bg-warning-hover font-extrabold'
          />
        </div>
        <div
          className='flex cursor-pointer'
          onClick={() => setTransactionHistoryModalOpen(true)}
        >
          <Clock size={18} className='text-blue-3f' />
          <Typography
            variant={TypographyVariant.text_16_22_roman}
            customColor='text-blue-3f'
            className='ml-3.5'
          >
            Transaction history
          </Typography>
        </div>
      </div>

      <div className='bg-gray-f8 pt-6 sm:px-10 md:px-60px'>
        <div className='flex justify-between '>
          {balanceCards.map((card, index) => (
            <div
              key={index}
              onClick={() => {
                setActive(index)
              }}
              className={cn(
                'relative cursor-pointer w-1/3',
                index < balanceCards.length - 1 && 'mr-17px',
              )}
            >
              <div className='absolute top-15px right-15px'>
                {card.style.info ? (
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content={card.info}
                    width={card.tooltipWidth}
                    type='top'
                  >
                    <EliminationIcon size={20} className='text-gray-8e' />
                  </Tooltip>
                ) : null}
              </div>
              <div
                className={cn(
                  'font-extrabold flex h-124px border-gray-e7 border rounded-lg',
                  active === index && 'bg-white',
                )}
              >
                <div className='pl-4 md:pl-4 lg:pl-4 xl:pl-39px flex items-center'>
                  {active === index ? card.activeIcon : card.inactiveIcon}
                </div>
                <div className='pl-42px'>
                  <Typography
                    variant={TypographyVariant.h2_24_32_heavy}
                    className='pt-9'
                    customColor={
                      index === active ? 'text-gray-2d' : 'text-gray-71'
                    }
                  >
                    {info?.currencyName}{' '}
                    <NumberFormat
                      value={card.psl}
                      displayType='text'
                      thousandSeparator={true}
                    />
                  </Typography>
                  {card.style.type === 'total_balance' ? (
                    <Typography
                      variant={TypographyVariant.h6_14_20_medium}
                      className='mt-2'
                      customColor={
                        active === index ? 'text-gray-71' : 'text-gray-a0'
                      }
                    >
                      Total balance
                    </Typography>
                  ) : card.style.type === 'transparent' ? (
                    <Typography
                      variant={TypographyVariant.h6_14_20_medium}
                      className='mt-2'
                      customColor={
                        active === index ? 'text-gray-71' : 'text-gray-a0'
                      }
                    >
                      Transparent
                    </Typography>
                  ) : (
                    <Typography
                      variant={TypographyVariant.h6_14_20_medium}
                      className='mt-2'
                      customColor={
                        active === index ? 'text-gray-71' : 'text-gray-a0'
                      }
                    >
                      Shielded
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalBalances?.total && totalBalances?.total <= 0 && (
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
        {walletAddresses.length > 0 && (
          <div className='bg-white pt-[30px] rounded-lg mt-[30px] min-w-594px'>
            <div
              className={cn(
                'overflow-y-auto mr-4 pr-4 overflow-x-hidden ml-9',
                styles.walletContent,
              )}
            >
              {active !== 0 && (
                <Table
                  data={
                    active === 1
                      ? walletAddresses.filter(
                          item => item.type === 'transparent',
                        )
                      : walletAddresses.filter(item => item.type === 'shielded')
                  }
                  columns={Columns}
                  headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                  bodyTrClasses='h-76px border-b border-line'
                  bodyTdClasses='text-h5 leading-6 font-medium'
                  showCheckbox={true}
                  selectedRow={setSelectedRowsFunction}
                />
              )}
              {active == 0 && (
                <div>
                  <Table
                    data={temp.filter(item => item.type === 'shielded')}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line'
                    bodyTdClasses='text-h5 leading-6 font-medium'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                    extendHeader={
                      <Typography
                        variant={TypographyVariant.h5_16_24_medium}
                        customColor='text-gray-2d'
                        className='mb-2.5 ml-[30px] sticky top-0'
                      >
                        Transparent
                      </Typography>
                    }
                    extendHeaderClassName='h-6 top-[-1px]'
                    stickyTopClassName='top-[23px]'
                  />
                  <Table
                    data={temp.filter(item => item.type === 'shielded')}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line'
                    bodyTdClasses='text-h5 leading-6 font-medium'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                    extendHeader={
                      <Typography
                        variant={TypographyVariant.h5_16_24_medium}
                        customColor='text-gray-2d'
                        className='mb-2.5 mt-7 ml-[30px] sticky top-0'
                      >
                        Shielded
                      </Typography>
                    }
                    extendHeaderClassName='h-6 top-[-30px]'
                    stickyTopClassName='top-[23px]'
                  />
                </div>
              )}
            </div>

            <div className='border-t border-gray-e7 flex items-center h-72px justify-between pl-38px pr-30px'>
              <Typography
                variant={TypographyVariant.h6_14_20_roman}
                className='flex items-center'
              >
                <Toggle toggleHandler={hideEmptyAddress}>
                  Hide empty addresses
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content='Hide empty addresses'
                    width={150}
                    type='top'
                  >
                    <EliminationIcon className='ml-2 text-gray-8e' size={20} />
                  </Tooltip>
                </Toggle>
              </Typography>
              <div className='flex items-center'>
                <Typography
                  variant={TypographyVariant.h4_18_24_roman}
                  customColor='text-gray-71'
                >
                  Selected total:
                </Typography>
                <Typography
                  variant={TypographyVariant.h3_22_30_heavy}
                  customColor='text-gray-2d'
                  className='ml-3'
                >
                  <NumberFormat
                    value={selectedAmount}
                    displayType='text'
                    thousandSeparator={true}
                  />{' '}
                  {info.currencyName}
                </Typography>
              </div>
            </div>
          </div>
        )}

        {walletAddresses.length == 0 && (
          <div
            className={cn(
              'bg-white rounded-lg mt-3.5 flex items-center justify-center pb-10',
              styles.walletEmptyContent,
            )}
          >
            <div className='text-center'>
              <Typography
                variant={TypographyVariant.h5_16_24_roman}
                customColor='text-gray-4a'
                className='mb-3'
              >
                You have no Addresses
              </Typography>
              <Button
                variant='secondary'
                className='w-[264px] px-0 mt-3'
                childrenClassName='w-full'
              >
                <div className='flex items-center ml-[19px]'>
                  <ElectricityIcon size={11} className='text-blue-3f py-3' />
                  <Typography
                    variant={TypographyVariant.h5_16_24_medium}
                    customColor='text-blue-3f'
                    className='ml-11px'
                  >
                    Generate a new {info.currencyName} Address
                  </Typography>
                </div>
              </Button>
            </div>
          </div>
        )}

        <div className='flex justify-end mt-5 pb-[30px]'>
          {walletAddresses.length > 0 && (
            <Button
              variant='secondary'
              className='w-[264px] px-0'
              childrenClassName='w-full'
            >
              <div className='flex items-center ml-[19px]'>
                <ElectricityIcon size={11} className='text-blue-3f py-3' />
                <Typography
                  variant={TypographyVariant.h5_16_24_medium}
                  customColor='text-blue-3f'
                  className='ml-11px'
                >
                  Generate a new {info.currencyName} Address
                </Typography>
              </div>
            </Button>
          )}
          <Button
            onClick={() => setPaymentModalOpen(true)}
            className='ml-30px w-[190px] px-0'
            childrenClassName='w-full'
          >
            <div className='flex items-center ml-5'>
              <Typography
                variant={TypographyVariant.text_18_28_heavy}
                customColor='text-white'
              >
                +
              </Typography>{' '}
              <Typography
                variant={TypographyVariant.h5_16_24_heavy}
                customColor='text-white'
                className='ml-2'
              >
                Create a payment
              </Typography>
            </div>
          </Button>
        </div>
      </div>
      <PaymentModal
        paymentSources={paymentSources}
        isOpen={isPaymentModalOpen}
        handleClose={() => {
          setPaymentModalOpen(false)
        }}
      ></PaymentModal>
      <TransactionHistoryModal
        isOpen={isTransactionHistoryModalOpen}
        handleClose={() => setTransactionHistoryModalOpen(false)}
      ></TransactionHistoryModal>
      <ExportKeysModal
        isOpen={isExportKeysModalOpen}
        address={currentAddress}
        handleClose={() => setExportKeysModalOpen(false)}
      ></ExportKeysModal>
      <ToastContainer
        className='flex flex-grow w-auto'
        hideProgressBar={true}
        autoClose={false}
      />
    </div>
  )
}

export default WalletScreen
