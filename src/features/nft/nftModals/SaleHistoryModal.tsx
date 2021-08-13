import Link from 'common/components/Link'
import React from 'react'
import Modal from './modal'
import Table from './table'
import NumberFormat from 'react-number-format'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TSaleHistoryModal = {
  isOpen: boolean
  handleClose: () => void
}

const rate = 0.004

export const SaleHistoryModal = ({
  isOpen,
  handleClose,
}: TSaleHistoryModal): JSX.Element => {
  const currencyName = useCurrencyName()
  const Columns = [
    {
      name: '# Copy',
      key: 'copy',
      sortable: true,
      className: 'pl-10 w-[153px]',
    },
    {
      name: 'Date',
      key: 'date',
      sortable: true,
      className: 'w-[185px]',
    },
    {
      name: 'Owner',
      key: 'owner',
      sortable: true,
      className: 'w-[170px]',
    },
    {
      name: 'Current Owner',
      key: 'current_owner',
      sortable: true,
      className: 'w-[213px]',
    },
    {
      name: 'Price paid',
      key: 'price_paid',
      sortable: true,
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
          <div className='ml-[50px]'>
            <Link>price history</Link>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => handleClose()}
      size='1142px'
      title={'"Diamonds in the sky" Sale History'}
      titleClassName='text-2xl font-black text-gray-2d'
      infoIcon={true}
      bodyClassName='px-0'
      append={
        <span className='font-medium text-base text-gray-71 mb-1 ml-[13px]'>
          NFT ID 230456346
        </span>
      }
    >
      <div className='ml-10 mr-[29px] mb-6'>
        <Table
          columns={Columns}
          data={tableData}
          className='h-401px pr-5'
          trClassName='border-b border-gray-f2'
        />
      </div>
    </Modal>
  )
}

const tableData = [
  {
    copy: '1345/1',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
  {
    copy: '1345/2',
    date: '11/04/21 01:43',
    owner: 'Katy Jailson',
    current_owner: 'Williams Scottish',
    price_paid: 12000,
  },
]
