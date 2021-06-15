import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'
import elminationIcon from '../../common/assets/icons/ico-elmination.svg'
import clockIcon from '../../common/assets/icons/ico-clock.svg'
import plusIcon from '../../common/assets/icons/ico-plus.svg'
import electIcon from '../../common/assets/icons/ico-elect.svg'
import Tooltip from '../../common/components/Tooltip'
import Toggle from '../../common/components/Toggle'
import Button from '../../common/components/Button/Button'
import Select from '../../common/components/Select/Select'

import pasetIcon from '../../common/assets/icons/ico-paste.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import viewIcon from '../../common/assets/icons/ico-view.svg'
import PDFIcon from '../../common/assets/icons/ico-key-pdf.svg'
import Table, { TRow } from './table'

import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'

const Columns = [
  {
    key: 'address',
    name: 'Account name',
    custom: (value: string | number) => (
      <div className='flex'>
        <span className='text-blue-3f cursor-pointer'>{value}</span>
        <img className='ml-6 cursor-pointer' src={pasetIcon} />
        <img className='ml-18px cursor-pointer' src={pencilIcon} />
      </div>
    ),
  },
  {
    key: 'time',
    name: 'Last Activity',
  },
  {
    key: 'qr_code',
    name: 'QR',
    custom: () => (
      <div className='flex'>
        <img src={viewIcon} />
      </div>
    ),
  },

  {
    key: 'public_key',
    name: 'Keys',
    custom: (value: string | number) => (
      <div>
        <span>public key</span>
        <img key={value} src={PDFIcon} alt='PDF Icon' />
      </div>
    ),
  },
  {
    key: 'amount',
    name: 'Balence',
    custom: (value: string | number) => (
      <div className='text-gray-2d'>PSL {value}</div>
    ),
  },
  {
    key: 'psl',
    name: 'Selected Amount',
    custom: (value: number | string, row: TRow | undefined) => (
      <div>
        <Select
          className='text-gray-2d w-28'
          autocomplete={true}
          min={10000}
          max={20000}
          step={100}
          value={typeof value === 'string' ? parseInt(value) : value}
          onChange={(value: number | null) => {
            console.log(row)
            console.log(value)
          }}
        />
      </div>
    ),
  },
]

const walletdatas = [
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 145,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 15000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 50,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 15000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 400,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 25,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 250,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 110,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    qr_code: '',
    amount: 110,
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
]

const paymentSources = [
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
  },
  {
    hash: 'Michael Francis',
  },
]

type TInfoProps = {
  currencyName: string
}

type Tprops = {
  info: TInfoProps
}

const WalletScreen = (props: Tprops): JSX.Element => {
  const card_items = [
    {
      style: {
        type: 'total_balance',
        background: 'gray',
        info: false,
      },
      psl: 210000,
      icon: placeholderIcon,
    },
    {
      style: {
        type: 'transparent',
        background: 'white',
        info: true,
      },
      psl: 110000,
      icon: placeholderIcon,
    },
    {
      style: {
        type: 'icon_placeholder',
        background: 'gray',
        info: true,
      },
      psl: 100000,
      icon: placeholderIcon,
    },
  ]

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)
  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)

  return (
    <div>
      <div className='bg-gray-f8 pt-5 sm:px-10 md:px-60px'>
        <div className='flex justify-between '>
          {card_items.map((card, index) => (
            <div key={index} className='relative'>
              <div className='absolute top-15px right-15px'>
                {card.style.info ? (
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content='Transparent Info'
                    width={108}
                    type='top'
                  >
                    <img src={elminationIcon} />
                  </Tooltip>
                ) : null}
              </div>
              <div
                className={`flex sm:w-64 md:w-72 lg:w-335px xl:w-427px h-124px md:pl-2 lg:pl-26px border-gray-e7 border rounded-lg ${
                  card.style.background == 'white' ? 'bg-white' : ''
                }`}
              >
                <div className='pt-18px sm:pl-2 md:pl-0 lg:pl-2.5 xl:pl-26px pb-19px'>
                  <img className='w-92px h-87px' src={card.icon} />
                </div>
                <div className='pt-36px sm:pl-1 md:pl-3 lg:pl-35px'>
                  <div className='sm:text-xl md:text-2xl leading-6 text-gray-4e pt-9'>
                    {props.info.currencyName}{' '}
                    <NumberFormat
                      value={card.psl}
                      displayType='text'
                      thousandSeparator={true}
                    />
                  </div>
                  <div className='text-gray-93 text-sm'>TOTAL BALENCE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-3.5 flex items-center justify-between'>
          <div className='flex items-center'>
            <Toggle
              toggleHandler={e => {
                console.log(e)
              }}
            >
              Hide empty accounts
              <img className='ml-2' src={elminationIcon} />
            </Toggle>
          </div>
          <div
            className='flex cursor-pointer'
            onClick={() => setTransactionHistoryModalOpen(true)}
          >
            <img src={clockIcon} />
            <span className='text-blue-3f ml-3.5'>Transaction history</span>
          </div>
        </div>

        <div className='bg-white mt-3.5 h-553px'>
          <div className='flex justify-end mr-58px pt-18px items-center'>
            <span className='text-gray-33 text-lg'>Total:</span>
            <span className='text-blue-3f font-extrabold text-h3 ml-3'>
              <NumberFormat
                value='22000'
                displayType='text'
                thousandSeparator={true}
              />{' '}
              PSL
            </span>
          </div>
          <div className='mb-15px h-456px overflow-y-scroll mt-15px mr-4 scrollbar ml-30px'>
            <Table
              data={walletdatas}
              columns={Columns}
              headerTrClasses='text-gray-a0 font-normal'
              showCheckbox={true}
            />
          </div>
        </div>

        <div className='flex justify-end mt-5 mb-10'>
          <Button variant='transparent' className='w-247px'>
            <div className='flex items-center  ml-6'>
              <img src={electIcon} className='py-3' />
              <span className='text-sm ml-11px'>Create a new PSL address</span>
            </div>
          </Button>
          <Button
            onClick={() => setPaymentModalOpen(true)}
            className='ml-11px w-174px'
          >
            <div className='flex items-center ml-5'>
              <img src={plusIcon} className='py-3.5' />
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
      ></PaymentModal>
      <TransactionHistoryModal
        isOpen={isTransactionHistoryModalOpen}
        handleClose={() => {
          setTransactionHistoryModalOpen(false)
        }}
      ></TransactionHistoryModal>
    </div>
  )
}

export default WalletScreen
