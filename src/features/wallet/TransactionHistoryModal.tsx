import React from 'react'
// Components
import Modal from './modal'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import passEyeIcon from '../../common/assets/icons/ico-pass-eye.svg'
import commentIcon from '../../common/assets/icons/ico-comment.svg'
import checkGreenIcon from '../../common/assets/icons/ico-check-green.svg'
import clockYellowIcon from '../../common/assets/icons/ico-clock-yellow.svg'
import crossIcon from '../../common/assets/icons/ico-cross.svg'
import caretDownIcon from '../../common/assets/icons/ico-caret-down.svg'
import caretDown2Icon from '../../common/assets/icons/ico-caret-down2.svg'
import calendarIcon from '../../common/assets/icons/ico-calendar.svg'
import addressbookIcon from '../../common/assets/icons/ico-addressbook.svg'
import user2Icon from '../../common/assets/icons/ico-user2.svg'
import radioIcon from '../../common/assets/icons/ico-radio.svg'
import radioCheckedIcon from '../../common/assets/icons/ico-radio-checked.svg'
import Table, {
  TColumnDefinitionType,
} from '../../common/components/Table/Table'

type TDataType = {
  date: string
  address: string
  type: string
  status: string
  id: string
  comments: string
  fee: string
  amount: string
}

const columns: TColumnDefinitionType<TDataType, keyof TDataType>[] = [
  {
    key: 'date',
    header: 'Date',
  },
  {
    key: 'address',
    header: 'Recipient address',
    classnames: '',
  },
  {
    key: 'type',
    header: 'Source type',
  },
  {
    key: 'status',
    header: 'Status',
    classnames: 'text-gray-a0 lg:ml-16 xl:ml-86px',
  },
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'comments',
    header: 'Comments',
  },
  {
    key: 'fee',
    header: 'Fee',
  },
  {
    key: 'amount',
    header: 'Amount',
  },
]

export type TTransactionHistoryModalProps = {
  isOpen: boolean
  handleClose: () => void
  transactionHistory: Array<TDataType>
}

const TransactionHistoryModal: React.FC<TTransactionHistoryModalProps> = ({
  isOpen,
  handleClose,
  transactionHistory,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='7xl'
      title='Transaction history'
    >
      <div className='flex text-gray-71 text-sm'>
        <div className='w-2/3 flex'>
          <div className='w-1/3 pr-6'>
            <div>Time range</div>
            <div className='shadow-input flex my-1 h-9 items-center text-gray-2d justify-between'>
              <div className='flex'>
                <img src={calendarIcon} className='ml-4 mr-2' />
                All
              </div>
              <img src={caretDownIcon} className='pr-4' />
            </div>
          </div>
          <div className='w-1/3 pr-6'>
            <div>Source address</div>
            <div className='shadow-input flex my-1 h-9 items-center text-gray-2d justify-between'>
              <div className='flex'>
                <img src={addressbookIcon} className='ml-4 mr-2' />
                All
              </div>
              <img src={caretDownIcon} className='pr-4' />
            </div>
          </div>
          <div className='w-1/3 pr-6'>
            <div>Recipients</div>
            <div className='shadow-input flex my-1 h-9 items-center text-gray-2d justify-between'>
              <div className='flex'>
                <img src={user2Icon} className='ml-4 mr-2' />
                All
              </div>
              <img src={caretDownIcon} className='pr-4' />
            </div>
          </div>
        </div>
        <div className='w-1/3 flex justify-end  items-end pb-2'>
          <div className='flex items-center pl-4'>
            <img src={radioIcon} className='pr-2' />
            All
          </div>
          <div className='flex items-center pl-4'>
            <img src={radioIcon} className='pr-2' />
            Received
          </div>
          <div className='flex items-center pl-4'>
            <img src={radioCheckedIcon} className='pr-2' />
            Sent
          </div>
          <div className='flex items-center pl-4'>
            <img src={radioIcon} className='pr-2' />
            In progress
          </div>
        </div>
      </div>
      <div className='pt-6'>
        <Table
          columns={columns}
          data={transactionHistory}
          trClasses='pt-18px pb-19px ml-2 md:ml-3 lg:ml-6 xl:ml-38px pl-4 md:pl-31px pr-4 md:pr-31px flex border-b border-line-DEFAULT mr-4 justify-between'
          hasChecked={false}
        />
        <table className='w-full text-gray-71'>
          <tbody>
            <tr className='h-12 text-gray-4a  border-b border-gray-a0'>
              <th className='text-left'>
                <div className='flex items-center'>
                  Date
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  Recipient address
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  Source type
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  Status
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  ID
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  Comments
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left pr-4'>
                <div className='flex items-center'>
                  Fee
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
              <th className='text-left'>
                <div className='flex items-center'>
                  Amount
                  <img src={caretDown2Icon} className='ml-2 mt-1' />
                </div>
              </th>
            </tr>
            {transactionHistory.map((data: TDataType, index: number) => (
              <tr key={index} className='h-67px'>
                <td>{data.date}</td>
                <td className=''>
                  <div className='flex'>
                    <span className='text-blue-3f'>{data.address}</span>
                    <img className='ml-6' src={pencilIcon} />
                    <img className='ml-18px' src={passEyeIcon} />
                  </div>
                </td>
                <td className=''>{data.type}</td>
                <td className=''>
                  <img
                    src={
                      data.status == 'success'
                        ? checkGreenIcon
                        : data.status == 'pending'
                        ? clockYellowIcon
                        : data.status == 'failed'
                        ? crossIcon
                        : undefined
                    }
                    className='mt-3 ml-5 transform -translate-y-2/4 -translate-x-2/4'
                  />
                </td>
                <td className=''>{data.id}</td>
                <td className=''>
                  <img src={commentIcon} className='ml-8' />
                </td>
                <td className=''>{data.fee}</td>
                <td className=''>{data.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}

export default TransactionHistoryModal
