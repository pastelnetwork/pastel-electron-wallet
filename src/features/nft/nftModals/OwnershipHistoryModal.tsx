import React from 'react'
import Modal from './modal'
import Table from './table'

import NumberFormat from 'react-number-format'
import { Quit } from 'common/components/Icons'
import { useCurrencyName } from 'common/hooks/appInfo'

const rate = 0.004

export type TOwnershipHistoryModal = {
  isOpen: boolean
  handleClose: () => void
}

const OwnershipHistoryModal = ({
  isOpen,
  handleClose,
}: TOwnershipHistoryModal): JSX.Element => {
  const currencyName = useCurrencyName()
  const Columns = [
    {
      name: 'Deal',
      key: 'Deal',
      className: 'pl-8',
      tdClassName: 'text-gray-71 font-medium w-[155px]',
      sortable: true,
    },
    {
      name: 'Date',
      key: 'Date',
      tdClassName: 'text-gray-a0 font-medium w-[190px]',
      sortable: true,
    },
    {
      name: 'Buyer',
      key: 'buyer',
      tdClassName: 'text-gray-4a text-base font-medium w-[166px]',
      sortable: true,
    },
    {
      name: 'Seller',
      key: 'seller',
      tdClassName: 'text-gray-4a font-medium',
      sortable: true,
    },
    {
      name: 'Fee paid',
      key: 'fee_paid',
      tdClassName: 'text-gray-4a font-medium',
      custom: (value: string) => (
        <div className='flex items-center'>
          <div className='text-base text-gray-4a font-medium min-w-[81px]'>
            <NumberFormat
              value={value}
              displayType='text'
              thousandSeparator={true}
            />{' '}
            {currencyName}
          </div>
          <div className='ml-7 text-gray-71 font-normal text-sm min-w-[67px]'>
            <NumberFormat
              value={parseInt(value) * rate}
              displayType='text'
              thousandSeparator={true}
              decimalScale={2}
            />{' '}
            USD
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Transaction ID',
      key: 'transaction_id',
      tdClassName: 'text-gray-4a font-medium',
      align: 'center',
      custom: () => (
        <div className='flex justify-center'>
          <Quit size={16} className='text-blue-3f' />
        </div>
      ),
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='1224px'
      title={'“Diamonds in the sky”: copy #1 ownership history'}
      infoIcon={true}
      bodyClassName='pr-5 pl-10'
      titleClassName='font-black text-2xl text-gray-2d'
    >
      <div>
        <Table
          columns={Columns}
          data={tableData}
          fixedHeader={true}
          className='h-401px pr-5'
          trClassName='border-b border-gray-f2'
        />
      </div>
    </Modal>
  )
}

const tableData = [
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#2',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#3',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#4',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#5',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#6',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#7',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#8',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
  {
    Deal: '#1',
    Date: '11/11/21 16:55',
    buyer: 'Katy Jailson',
    seller: 'Williams Scottish',
    fee_paid: 12000,
  },
]

export default OwnershipHistoryModal
