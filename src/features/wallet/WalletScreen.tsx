import React, { useState, useEffect, useMemo } from 'react'
import NumberFormat from 'react-number-format'
import cn from 'classnames'
import { ToastContainer } from 'react-toastify'

import { WalletRPC, TransactionRPC } from 'api/pastel-rpc'
import { TAddressRow } from 'types/rpc'
import { useAppSelector } from 'redux/hooks'
import { isSapling } from 'api/helpers'
import { useAddressBook } from 'common/hooks'
import { parseFormattedNumber, timeAgo } from 'common/utils/format'
import PastelUtils from 'common/utils/utils'
import Tooltip from 'common/components/Tooltip'
import Alert from 'common/components/Alert'
import Toggle from 'common/components/Toggle'
import { Button } from 'common/components/Buttons'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import Table, { TRow } from 'common/components/Table'
import Breadcrumbs from 'common/components/Breadcrumbs'
import SelectAmount, { TOption } from 'common/components/SelectAmount'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import dayjs from 'dayjs'
import { AddressForm } from './AddressForm'
import QRCodeModal from './QRCodeModal'
import BalanceCards from './BalanceCards'
import {
  ElectricityIcon,
  Clock,
  EliminationIcon,
  FilePDFIcon,
  QRCode,
} from 'common/components/Icons'
import Spinner from '../../common/components/Spinner'

import Checkbox from 'common/components/Checkbox/Checkbox'
import styles from './WalletScreen.module.css'

enum Tab {
  GENERAL,
  BOARD,
  MYSECURITY,
}

type TSelectionPslProps = {
  address: string
  amount: number
  valid: boolean
  date: number
}

