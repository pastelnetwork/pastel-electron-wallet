import React, { useState, useEffect, useMemo } from 'react'
import NumberFormat from 'react-number-format'
import Toggle from 'common/components/Toggle'
import Select from 'common/components/Select/Select'
import { Button } from 'common/components/Buttons'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import Table, { TRow } from 'common/components/Table'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import Breadcrumbs from 'common/components/Breadcrumbs'
import { WalletRPC } from 'api/pastel-rpc'
import { TAddressRow } from 'types/rpc'
import QRCode from 'qrcode.react'
import { useAppSelector } from 'redux/hooks'
import { RootState } from '../../redux/store'
import dayjs from 'dayjs'
import { AddressForm } from './AddressForm'
import Alert from 'common/components/Alert'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { isSapling } from 'api/helpers'
import { useAddressBook } from 'common/hooks'
import BalanceCards from './BalanceCards'
import {
  ElectricityIcon,
  Clock,
  EliminationIcon,
  FilePDFIcon,
} from 'common/components/Icons'
import Spinner from '../../common/components/Spinner'

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

const WalletScreen = (): JSX.Element => {
  const { info } = useAppSelector(state => state.appInfo)
  const Columns = [
    {
      key: 'address',
      colClasses: 'lg:w-380px xl:w-428px 1500px:w-478px',
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
      colClasses: 'w-190px 1500px:w-244px',
      custom: () => (
        <div className='mr-3 md:mr-0'>{dayjs(lastFetched).fromNow(true)}</div>
      ),
    },
    {
      key: 'qrCode',
      name: 'Address QR',
      colClasses: 'min-w-80px w-132px 1500px:w-244px',
      custom: (value: string | number) => (
        <div className='flex'>
          <QRCode size={50} value={value.toString()} />
        </div>
      ),
    },

    {
      key: 'address',
      name: 'Keys',
      colClasses: 'min-w-130px w-176px 1500px:w-244px flex-grow-0',
      custom: (value: string | number) => {
        return (
          <div className='flex items-center'>
            <span>private key</span>
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
      colClasses: 'w-131px 1500px:w-244px',
      custom: (value: string | number) => (
        <div className='text-gray-71 font-medium text-base'>
          {info?.currencyName}{' '}
          <NumberFormat
            value={value}
            displayType='text'
            thousandSeparator={true}
          />
        </div>
      ),
    },
    {
      key: 'psl',
      name: 'Selected Amount',
      colClasses: 'min-w-130px w-141px 1500px:w-244px',
      custom: (value: number | string) => (
        <div className='z-0'>
          <Select
            className='text-gray-2d w-28'
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
  const [active, setActive] = useState(1)
  const [tabActive, setTabActive] = useState<number>(Tab.GENERAL)

  const [selectedAmount, setSelectedAmount] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])

  const { addressBook, updateAddressBook } = useAddressBook()

  const { data: totalBalances } = walletRPC.useTotalBalance()

  const {
    data: tAddresses = [],
    isLoading: isTAddressesLoading,
  } = walletRPC.useTAddressesWithBalance()

  const {
    data: zAddresses = [],
    isLoading: isZAddressesLoading,
  } = walletRPC.useZAddressesWithBalance()

  const addresses = useMemo(() => [...zAddresses, ...tAddresses], [
    tAddresses,
    zAddresses,
  ])

  const [isLoadingAddresses, setIsLoadingAddresses] = useState(
    isTAddressesLoading || isZAddressesLoading,
  )

  const [walletOriginAddresses, setWalletOriginAddresses] = useState<
    TAddressRow[]
  >([])
  const [walletAddresses, setWalletAddresses] = useState<TAddressRow[]>([])

  useEffect(() => {
    if (!addresses) {
      return
    }

    const addressRows = addresses.map(a => {
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
    })

    setWalletOriginAddresses(addressRows)
    setWalletAddresses(addressRows)
    setIsLoadingAddresses(false)
  }, [addresses])

  const saveAddressLabel = (address: string, label: string): void => {
    // Update address nick
    const newWalletAddress: TAddressRow[] = walletAddresses.map(a => ({
      ...a,
      addressNick: a.address === address ? label : a.addressNick || '',
    }))
    setWalletAddresses(newWalletAddress)

    updateAddressBook({ address, label })
  }

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
          <div className='mr-8'>{info?.currencyName} Wallet</div>
          <MultiToggleSwitch
            data={[
              { label: 'Week', count: 1122 },
              { label: 'Month', count: 12 },
              { label: 'Year', count: 12 },
            ]}
            activeIndex={tabActive}
            onToggle={setTabActive}
            itemActiveClassName='bg-gray-4a rounded-full text-white'
            countInactiveClassName='bg-warning-hover font-extrabold'
          />
        </div>
        <div
          className='flex cursor-pointer'
          onClick={() => setTransactionHistoryModalOpen(true)}
        >
          <Clock size={18} className='text-blue-3f' />
          <span className='text-blue-3f ml-3.5'>Transaction history</span>
        </div>
      </div>

      <div className='bg-gray-f8 pt-5 sm:px-10 md:px-60px'>
        <BalanceCards
          totalBalances={totalBalances}
          activeTab={active}
          setActiveTab={setActive}
        />
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
          <div className='bg-white mt-3.5 pt-[30px] rounded-lg mt-[30px] min-w-594px'>
            <div className='h-526px overflow-y-auto mr-4 pr-4 overflow-x-hidden ml-9'>
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
                  bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                  showCheckbox={true}
                  selectedRow={setSelectedRowsFunction}
                />
              )}
              {active == 0 && (
                <div>
                  <div className='text-gray-2d text-base font-medium mb-2.5 ml-[30px]'>
                    Transparent
                  </div>
                  <Table
                    data={walletAddresses.filter(
                      item => item.type === 'transparent',
                    )}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                  />
                  <div className='text-gray-2d text-base font-medium mb-2.5 mt-7 ml-[30px]'>
                    Shielded
                  </div>
                  <Table
                    data={walletAddresses.filter(
                      item => item.type === 'shielded',
                    )}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                  />
                </div>
              )}
            </div>

            <div className='border-t border-gray-e7 flex items-center h-72px justify-between pl-38px pr-30px'>
              <div className='flex items-center'>
                <Toggle toggleHandler={hideEmptyAddress}>
                  Hide empty addresses
                  <EliminationIcon className='ml-2 text-gray-8e' size={20} />
                </Toggle>
              </div>
              <div className='flex items-center'>
                <span className='text-gray-71 text-lg font-normal'>
                  Selected total:
                </span>
                <span className='text-gray-2d font-extrabold text-h3 ml-3'>
                  <NumberFormat
                    value={selectedAmount}
                    displayType='text'
                    thousandSeparator={true}
                  />{' '}
                  PSL
                </span>
              </div>
            </div>
          </div>
        )}

        {walletAddresses.length == 0 && (
          <div className='min-h-[594px] bg-white rounded-lg mt-3.5 flex items-center min-h-594px justify-center pb-10'>
            <div>
              {isLoadingAddresses && (
                <Spinner className='w-8 h-8 text-blue-3f' />
              )}
              {!isLoadingAddresses && (
                <>
                  <div className='font-normal text-gray-4a text-base text-center mb-3.5'>
                    You have no Addresses
                  </div>
                  <Button
                    variant='secondary'
                    className='w-247px px-0'
                    childrenClassName='w-full'
                  >
                    <div className='flex items-center ml-6 font-medium'>
                      <ElectricityIcon
                        size={11}
                        className='text-blue-3f py-3'
                      />
                      <span className='text-sm ml-11px'>
                        Generate a new PSL Address
                      </span>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        <div className='flex justify-end mt-5 pb-[30px]'>
          {walletAddresses.length > 0 && (
            <Button
              variant='secondary'
              className='w-247px px-0'
              childrenClassName='w-full'
            >
              <div className='flex items-center ml-6 font-medium'>
                <ElectricityIcon size={11} className='text-blue-3f py-3' />
                <span className='text-sm ml-11px'>
                  Generate a new PSL Address
                </span>
              </div>
            </Button>
          )}
          <Button
            onClick={() => setPaymentModalOpen(true)}
            className='ml-11px w-174px px-0'
            childrenClassName='w-full'
          >
            <div className='flex items-center ml-5 font-medium'>
              <span className='text-lg'>+</span>{' '}
              <span className='text-sm ml-2'>Create a payment</span>
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
      />
      <TransactionHistoryModal
        isOpen={isTransactionHistoryModalOpen}
        handleClose={() => setTransactionHistoryModalOpen(false)}
      />
      <ExportKeysModal
        isOpen={isExportKeysModalOpen}
        address={currentAddress}
        handleClose={() => setExportKeysModalOpen(false)}
      />
      <ToastContainer
        className='flex flex-grow w-auto'
        hideProgressBar={true}
        autoClose={false}
      />
    </div>
  )
}

export default WalletScreen
