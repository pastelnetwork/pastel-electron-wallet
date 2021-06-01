import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import NumberFormat from 'react-number-format'
import PaymentModal from './PaymentModal'
import TransactionHistoryModal from './TransactionHistoryModal'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'
import elminationIcon from '../../common/assets/icons/ico-elmination.svg'
import pasteIcon from '../../common/assets/icons/ico-paste.svg'
import clockIcon from '../../common/assets/icons/ico-clock.svg'
import plusIcon from '../../common/assets/icons/ico-plus.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import viewIcon from '../../common/assets/icons/ico-view.svg'
import electIcon from '../../common/assets/icons/ico-elect.svg'
import Tooltip from '../../common/components/Tooltip/Tooltip'
import Toggle from '../../common/components/Toggle'
import { theme } from '../../common/theme'
import Checkbox from '../../common/components/Checkbox/Checkbox'
import AutoComplete from '../../common/components/AutoComplete/AutoComplete'
import Button from '../../common/components/Button/Button'

const WalletScreen: React.FC = () => {
  interface IDataType {
    hash: string
    time: string
    checked: boolean
  }

  const walletdatas = [
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
    },
    {
      hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
      time: '1d 1 h 25m ago',
      checked: false,
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

  const transactionHistory = [
    {
      date: '11.04.21 01:43',
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
      type: 'Shielded',
      status: 'success',
      id: '2654843-5933',
      comments: 'abcdefg',
      fee: '100',
      amount: '22.000',
    },
    {
      date: '11.04.21 01:43',
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
      type: 'Shielded',
      status: 'pending',
      id: '2654843-5933',
      comments: 'abcdefg',
      fee: '100',
      amount: '22.000',
    },
    {
      date: '11.04.21 01:43',
      address: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
      type: 'Shielded',
      status: 'failed',
      id: '2654843-5933',
      comments: 'abcdefg',
      fee: '100',
      amount: '22.000',
    },
  ]

  const [isChecked, setIsChecked] = useState(false)
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false)
  const [
    isTransactionHistoryModalOpen,
    setTransactionHistoryModalOpen,
  ] = useState(false)

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

  const checkHandler = (
    event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    index: number,
  ) => {
    if ((event?.target as HTMLElement).tagName === 'LABEL') {
      return
    }
    console.log(index)
    setIsChecked(previousValue => !previousValue)
  }
  return (
    <ThemeProvider theme={theme}>
      <div className='bg-gray-f8 pt-5 sm:px-10 md:px-60px'>
        <div className='flex justify-between '>
          {card_items.map((card, index) => (
            <div key={index} className='mr-18px relative'>
              <div className='absolute top-15px right-15px'>
                {card.style.info ? (
                  <Tooltip content='Transparent Info'>
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
                    PSL{' '}
                    <NumberFormat
                      value={card.psl}
                      displayType={'text'}
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
            <Toggle />
            <img className='ml-2' src={elminationIcon} />
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
                displayType={'text'}
                thousandSeparator={true}
              />{' '}
              PSL
            </span>
          </div>
          <div className='mb-15px h-456px overflow-y-scroll mr-4'>
            <table className='w-full'>
              <tbody>
                {walletdatas.map((data: IDataType, index: number) => (
                  <tr
                    key={index}
                    className='pt-18px pb-19px ml-38px pl-31px pr-31px flex border-b border-line-DEFAULT mr-4 justify-between'
                  >
                    <td className='flex items-center whitespace-nowrap'>
                      <Checkbox
                        isChecked={isChecked}
                        clickHandler={e => {
                          checkHandler(e, index)
                        }}
                      >
                        <span className='text-blue-3f'>{data.hash}</span>
                      </Checkbox>
                      <img className='ml-7' src={pasteIcon} />
                      <img className='ml-25px' src={pencilIcon} />
                    </td>
                    <td className='flex items-center ml-75px'>
                      <img src={viewIcon} />
                    </td>
                    <td className='flex items-center whitespace-nowrap'>
                      <span className='text-gray-a0 ml-117px'>{data.time}</span>
                    </td>
                    <td className='flex items-center whitespace-nowrap'>
                      <span className='text-gray-a0 ml-86px'>viewing key</span>
                    </td>
                    <td className='flex items-center whitespace-nowrap'>
                      <span className='text-gray-a0 ml-59px'>private key</span>
                    </td>
                    <td className='flex items-center ml-60px'>
                      <div>
                        <AutoComplete
                          selected={{ value: '20000' }}
                          startNumber={20000}
                          endNumber={24000}
                          diffNumber={2000}
                          onChange={value => console.log(value)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='flex justify-end mt-5'>
          <Button variant='transparent' style={{ width: '247px' }}>
            <div className='flex items-center  ml-6'>
              <img src={electIcon} className='py-3' />
              <span className='text-sm ml-11px'>Create a new PSL address</span>
            </div>
          </Button>
          <Button
            className='ml-11px'
            style={{ width: '174px' }}
            onClick={() => setPaymentModalOpen(true)}
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
        transactionHistory={transactionHistory}
        isOpen={isTransactionHistoryModalOpen}
        handleClose={() => {
          setTransactionHistoryModalOpen(false)
        }}
      ></TransactionHistoryModal>
    </ThemeProvider>
  )
}

export default WalletScreen
