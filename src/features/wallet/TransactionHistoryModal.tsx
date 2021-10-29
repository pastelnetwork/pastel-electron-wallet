import React, { useEffect, useState, useMemo } from 'react'
import cn from 'classnames'
import { shell } from 'electron'
import dayjs from 'dayjs'
import { TitleModal } from '../../common/components/Modal'
import Table, { TRow } from '../../common/components/Table'
import DateRangeSelector, {
  TDateRangeProp,
} from '../../common/components/DateRangeSelector/DateRangeSelector'
import Radio from '../../common/components/Radio'
import Select, { TOption } from '../../common/components/Select/Select'
import Tooltip from 'common/components/Tooltip'
import commentIcon from '../../common/assets/icons/ico-comment.svg'
import checkGreenIcon from '../../common/assets/icons/ico-check-green.svg'
import clockYellowIcon from '../../common/assets/icons/ico-clock-yellow.svg'
import addressbookIcon from '../../common/assets/icons/ico-addressbook.svg'
import user2Icon from '../../common/assets/icons/ico-user2.svg'
import { TransactionRPC } from 'api/pastel-rpc'
import {
  TTransactionRow,
  TTransaction,
  TTransactionType,
  TAddressBook,
} from 'types/rpc'
import { AddressForm } from './AddressForm'
import { isTransparent } from 'common/utils/wallet'
import { useWalletScreenContext } from './walletScreen.context'
import { readTransaction } from 'common/utils/TransactionNote'

const BLOCK_CONFIRMED_NUMBER = 6

