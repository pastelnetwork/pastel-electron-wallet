import React, { useCallback } from 'react'
import Modal from './modal'
import Table from './table'
import dayjs from 'common/utils/initDayjs'
import NumberFormat from 'react-number-format'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

export type TLikeListModal = {
  isOpen: boolean
  handleClose: () => void
}

function LikeListModal({ isOpen, handleClose }: TLikeListModal): JSX.Element {
  const Columns = [
    {
      name: translate('time'),
      key: 'time',
      className: 'pl-10 w-[250px]',
      sortable: true,
      custom: (value: string) => (
        <div className='flex items-center'>
          {dayjs(value).fromNow(true)} ago
        </div>
      ),
    },
    {
      name: translate('member'),
      key: 'member',
      className: 'pl-4 w-[200px]',
      sortable: true,
    },
    {
      name: translate('sold'),
      key: 'sold',
      className: 'pl-4 w-[200px]',
      sortable: true,
    },
    {
      name: translate('followers'),
      key: 'followers',
      className: 'pl-4 w-[200px]',
      sortable: true,
      custom: (value: string) => (
        <div>
          <NumberFormat
            value={parseInt(value) / 1000}
            decimalScale={2}
            displayType='text'
            thousandSeparator
          />
          k{' '}
        </div>
      ),
    },
  ]
  const currencyName = useCurrencyName()
  const tableData = [
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Reymundo',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
    {
      time: new Date().toString(),
      member: 'UnkleBens',
      Recipient: 'Harber',
      sold: `12mm ${currencyName}`,
      followers: 12000,
    },
  ]

  const onCloseModal = useCallback(() => {
    handleClose()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onCloseModal}
      size='874px'
      title={`"Diamonds in the sky" ${translate('likes')}`}
      titleClassName='text-2xl font-black text-gray-2d'
      bodyClassName='px-0'
    >
      <div className='ml-10 mr-9 mb-6'>
        <Table
          columns={Columns}
          data={tableData}
          className='h-401px pr-[30px]'
          trClassName='border-b border-gray-f2'
          fixedHeader
        />
      </div>
    </Modal>
  )
}

export default LikeListModal
