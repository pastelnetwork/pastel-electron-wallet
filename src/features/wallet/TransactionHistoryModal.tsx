import React, { useState } from 'react'
import { TitleModal } from '../../common/components/Modal'
import Table from '../../common/components/Table'
import * as momentRange from 'moment-range'
import { OnSelectCallbackParam } from 'react-daterange-picker'
import DateRangeSelector from '../../common/components/DateRangeSelector/DateRangeSelector'
import Radio from '../../common/components/Radio/Radio'
import Select, { TOption } from '../../common/components/Select/Select'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import passEyeIcon from '../../common/assets/icons/ico-pass-eye.svg'
import commentIcon from '../../common/assets/icons/ico-comment.svg'
import checkGreenIcon from '../../common/assets/icons/ico-check-green.svg'
import clockYellowIcon from '../../common/assets/icons/ico-clock-yellow.svg'
import crossIcon from '../../common/assets/icons/ico-cross.svg'
import addressbookIcon from '../../common/assets/icons/ico-addressbook.svg'
import user2Icon from '../../common/assets/icons/ico-user2.svg'

export type TransactionHistoryModalProps = {
  isOpen: boolean
  handleClose: () => void
}

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
  isOpen,
  handleClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<
    'all' | 'received' | 'sent' | 'in progress'
  >('all')
  const [dates, setDates] = useState<momentRange.DateRange>()
  const [address, setAddress] = useState<TOption | null>({
    label: 'All',
    value: '',
  })
  const [recipient, setRecipient] = useState<TOption | null>({
    label: 'All',
    value: '',
  })

  const onSelectDateRange = (dates: OnSelectCallbackParam) => {
    setDates(dates as momentRange.DateRange)
  }
  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='7xl'
      title='Transaction history'
    >
      <div>
        <div className='flex text-gray-71 text-sm'>
          <div className='w-2/3 flex'>
            <div className='w-1/3 pr-10'>
              <div>Time range</div>
              <DateRangeSelector value={dates} onSelect={onSelectDateRange} />
            </div>
            <div className='w-1/3 pr-6'>
              <div className='mb-1'>Source address</div>
              <Select
                label={<img src={addressbookIcon} className='ml-4 mr-2' />}
                className='text-gray-2d w-112px'
                selected={address}
                options={sourceAddresses}
                onChange={setAddress}
              />
            </div>
            <div className='w-1/3 pr-6'>
              <div className='mb-1'>Recipients</div>
              <Select
                label={<img src={user2Icon} className='ml-4 mr-2' />}
                className='text-gray-2d w-112px'
                selected={recipient}
                options={recipients}
                onChange={setRecipient}
              />
            </div>
          </div>
          <div className='w-1/3 flex justify-end items-center space-x-4 pt-6'>
            <Radio
              isChecked={selectedOption === 'all'}
              clickHandler={() => setSelectedOption('all')}
            >
              All
            </Radio>
            <Radio
              isChecked={selectedOption === 'received'}
              clickHandler={() => setSelectedOption('received')}
            >
              Received
            </Radio>
            <Radio
              isChecked={selectedOption === 'sent'}
              clickHandler={() => setSelectedOption('sent')}
            >
              Sent
            </Radio>
          </div>
        </div>
        <div className='h-409px overflow-y-auto mt-3 pr-2'>
          <Table
            columns={Columns}
            data={transactionHistory}
            headerTrClasses='text-gray-4a font-extrabold font-base border-b border-opacity-50 pb-4 border-gray-a6 h-12 text-sm md:text-base'
            bodyTrClasses='h-67px border-b border-line text-sm md:text-base'
          />
        </div>
      </div>
    </TitleModal>
  )
}

const Columns = [
  {
    name: 'Date',
    key: 'date',
    headerColClasses: 'ml-15px',
    custom: (value: string | number) => <div className='ml-15px'>{value}</div>,
  },
  {
    key: 'address',
    name: 'Recipient address',
    custom: (value: string | number) => (
      <div className='flex mr-2 lg:mr-0'>
        <span className='text-blue-3f cursor-pointer'>{value}</span>
        <img className='ml-2 md:ml-6 cursor-pointer' src={pencilIcon} />
        <img className='ml-2 md:ml-18px cursor-pointer' src={passEyeIcon} />
      </div>
    ),
  },
  {
    key: 'type',
    name: 'Source type',
  },
  {
    key: 'status',
    name: 'Status',
    custom: (value: string | number) => (
      <img
        src={
          value == 'success'
            ? checkGreenIcon
            : value == 'pending'
            ? clockYellowIcon
            : value == 'failed'
            ? crossIcon
            : undefined
        }
        className='mt-3 ml-5 transform -translate-y-2/4 -translate-x-2/4'
      />
    ),
  },
  {
    key: 'id',
    name: 'ID',
  },
  {
    key: 'comments',
    name: 'Private Notes',
    custom: () => <img src={commentIcon} className='ml-8 cursor-pointer' />,
  },
  {
    key: 'fee',
    name: 'Fee',
  },
  {
    key: 'amount',
    name: 'Amount',
  },
]

const transactionHistory = [
  {
    date: '11.04.21 01:43',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
    type: 'Shielded',
    status: 'success',
    id: '2654843-5933',
    comments: 'abcdefg',
    fee: '100',
    amount: '24,000',
  },
  {
    date: '11.04.21 05:00',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    type: 'Shielded',
    status: 'pending',
    id: '2654843',
    comments: 'abcdefg',
    fee: '100',
    amount: '22,000',
  },
  {
    date: '11.04.21 17:33',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v35',
    type: 'Shielded',
    status: 'failed',
    id: '2654843',
    comments: 'abcdefg',
    fee: '100',
    amount: '23,000',
  },
  {
    date: '11.04.21 17:33',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v35',
    type: 'Shielded',
    status: 'failed',
    id: '2654843',
    comments: 'abcdefg',
    fee: '100',
    amount: '23,000',
  },
  {
    date: '11.04.21 17:33',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v35',
    type: 'Shielded',
    status: 'failed',
    id: '2654843',
    comments: 'abcdefg',
    fee: '100',
    amount: '23,000',
  },
  {
    date: '11.04.21 17:33',
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v35',
    type: 'Shielded',
    status: 'failed',
    id: '2654843',
    comments: 'abcdefg',
    fee: '100',
    amount: '23,000',
  },
]

const sourceAddresses: Array<TOption> = [
  {
    label: 'All',
    value: '0',
  },
  {
    label: 'Test',
    value: '1',
  },
  {
    label: 'Test2',
    value: '2',
  },
]

const recipients: Array<TOption> = [
  {
    label: 'All',
    value: '0',
  },
  {
    label: 'Test',
    value: '1',
  },
  {
    label: 'Test2',
    value: '2',
  },
]

export default TransactionHistoryModal
