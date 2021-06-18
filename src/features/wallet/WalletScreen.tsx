import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import cn from 'classnames'

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
import CrossIcon from '../../common/assets/icons/ico-cross-btn.svg'
import SaveIcon from '../../common/assets/icons/ico-save.svg'
import Table, { TRow } from '../../common/components/Table'

import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import ExportKeysModal from './ExportKeysModal'
import Breadcrumbs from '../../common/components/Breadcrumbs'

export type TWalletData = {
  id: number
  address: string
  time: string
  qr_code: string
  public_key: string
  amount: number
  psl: number
  type: 'transparent' | 'shielded'
  address_nick: string
}

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
  const [walletDatas, setWalletDatas] = useState<Array<TWalletData>>([
    {
      id: 7,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v40',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'transparent',
      address_nick: '',
    },
    {
      id: 8,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v41',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'transparent',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v42',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'transparent',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v43',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v44',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v45',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v46',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v47',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v48',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
    {
      id: 9,
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v49',
      time: '1d 1 h 25m ago',
      qr_code: '',
      public_key: '',
      amount: 110,
      psl: 18000,
      type: 'shielded',
      address_nick: '',
    },
  ])

  const Columns = [
    {
      key: 'address',
      colClasses: 'lg:w-380px xl:w-428px 1500px:w-478px',
      name: 'Address name',
      headerColClasses: '-ml-5',
      custom: (value: string | number, row: TRow | undefined) => (
        <div className='flex ml-3 xl:ml-21px items-center mr-2 md:mr-0'>
          {edit === value ? (
            <input
              value={editName}
              onChange={e => {
                setEditName(e.target.value)
              }}
              className='w-220px md:w-262px h-10 border border-link text-sm font-medium rounded px-4'
            ></input>
          ) : !!row && row.address_nick.toString() ? (
            <div className='w-220px md:w-262px'>
              <Tooltip
                width={300}
                type='right'
                content={row.address.toString()}
              >
                <span className='text-blue-3f cursor-pointer'>
                  {row.address_nick.toString()}
                </span>
              </Tooltip>
            </div>
          ) : (
            <span className='w-220px md:w-262px text-blue-3f cursor-pointer'>
              {value}
            </span>
          )}
          {edit === value ? (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
              <img
                className='cursor-pointer'
                onClick={() => {
                  setEdit(null)
                }}
                src={CrossIcon}
              />
            </div>
          ) : (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-7'>
              <img className='cursor-pointer w-5 h-5' src={pasetIcon} />
            </div>
          )}
          {edit === value ? (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
              <img
                className='cursor-pointer'
                onClick={() => {
                  const temp = walletDatas
                  temp.forEach((item, index) => {
                    if (item.address == edit) {
                      temp[index].address_nick = editName
                    }
                  })
                  setEdit(null)
                  setWalletDatas([...temp])
                }}
                src={SaveIcon}
              />
            </div>
          ) : (
            <div className='w-5 h-5 flex items-center ml-3 xl:ml-26px'>
              <img
                className='cursor-pointer'
                onClick={() => {
                  if (row) {
                    setEditName(row.address.toString())
                    setEdit(row.address.toString())
                  }
                }}
                src={pencilIcon}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'time',
      name: 'Last Activity',
      colClasses: 'w-190px 1500px:w-244px',
      custom: (value: string | number) => (
        <div className='mr-3 md:mr-0'>{value}</div>
      ),
    },
    {
      key: 'qr_code',
      name: 'Address QR',
      colClasses: 'min-w-80px w-132px 1500px:w-244px',
      custom: () => (
        <div className='flex'>
          <img src={viewIcon} />
        </div>
      ),
    },

    {
      key: 'private_key',
      name: 'Keys',
      colClasses: 'min-w-130px w-176px 1500px:w-244px flex-grow-0',
      custom: (value: string | number) => (
        <div className='flex items-center'>
          <span>public key</span>
          <img
            className='ml-9px cursor-pointer'
            onClick={() => {
              setExportKeysModalOpen(true)
            }}
            key={value}
            src={PDFIcon}
            alt='PDF Icon'
          />
        </div>
      ),
    },
    {
      key: 'amount',
      name: 'Balance',
      colClasses: 'w-131px 1500px:w-244px',
      custom: (value: string | number) => (
        <div className='text-gray-2d'>PSL {value}</div>
      ),
    },
    {
      key: 'psl',
      name: 'Selected Amount',
      colClasses: 'min-w-130px w-141px 1500px:w-244px',
      custom: (value: number | string, row: TRow | undefined) => (
        <div className='z-0'>
          <Select
            className='text-gray-2d w-28'
            autocomplete={true}
            min={10000}
            max={20000}
            step={100}
            value={typeof value === 'string' ? parseInt(value) : value}
            onChange={(value: number | null) => {
              const temp = walletDatas
              temp.forEach((item, index) => {
                if (row && item.address === row.address && value) {
                  temp[index].psl = value
                }
              })
              setWalletDatas([...temp])
            }}
          />
        </div>
      ),
    },
  ]

  const card_items = [
    {
      style: {
        type: 'total_balance',
        info: false,
      },
      psl: 210000,
      icon: placeholderIcon,
      info: 'Total Balance',
    },
    {
      style: {
        type: 'transparent',
        info: true,
      },
      psl: 110000,
      icon: placeholderIcon,
      info: 'Transparent Information',
    },
    {
      style: {
        type: 'shielded',
        info: true,
      },
      psl: 100000,
      icon: placeholderIcon,
      info: 'Shielded Information',
    },
  ]

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)

  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)

  const [isExportKeysModalOpen, setExportKeysModalOpen] = useState(false)

  const [active, setActive] = useState(1)

  const [edit, setEdit] = useState<string | null>(null)
  const [editName, setEditName] = useState<string>('')
  const [transparentAmount, setTransparentAmount] = useState(0)
  const [shieldedAmount, setShieldedAmount] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [selectedRows, setSelectedRows] = useState<Array<string>>([])

  useEffect(() => {
    let tempTransparentAmount = 0
    let tempShieldedAmount = 0
    walletDatas.forEach(item => {
      if (item.type === 'transparent') {
        tempTransparentAmount += item.psl
      } else if (item.type === 'shielded') {
        tempShieldedAmount += item.psl
      }
    })
    setTransparentAmount(tempTransparentAmount)
    setShieldedAmount(tempShieldedAmount)
  }, [walletDatas])

  useEffect(() => {
    let tempSelectedAmount = 0
    walletDatas.forEach(item => {
      for (let i = 0; i < selectedRows.length; i++) {
        if (selectedRows[i] === item.address) {
          tempSelectedAmount += item.psl
        }
      }
    })
    setSelectedAmount(tempSelectedAmount)
  }, [selectedRows, walletDatas])

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
        <div className='font-extrabold text-h1 text-gray-1a'>Wallet</div>
        <div
          className='flex cursor-pointer'
          onClick={() => setTransactionHistoryModalOpen(true)}
        >
          <img src={clockIcon} />
          <span className='text-blue-3f ml-3.5'>Transaction history</span>
        </div>
      </div>

      <div className='bg-gray-f8 pt-5 sm:px-10 md:px-60px'>
        <div className='flex justify-between '>
          {card_items.map((card, index) => (
            <div
              key={index}
              onClick={() => {
                setActive(index)
              }}
              className='relative cursor-pointer'
            >
              <div className='absolute top-15px right-15px'>
                {card.style.info ? (
                  <Tooltip
                    classnames='pt-5px pl-9px pr-2.5 pb-1 text-xs'
                    content={card.info}
                    width={108}
                    type='top'
                  >
                    <img src={elminationIcon} />
                  </Tooltip>
                ) : null}
              </div>
              <div
                className={cn(
                  'font-extrabold flex sm:w-64 md:w-72 lg:w-335px xl:w-427px h-124px border-gray-e7 border rounded-lg',
                  active === index && 'bg-white',
                )}
              >
                <div className='pt-18px pl-4 md:pl-4 lg:pl-4 xl:pl-26px pb-19px'>
                  <img
                    className='w-92px h-87px cursor-pointer'
                    src={card.icon}
                  />
                </div>
                <div className='pt-36px pl-2 md:pl-3 lg:pl-35px'>
                  <div
                    className={cn(
                      'sm:text-xl md:text-2xl leading-6 pt-9',
                      index === active ? 'text-gray-2d' : 'text-gray-71',
                    )}
                  >
                    {props.info.currencyName}{' '}
                    <NumberFormat
                      value={
                        card.style.type === 'total_balance'
                          ? shieldedAmount + transparentAmount
                          : card.style.type === 'transparent'
                          ? transparentAmount
                          : shieldedAmount
                      }
                      displayType='text'
                      thousandSeparator={true}
                    />
                  </div>
                  {card.style.type === 'total_balance' ? (
                    <div className='text-gray-a0 text-sm uppercase'>
                      total balance
                    </div>
                  ) : card.style.type === 'transparent' ? (
                    <div className='text-gray-93 text-sm uppercase'>
                      Transparent
                    </div>
                  ) : (
                    <div className='text-gray-93 text-sm uppercase'>
                      Shielded
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {walletDatas.length > 0 && (
          <div className='bg-white mt-3.5 pt-6 rounded-lg mt-27px min-w-594px'>
            <div className='h-526px overflow-y-auto mr-4 pr-4 overflow-x-hidden ml-9'>
              {active !== 0 && (
                <Table
                  data={
                    active === 1
                      ? walletDatas.filter(item => item.type === 'transparent')
                      : walletDatas.filter(item => item.type === 'shielded')
                  }
                  columns={Columns}
                  headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                  bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                  showCheckbox={true}
                  selectedRow={setSelectedRowsFunction}
                />
              )}
              {active == 0 && (
                <div>
                  <div className='uppercase text-gray-2d text-h6 font-extrabold mb-1'>
                    transparent
                  </div>
                  <Table
                    data={walletDatas.filter(
                      item => item.type === 'transparent',
                    )}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                  />
                  <div className='uppercase text-gray-2d text-h6 font-extrabold mb-1 mt-7'>
                    Shielded
                  </div>
                  <Table
                    data={walletDatas.filter(item => item.type === 'shielded')}
                    columns={Columns}
                    headerTrClasses='text-gray-71 text-sm h-10 bg-white border-b border-line'
                    bodyTrClasses='h-76px border-b border-line text-sm 1200px:text-base'
                    showCheckbox={true}
                    selectedRow={setSelectedRowsFunction}
                  />
                </div>
              )}
            </div>

            <div className='border-t border-gray-e7 flex items-center h-72px justify-between pl-38px pr-30px'>
              <div className='flex items-center'>
                <Toggle>
                  Hide empty addresses
                  <img className='ml-2' src={elminationIcon} />
                </Toggle>
              </div>
              <div className='flex items-center'>
                <span className='text-gray-33 text-lg'>Selected total:</span>
                <span className='text-gray-2d font-extrabold text-h3 ml-3'>
                  <NumberFormat
                    value={selectedAmount}
                    displayType='text'
                    thousandSeparator={true}
                  />{' '}
                  PSL
                </span>
              </div>
            </div>
          </div>
        )}

        {walletDatas.length == 0 && (
          <div className='bg-white rounded-lg mt-3.5 flex items-center min-h-594px justify-center'>
            <div>
              <div className='text-gray-4a text-base text-center mb-3.5'>
                You have no Addresses
              </div>
              <Button variant='transparent' className='w-247px'>
                <div className='flex items-center  ml-6'>
                  <img src={electIcon} className='py-3' />
                  <span className='text-sm ml-11px'>
                    Generate a new PSL Address
                  </span>
                </div>
              </Button>
            </div>
          </div>
        )}

        <div className='flex justify-end mt-5 mb-10'>
          {walletDatas.length > 0 && (
            <Button variant='transparent' className='w-247px'>
              <div className='flex items-center  ml-6'>
                <img src={electIcon} className='py-3' />
                <span className='text-sm ml-11px'>
                  Generate a new PSL Address
                </span>
              </div>
            </Button>
          )}
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
        handleClose={() => setTransactionHistoryModalOpen(false)}
      ></TransactionHistoryModal>
      <ExportKeysModal
        isOpen={isExportKeysModalOpen}
        handleClose={() => setExportKeysModalOpen(false)}
      ></ExportKeysModal>
    </div>
  )
}

export default WalletScreen
