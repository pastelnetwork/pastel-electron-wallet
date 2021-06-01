import React from 'react'
import NumberFormat from 'react-number-format'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'
import elminationIcon from '../../common/assets/icons/ico-elmination.svg'
import clockIcon from '../../common/assets/icons/ico-clock.svg'
import plusIcon from '../../common/assets/icons/ico-plus.svg'
import electIcon from '../../common/assets/icons/ico-elect.svg'
import Tooltip from '../../common/components/Tooltip/Tooltip'
import Toggle from '../../common/components/Toggle'
import { ThemeProvider } from 'styled-components/macro'
import { theme } from '../../common/theme'
import Button from '../../common/components/Button/Button'
import Table, {
  ColumnDefinitionType,
} from '../../common/components/Table/Table'

interface Transaction {
  hash: string
  time: string
  viewing_key?: string
  private_key?: string
  psl: number
  qr_code?: string
}

const columns: ColumnDefinitionType<Transaction, keyof Transaction>[] = [
  {
    key: 'hash',
    header: 'Hash',
  },
  {
    key: 'qr_code',
    header: 'QR Code',
    classnames: '',
  },
  {
    key: 'time',
    header: 'Time',
    classnames: 'text-gray-a0 lg:ml-20 xl:ml-117px',
  },
  {
    key: 'viewing_key',
    header: 'Viewing Key',
    classnames: 'text-gray-a0 lg:ml-16 xl:ml-86px',
  },
  {
    key: 'private_key',
    header: 'Private Key',
    classnames: 'text-gray-a0 lg:ml-11 xl:ml-59px',
  },
  {
    key: 'psl',
    header: 'psl',
    classnames: 'psl',
  },
]

const walletdatas: Transaction[] = [
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v33',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 15000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 15000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
  {
    hash: 'ps19jxlfdl8mhnsqlf7x0cwlh...eq0v34',
    time: '1d 1 h 25m ago',
    viewing_key: 'viewing key',
    private_key: 'private key',
    psl: 18000,
  },
]

const WalletScreen: React.FC = () => {
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

  // const checkHandler = (
  //   event: React.MouseEvent<HTMLLabelElement, MouseEvent>,
  //   index: number,
  // ) => {
  //   if ((event?.target as HTMLElement).tagName === 'LABEL') {
  //     return
  //   }
  //   console.log(index)
  //   const temp = walletdatas
  //   // temp[index] = { ...temp[index], checked: !temp[index].checked }
  //   // setWalletDatas([...temp])
  // }
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
          <div className='flex'>
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
            <Table
              data={walletdatas}
              columns={columns}
              checkHandler={e => {
                console.log(e)
              }}
              clickedHandler={d => {
                console.log(d)
              }}
            />
          </div>
        </div>

        <div className='flex justify-end mt-5'>
          <Button variant='transparent' style={{ width: '247px' }}>
            <div className='flex items-center  ml-6'>
              <img src={electIcon} className='py-3' />
              <span className='text-sm ml-11px'>Create a new PSL address</span>
            </div>
          </Button>
          <Button className='ml-11px' style={{ width: '174px' }}>
            <div className='flex items-center ml-5'>
              <img src={plusIcon} className='py-3.5' />
              <span className='text-sm ml-2'>Create a payment</span>
            </div>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default WalletScreen