const WalletScreen = (): JSX.Element => {
  const { info } = useAppSelector(state => state.appInfo)
  const [forceUpdateSelect, setForceUpdateSelect] = useState(false)

  const Columns = [
    {
      key: 'address',
      colClasses: 'w-[40%] text-h6 leading-5 font-normal',
      name: 'Address name',
      headerColClasses: 'mx-30px',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='flex items-center mx-30px'>
          <Checkbox
            isChecked={selectedRows.indexOf(row?.address) !== -1}
            clickHandler={() => row && setSelectedRowsFunction(row)}
          />
          <AddressForm
            address={value.toString()}
            currentRow={row}
            saveAddressLabel={saveAddressLabel}
          />
        </div>
      ),
    },
    {
      key: 'time',
      name: 'Last Activity',
      colClasses: 'w-190px 1500px:w-244px text-h6 leading-5 font-normal',
      custom: (time: number) => (
        <div className='mr-3 md:mr-0 text-gray-71 text-h5-medium'>
          {time > 0 ? timeAgo(dayjs.unix(time).valueOf()) : '--'}
        </div>
      ),
    },
    {
      key: 'qrCode',
      name: 'Address QR',
      colClasses:
        'min-w-80px w-132px 1500px:w-244px text-h6 leading-5 font-normal text-center',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='flex pl-6'>
          <span
            className='cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
            onClick={() => {
              setCurrentAddress(row?.address)
              setIsQRCodeModalOpen(true)
            }}
          >
            <QRCode size={20} />
          </span>
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
            <div className='text-gray-71 text-h5-medium'>private key</div>
            <span
              onClick={() => {
                setCurrentAddress(value.toString())
                setExportKeysModalOpen(true)
              }}
              className='ml-9px rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'
            >
              <FilePDFIcon size={20} className='text-gray-88 cursor-pointer' />
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
        <div className='text-gray-71 text-h5-medium'>
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
      name: '',
      colClasses: 'min-w-[120px] w-[120px]',
      custom: (value: number | string, row?: TRow) => {
        const psl = selectionPsl.filter(psl => psl?.address === row?.address)[0]
        return (
          <div className='z-0'>
            <SelectAmount
              className='text-gray-2d w-28 bg-white'
              min={0}
              max={parseFloat(value.toString())}
              step={PastelUtils.generateStep(parseInt(value.toString()))}
              defaultValue={{
                label: psl?.amount || row?.amount,
                value: psl?.amount || row?.amount,
              }}
              forceUpdate={forceUpdateSelect}
              onChange={(selection: TOption) => {
                const selectedValue = parseFormattedNumber(selection.value)
                handleAmountChange(selectedValue, row)
              }}
            />
          </div>
        )
      },
    },
  ]

  const walletRPC = new WalletRPC()
  const transactionRPC = new TransactionRPC()

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectionPsl, setSelectionPsl] = useState<TSelectionPslProps[]>([])

  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)

  const [isExportKeysModalOpen, setExportKeysModalOpen] = useState(false)
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState('')
  const [active, setActive] = useState(0)
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

  const {
    data: zListAddresses = [],
    isLoading: isAddressesLoading,
  } = walletRPC.useZAddresses()

  const {
    data: addressesByAccount = [],
    isLoading: isAddressesByAccountLoading,
  } = walletRPC.useAddressesByAccount()

  const allAddresses = useMemo(
    () => [...addressesByAccount, ...zListAddresses],
    [zListAddresses, addressesByAccount],
  )

  const [isLoadingAddresses, setIsLoadingAddresses] = useState(
    isTAddressesLoading ||
      isZAddressesLoading ||
      isAddressesLoading ||
      isAddressesByAccountLoading,
  )

  const [walletOriginAddresses, setWalletOriginAddresses] = useState<
    TAddressRow[]
  >([])
  const [walletAddresses, setWalletAddresses] = useState<TAddressRow[]>([])

  useEffect(() => {
    if (!addresses) {
      return
    }

    fetchWalletAddresses()
  }, [addresses, allAddresses])

  const fetchWalletAddresses = async () => {
    const transactions = await transactionRPC.fetchTandZTransactions()
    const addressRows = addresses.map(a => {
      const address = a.address.toString()
      const type = isSapling(address) ? 'shielded' : 'transparent'
      const [book] = addressBook.filter(b => b.address === address) || []
      const lastActivity = transactions.filter(
        transaction => transaction.address === address,
      )[0]

      return {
        id: address,
        address: address,
        amount: a.balance,
        psl: info.pslPrice || a.balance,
        type: type,
        time: lastActivity?.time,
        qrCode: '',
        viewKey: '',
        privateKey: '',
        addressNick: book ? book.label : '',
      } as TAddressRow
    })

    allAddresses.map(address => {
      const existAddress = addresses.filter(add => add.address === address)
      if (existAddress.length < 1) {
        const type = isSapling(address) ? 'shielded' : 'transparent'
        const [book] = addressBook.filter(b => b.address === address) || []
        addressRows.push({
          id: address,
          address: address,
          amount: 0,
          psl: 0,
          type: type,
          time: 0,
          qrCode: '',
          viewKey: '',
          privateKey: '',
          addressNick: book ? book.label : '',
        })
      }
    })

    setWalletOriginAddresses(addressRows)
    setWalletAddresses(addressRows)
    setIsLoadingAddresses(false)
  }

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
          const psl = selectionPsl.filter(
            psl => psl.address === item.address,
          )[0]
          if (psl?.amount && psl?.valid) {
            tempSelectedAmount += psl.amount
          } else if (item.amount) {
            tempSelectedAmount += item.amount
          }
        }
      }
    })
    setSelectedAmount(tempSelectedAmount)
  }, [selectedRows, walletAddresses, selectionPsl])

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

  const getPaymentSources = () => {
    let tempWalletAddresses: TAddressRow[] = []
    if (selectedRows.length > 0) {
      tempWalletAddresses = walletAddresses.filter(wallet => {
        if (selectedRows.indexOf(wallet.address) !== -1) {
          const psl = selectionPsl.filter(
            psl => psl?.address === wallet.address,
          )[0]

          const newWallet = Object.assign(wallet)
          newWallet.psl = psl?.amount || wallet.amount
          return newWallet
        }

        return null
      })
    }

    return tempWalletAddresses
  }

  const handleAmountChange = (selection: number | null, row?: TRow) => {
    if (selection && row) {
      const tmpSelectionPsl = selectionPsl
      const selectionPslIndex = tmpSelectionPsl.findIndex(
        psl => psl.address === row.address,
      )
      if (selectionPslIndex !== -1) {
        tmpSelectionPsl[selectionPslIndex].amount = selection
        tmpSelectionPsl[selectionPslIndex].valid = selection <= row?.amount
        tmpSelectionPsl[selectionPslIndex].date = dayjs().valueOf()
        setSelectionPsl([...tmpSelectionPsl])
      } else {
        setSelectionPsl([
          ...tmpSelectionPsl,
          {
            address: row.address,
            amount: selection,
            valid: selection <= row?.amount,
            date: dayjs().valueOf(),
          },
        ])
      }
    }
  }

  const handleCreateNewAddress = async () => {
    const result = await walletRPC.createNewAddress(active === 2)
    if (result) {
      await fetchWalletAddresses()
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
          <div className='mr-8 text-gray-1a text-h1-heavy'>
            {info?.currencyName} Wallet
          </div>
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
          <div className='ml-3.5 text-blue-3f text-h4-leading-22'>
            Transaction history
          </div>
        </div>
      </div>

      <div className='bg-gray-f8 pt-6 sm:px-10 md:px-60px'>
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
                  bodyTrClasses='h-76px border-b border-line hover:bg-blue-fa'
                  bodyTdClasses='text-h5 leading-6 font-medium'
                  showCheckbox={false}
                  selectedRow={setSelectedRowsFunction}
                />
              )}
              {active == 0 && (
                <div>
                  <Table
                    data={walletAddresses.filter(
                      item => item.type === 'transparent',
                    )}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line hover:bg-blue-fa'
                    bodyTdClasses='text-h5 leading-6 font-medium'
                    showCheckbox={false}
                    selectedRow={setSelectedRowsFunction}
                    extendHeader={
                      <div className='mb-2.5 ml-[30px] sticky top-0 text-gray-2d text-h5-medium'>
                        Transparent
                      </div>
                    }
                    extendHeaderClassName='h-6 top-[-1px]'
                    stickyTopClassName='top-[23px]'
                  />
                  <Table
                    data={walletAddresses.filter(
                      item => item.type === 'shielded',
                    )}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line hover:bg-blue-fa'
                    bodyTdClasses='text-h5 leading-6 font-medium'
                    showCheckbox={false}
                    selectedRow={setSelectedRowsFunction}
                    extendHeader={
                      <div className='mb-2.5 mt-7 ml-[30px] sticky top-0 text-gray-2d text-h5-medium'>
                        Shielded
                      </div>
                    }
                    extendHeaderClassName='h-6 top-[-30px]'
                    stickyTopClassName='top-[23px]'
                  />
                </div>
              )}
            </div>

            <div className='border-t border-gray-e7 flex items-center h-72px justify-between pl-38px pr-30px'>
              <div className='flex items-center text-h6-leading-20'>
                <Toggle toggleHandler={hideEmptyAddress}>
                  Hide empty addresses
                  <div className='ml-2'>
                    <Tooltip
                      classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                      content='Hide empty addresses'
                      width={150}
                      type='top'
                    >
                      <EliminationIcon className='text-gray-8e' size={20} />
                    </Tooltip>
                  </div>
                </Toggle>
              </div>
              <div className='flex items-center'>
                <div className='text-gray-71 text-h4'>Selected total:</div>
                <div className='ml-3 text-gray-2d text-h3-heavy'>
                  <NumberFormat
                    value={selectedAmount}
                    displayType='text'
                    thousandSeparator={true}
                  />{' '}
                  {info.currencyName}
                </div>
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
            {isLoadingAddresses && <Spinner className='w-8 h-8 text-blue-3f' />}
            {!isLoadingAddresses && (
              <div className='text-center'>
                <div className='mb-3 text-gray-4a text-h5'>
                  You have no Addresses
                </div>
                <Button
                  variant='secondary'
                  className='w-[264px] px-0 mt-3'
                  childrenClassName='w-full'
                  onClick={handleCreateNewAddress}
                >
                  <div className='flex items-center ml-[19px]'>
                    <ElectricityIcon size={11} className='text-blue-3f py-3' />
                    <div className='ml-11px text-blue-3f text-h5-medium'>
                      Generate a new {info.currencyName} Address
                    </div>
                  </div>
                </Button>
              </div>
            )}
          </div>
        )}

        <div className='flex justify-end mt-5 pb-[30px]'>
          {walletAddresses.length > 0 && (
            <Button
              variant='secondary'
              className='w-[264px] px-0'
              childrenClassName='w-full'
              onClick={handleCreateNewAddress}
            >
              <div className='flex items-center ml-[19px]'>
                <ElectricityIcon size={11} className='text-blue-3f py-3' />
                <div className='ml-11px text-blue-3f text-h5-medium'>
                  Generate a new {info.currencyName} Address
                </div>
              </div>
            </Button>
          )}
          <Button
            onClick={() => {
              setPaymentModalOpen(true)
              setForceUpdateSelect(false)
            }}
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

      <PaymentModal
        paymentSources={getPaymentSources()}
        isOpen={isPaymentModalOpen}
        handleClose={() => {
          setPaymentModalOpen(false)
          setForceUpdateSelect(true)
        }}
        totalBalances={totalBalances?.total || 0}
        onRemoveRow={setSelectedRowsFunction}
        onAmountChange={handleAmountChange}
        selectedTotal={selectedAmount}
        onSelectedRows={setSelectedRowsFunction}
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
      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        address={currentAddress}
        handleClose={() => setIsQRCodeModalOpen(false)}
      />
    </div>
  )
}

export default WalletScreen
