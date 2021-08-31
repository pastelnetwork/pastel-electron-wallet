import React, { useState, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import { walletRPC, transactionRPC } from 'api/pastel-rpc'
import { TAddressRow } from 'types/rpc'
import { useAppSelector } from 'redux/hooks'
import { isSapling } from 'api/helpers'
import { useAddressBook } from 'common/hooks'
import Alert from 'common/components/Alert'
import { Button } from 'common/components/Buttons'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import { TRow } from 'common/components/Table'
import Breadcrumbs from 'common/components/Breadcrumbs'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import dayjs from 'dayjs'
import QRCodeModal from './QRCodeModal'
import BalanceCards from './BalanceCards'
import { ElectricityIcon, Clock } from 'common/components/Icons'
import WalletAddresses from './WalletAddresses'
import { useToggle } from 'react-use'

enum Tab {
  GENERAL,
  BOARD,
  MYSECURITY,
}

export type TSelectionPslProps = {
  address: string
  amount: number
  valid: boolean
  date: number
}

const WalletScreen = (): JSX.Element => {
  const { info } = useAppSelector(state => state.appInfo)
  const [forceUpdateSelect, setForceUpdateSelect] = useState(false)

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

  const {
    data: totalBalances,
    isLoading: isLoadingBalances,
  } = walletRPC.useTotalBalance()

  const {
    data: tAddresses = [],
    isLoading: isTAddressesLoading,
  } = walletRPC.useTAddressesWithBalance()

  const {
    data: zAddresses = [],
    isLoading: isZAddressesLoading,
  } = walletRPC.useZAddressesWithBalance()

  const {
    data: zListAddresses = [],
    isLoading: isAddressesLoading,
    refetch: refetchZListAddresses,
  } = walletRPC.useZAddresses()

  const {
    data: addressesByAccount = [],
    isLoading: isAddressesByAccountLoading,
    refetch: refetchAddressesByAccount,
  } = walletRPC.useAddressesByAccount()

  const {
    data: transactions = [],
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = transactionRPC.useTAndZTransactions()

  const addresses = useMemo(() => [...zAddresses, ...tAddresses], [
    tAddresses,
    zAddresses,
  ])

  const allAddresses = useMemo(
    () => [...addressesByAccount, ...zListAddresses],
    [zListAddresses, addressesByAccount],
  )

  const [hideEmptyAddresses, toggleHideEmptyAddresses] = useToggle(false)

  const isLoadingAddresses =
    isTAddressesLoading ||
    isZAddressesLoading ||
    isAddressesLoading ||
    isAddressesByAccountLoading ||
    isLoadingTransactions

  const walletAddresses: TAddressRow[] = useMemo(() => {
    let addressRows = addresses.map(a => {
      const address = a.address.toString()
      const type = isSapling(address) ? 'shielded' : 'transparent'
      const [book] = addressBook.filter(b => b.address === address) || []
      const lastActivity = transactions.find(
        transaction => transaction.address === address,
      )

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

    allAddresses.forEach(address => {
      const existAddress = addresses.filter(add => add.address === address)
      if (existAddress.length < 1) {
        const type = isSapling(address) ? 'shielded' : 'transparent'
        const book = addressBook.find(b => b.address === address)
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
          addressNick: book?.label || '',
        })
      }
    })

    if (hideEmptyAddresses) {
      addressRows = addressRows.filter(row => row.amount > 0)
    }

    return addressRows
  }, [addresses, allAddresses, addressBook, hideEmptyAddresses])

  const saveAddressLabel = (address: string, label: string): void => {
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
    const isZAddress = active === 2
    const result = await walletRPC.createNewAddress(isZAddress)
    if (result) {
      refetchTransactions()
      if (isZAddress) {
        refetchZListAddresses()
      } else {
        refetchAddressesByAccount()
      }
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
          isLoading={isLoadingBalances}
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

        <WalletAddresses
          walletAddresses={walletAddresses}
          activeTab={active}
          hideEmptyAddress={toggleHideEmptyAddresses}
          selectedAmount={selectedAmount}
          isLoadingAddresses={isLoadingAddresses}
          handleCreateNewAddress={handleCreateNewAddress}
          selectedRows={selectedRows}
          setSelectedRowsFunction={setSelectedRowsFunction}
          saveAddressLabel={saveAddressLabel}
          setCurrentAddress={setCurrentAddress}
          setIsQRCodeModalOpen={setIsQRCodeModalOpen}
          setExportKeysModalOpen={setExportKeysModalOpen}
          selectionPsl={selectionPsl}
          forceUpdateSelect={forceUpdateSelect}
          handleAmountChange={handleAmountChange}
        />

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
