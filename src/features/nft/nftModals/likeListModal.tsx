import React from 'react'
import Modal from './modal'
import Table from './table'
import dayjs from 'common/utils/initDayjs'
import NumberFormat from 'react-number-format'

export type TLikeListModal = {
  isOpen: boolean
  handleClose: () => void
}

const LikeListModal = ({
  isOpen,
  handleClose,
}: TLikeListModal): JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='874px'
      title={'"Diamonds in the sky" Likes'}
      titleClassName='text-2xl font-black text-gray-2d'
      bodyClassName='px-0'
    >
      <div className='ml-10 mr-9 mb-6'>
        <Table
          columns={Columns}
          data={tableData}
          className='h-401px pr-[30px]'
          trClassName='border-b border-gray-f2'
          fixedHeader={true}
        />
      </div>
    </Modal>
  )
}

const Columns = [
  {
    name: 'Time',
    key: 'time',
    className: 'pl-10 w-[250px]',
    sortable: true,
    custom: (value: string) => (
      <div className='flex items-center'>{dayjs(value).fromNow(true)} ago</div>
    ),
  },
  {
    name: 'Member',
    key: 'member',
    className: 'pl-4 w-[200px]',
    sortable: true,
  },
  {
    name: 'Sold',
    key: 'sold',
    className: 'pl-4 w-[200px]',
    sortable: true,
  },
  {
    name: 'Followers',
    key: 'followers',
    className: 'pl-4 w-[200px]',
    sortable: true,
    custom: (value: string) => (
      <div>
        <NumberFormat
          value={parseInt(value) / 1000}
          decimalScale={2}
          displayType='text'
          thousandSeparator={true}
        />
        k{' '}
      </div>
    ),
  },
]

const tableData = [
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Reymundo',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
  {
    time: new Date().toString(),
    member: 'UnkleBens',
    Recipient: 'Harber',
    sold: '12mm PSL',
    followers: 12000,
  },
]

export default LikeListModal