export default function TransactionHistoryModal(): JSX.Element {
  const {
    setTransactionHistoryModalOpen: setIsOpen,
    addressBook: { addressBook },
    selectedDate,
  } = useWalletScreenContext()

  const handleClose = () => setIsOpen(false)

  const [selectedOption, setSelectedOption] = useState<
    'all' | 'received' | 'sent'
  >('all')
  const [transactions, setTransactions] = useState<TTransactionRow[]>([])
  const [originTransactions, setOriginTransactions] = useState<
    TTransactionRow[]
  >([])
  const [sourceAddresses, setSourceAddresses] = useState<TOption[]>([
    {
      label: 'All',
      value: '',
    },
  ])
  const [recipients, setRecipients] = useState<TOption[]>([
    {
      label: 'All',
      value: '',
    },
  ])
  const [dates, setDates] = useState<TDateRangeProp>(selectedDate)
  const [sourceAddress, setSourceAddress] = useState<TOption | null>(
    sourceAddresses[0],
  )
  const [recipientAddress, setRecipientAddress] = useState<TOption | null>(
    recipients[0],
  )
  const [isLoading, setLoading] = useState(false)
  const onSelectDateRange = (dates: TDateRangeProp) => {
    setDates(dates)
    filterTransactionByDate(dates, originTransactions)
  }

  const filterTransactionByDate = (
    dates: TDateRangeProp,
    trans: TTransactionRow[],
  ) => {
    const startDate = dayjs(dates.start)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .valueOf()
    let filterTransactions = trans.filter(
      t => dayjs.unix(parseInt(t.date)).valueOf() >= startDate,
    )
    if (dates.end) {
      const endDate = dayjs(dates.end)
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .valueOf()
      filterTransactions = trans.filter(
        t =>
          dayjs.unix(parseInt(t.date)).valueOf() >= startDate &&
          dayjs.unix(parseInt(t.date)).valueOf() <= endDate,
      )
    }

    setTransactions(filterTransactions)
  }

  const getFilterAddresses = (trans: TTransaction[], isSource: boolean) => {
    const filtered = trans
      .filter(t => {
        return isSource
          ? t.type === TTransactionType.SEND
          : t.type === TTransactionType.RECEIVE
      })
      .map(t => {
        return {
          label: t.address,
          value: t.address,
        }
      })
    const newFiltered: TOption[] = []
    filtered.forEach(tran => {
      if (!newFiltered.find(i => i.value === tran.value)) {
        newFiltered.push(tran)
      }
    })
    return [
      {
        label: 'All',
        value: '',
      },
    ].concat(newFiltered)
  }

  const filterTransactionByType = (
    type: TTransactionType = TTransactionType.ALL,
  ) => {
    if (type === TTransactionType.ALL) {
      setTransactions(originTransactions)
    } else {
      const filterTransactions = originTransactions.filter(t => t.type === type)
      setTransactions(filterTransactions)
    }
  }

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true)
      const transactionRPC = new TransactionRPC()
      const trans = await transactionRPC.fetchTAndZTransactions()
      const privateNotes = await readTransaction()
      const filterTransactions = trans.map(t => {
        const note = privateNotes.find(n => n.txnId === t.txid)
        return {
          date: t.time.toString(),
          address: t.address,
          addressNick: '',
          type: (t.type as TTransactionType) || TTransactionType.ALL,
          status:
            t.confirmations > BLOCK_CONFIRMED_NUMBER
              ? 'confirmed'
              : 'unconfirmed',
          id: t.txid,
          comments:
            t.detailedTxns && t.detailedTxns[0]?.memo
              ? t.detailedTxns[0].memo
              : '',
          fee: t.fee || 0,
          amount: t.amount || 0,
          privateNote: note?.privateNote,
        }
      })
      // Source/Target addresses
      setSourceAddresses(getFilterAddresses(trans, true))
      setRecipients(getFilterAddresses(trans, false))

      // Map transaction row data
      setTransactions(filterTransactions)
      setOriginTransactions(filterTransactions)
      filterTransactionByDate(selectedDate, filterTransactions)
      setLoading(false)
    }
    getTransactions()
  }, [])

  useEffect(() => {
    let filterTrans = originTransactions

    if (sourceAddress) {
      filterTrans = filterTrans.filter(t =>
        sourceAddress.value.length > 0 ? t.address === sourceAddress.value : t,
      )
    }

    if (recipientAddress) {
      filterTrans = filterTrans.filter(t =>
        recipientAddress.value.length > 0
          ? t.address === recipientAddress.value
          : t,
      )
    }

    setTransactions(filterTrans)
  }, [sourceAddress, recipientAddress])

  const mapAddressWithTransaction = (
    transactions: TTransactionRow[],
    addressBook: TAddressBook[],
  ) => {
    return transactions.map(t => {
      const [book] = addressBook.filter(b => b.address === t.address) || []
      return {
        ...t,
        addressNick: book ? book.label : '',
      }
    })
  }

  const mappedAddressTransactions = useMemo<TRow[]>(
    () => mapAddressWithTransaction(transactions, addressBook),
    [transactions, addressBook],
  )

  const Columns = [
    {
      name: 'Date',
      key: 'date',
      headerColClasses: 'ml-15px',
      custom: (value: string | number) => (
        <div className='ml-15px whitespace-nowrap mr-15px'>
          {dayjs.unix(parseInt(value.toString())).format('DD/MM/YY HH:mm')}
        </div>
      ),
    },
    {
      key: 'address',
      name: 'Recipient address',
      headerColClasses: 'mr-15px',
      custom: (value: string) => (
        <AddressForm
          address={value}
          copyable={false}
          hidable
          className='xl:ml-0'
          startLength={23}
          endLength={-3}
        />
      ),
    },
    {
      key: 'type',
      headerColClasses: 'whitespace-nowrap mr-15px ml-46px',
      name: 'Source type',
      custom: (value: string | number, row?: TRow) => {
        return (
          <div className='ml-46px flex items-center'>
            {!isTransparent(row?.address) ? 'Shielded' : 'Transparent'}

            {row?.comments ? (
              <div className='inline-block'>
                <Tooltip
                  classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                  content={row.comments}
                  width={150}
                  type='top'
                >
                  <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
                    <img
                      alt='comment'
                      className='cursor-pointer'
                      src={commentIcon}
                    />
                  </span>
                </Tooltip>
              </div>
            ) : null}
          </div>
        )
      },
    },
    {
      key: 'status',
      name: 'Status',
      headerColClasses: 'mr-15px',
      custom: (value: string | number) => {
        return (
          <div className='mt-3 pl-5 inline-block'>
            <Tooltip
              classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
              content={
                value.toString() === 'confirmed' ? 'Confirmed' : 'Unconfirmed'
              }
              width={110}
              type='top'
            >
              <img
                src={
                  value.toString() === 'confirmed'
                    ? checkGreenIcon
                    : clockYellowIcon
                }
                className='inline-block'
                alt='Status'
              />
            </Tooltip>
          </div>
        )
      },
    },
    {
      key: 'id',
      name: 'ID',
      custom: (value: string | number) => (
        <Tooltip
          classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
          content={value}
          width={450}
          type='top'
        >
          <div className='w-[103px] overflow-ellipsis overflow-hidden'>
            <span
              className='cursor-pointer text-blue-3f'
              onClick={() =>
                shell.openExternal(
                  `https://explorer.pastel.network/tx/${value}`,
                )
              }
            >
              {value}
            </span>
          </div>
        </Tooltip>
      ),
    },
    {
      key: 'privateNote',
      name: 'Private Notes',
      headerColClasses: 'whitespace-nowrap mr-15px',
      custom: (value: string | number) => (
        <div className='ml-8 inline-block'>
          {value ? (
            <Tooltip
              classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
              content={value}
              width={250}
              type='top'
            >
              <span className='inline-flex items-center cursor-pointer rounded-full hover:bg-gray-f6 active:bg-gray-ec p-7px transition duration-300'>
                <img className='cursor-pointer' src={commentIcon} />
              </span>
            </Tooltip>
          ) : null}
        </div>
      ),
    },
    {
      key: 'fee',
      name: 'Fee',
      headerColClasses: 'mr-15px',
      custom: (value: string | number) => (
        <div className='whitespace-nowrap mr-15px'>{value}</div>
      ),
    },
    {
      key: 'amount',
      name: 'Amount',
    },
  ]

  const renderDateFilter = () => (
    <div className='w-[264px] pr-6'>
      <div className='text-gray-71 text-h6-leading-20-medium'>Time range</div>
      <div className='w-[208px]'>
        <DateRangeSelector
          value={dates}
          onSelect={onSelectDateRange}
          showFooter
        />
      </div>
    </div>
  )

  const renderSourceAddressFilter = () => (
    <div className='w-[264px] pr-6'>
      <div className='mb-1 text-gray-71 text-h6-leading-20-medium'>
        Source address
      </div>
      <div className='w-[208px]'>
        <Select
          label={
            <img src={addressbookIcon} className='mr-2' alt='Source address' />
          }
          className='text-gray-2d w-full'
          selected={sourceAddress}
          options={sourceAddresses}
          onChange={setSourceAddress}
          listClassName='max-w-[450px]'
          listItemClassName='truncate'
        />
      </div>
    </div>
  )

  const renderRecipientsFilter = () => (
    <div className='w-[264px] pr-6'>
      <div className='mb-1 text-gray-71 text-h6-leading-20-medium'>
        Recipients
      </div>
      <div className='w-[208px]'>
        <Select
          label={<img src={user2Icon} className='mr-2' alt='Recipients' />}
          className='text-gray-2d w-full'
          selected={recipientAddress}
          options={recipients}
          onChange={setRecipientAddress}
          listClassName='max-w-[450px]'
          listItemClassName='truncate'
        />
      </div>
    </div>
  )

  const renderTransactionTypeFilter = () => (
    <div className='w-1/3 flex justify-end items-center space-x-4 pt-6'>
      <Radio
        checked={selectedOption === 'all'}
        onChange={() => {
          filterTransactionByType(TTransactionType.ALL)
          setSelectedOption('all')
        }}
      >
        <div
          className={cn(
            selectedOption === 'all'
              ? 'text-gray-4a text-h5-heavy'
              : 'text-gray-71 text-h5-medium',
          )}
        >
          All
        </div>
      </Radio>
      <Radio
        checked={selectedOption === 'received'}
        onChange={() => {
          filterTransactionByType(TTransactionType.RECEIVE)
          setSelectedOption('received')
        }}
      >
        <div
          className={cn(
            selectedOption === 'received'
              ? 'text-gray-4a text-h5-heavy'
              : 'text-gray-71 text-h5-medium',
          )}
        >
          Received
        </div>
      </Radio>
      <Radio
        checked={selectedOption === 'sent'}
        onChange={() => {
          filterTransactionByType(TTransactionType.SEND)
          setSelectedOption('sent')
        }}
      >
        <div
          className={
            selectedOption === 'sent'
              ? 'text-gray-4a text-h5-heavy'
              : 'text-gray-71 text-h5-medium'
          }
        >
          Sent
        </div>
      </Radio>
    </div>
  )

  return (
    <TitleModal
      isOpen
      handleClose={handleClose}
      title='Transaction history'
      classNames='max-w-7xl min-h-[88vh]'
    >
      <div className='bg-white z-50'>
        <div className='flex text-gray-71 text-sm'>
          <div className='w-2/3 flex'>
            {renderDateFilter()}
            {renderSourceAddressFilter()}
            {renderRecipientsFilter()}
          </div>
          {renderTransactionTypeFilter()}
        </div>
        <div className='h-409px overflow-y-auto mt-3 pr-2'>
          <Table
            columns={Columns}
            data={mappedAddressTransactions}
            headerTrClasses='text-gray-4a font-extrabold font-base border-b border-opacity-50 pb-4 border-gray-a6 h-12 text-sm md:text-base'
            bodyTrClasses='h-67px border-b border-line text-sm md:text-base'
            isLoading={isLoading}
          />
        </div>
      </div>
    </TitleModal>
  )
}
