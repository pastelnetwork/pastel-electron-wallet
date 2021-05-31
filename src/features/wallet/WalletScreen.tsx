import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'
import elminationIcon from '../../common/assets/icons/ico-elmination.svg'
import pasteIcon from '../../common/assets/icons/ico-paste.svg'
import clockIcon from '../../common/assets/icons/ico-clock.svg'
import pencilIcon from '../../common/assets/icons/ico-pencil.svg'
import viewIcon from '../../common/assets/icons/ico-view.svg'
import Tooltip from '../../common/components/Tooltip/Tooltip'
import Toggle from '../../common/components/Toggle'
import { ThemeProvider } from 'styled-components/macro'
import { theme } from '../../common/theme'
import Checkbox from '../../common/components/Checkbox/Checkbox'
import AutoComplete from '../../common/components/AutoComplete/AutoComplete'

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
  ]
  const [isChecked, setIsChecked] = useState(false)
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
      <div className='bg-gray-f8 pt-5 px-60px'>
        <div className='flex'>
          {card_items.map(card => (
            <div className='mr-18px relative'>
              <div className='absolute top-15px right-15px'>
                {card.style.info ? (
                  <Tooltip content='Transparent Info'>
                    <img src={elminationIcon} />
                  </Tooltip>
                ) : null}
              </div>
              <div
                className={`flex w-427px h-124px pl-26px border-gray-e7 border rounded-lg ${
                  card.style.background == 'white' ? 'bg-white' : ''
                }`}
              >
                <div className='pt-18px pl-26px pb-19px'>
                  <img className='w-92px h-87px' src={card.icon} />
                </div>
                <div className='pt-36px pl-35px'>
                  <div className='text-2xl leading-6 text-gray-4e pt-9'>
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

        <div className='bg-white mt-3.5'>
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
          <div className='mb-15px ml-9'>
            <table>
              {walletdatas.map((data: IDataType, index: number) => (
                <tr className='mt-26px ml-31px flex'>
                  <td className='flex items-center'>
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
                  <td>
                    <span className='text-gray-a0 ml-117px'>{data.time}</span>
                  </td>
                  <td>
                    <span className='text-gray-a0 ml-86px'>viewing key</span>
                  </td>
                  <td>
                    <span className='text-gray-a0 ml-59px'>private key</span>
                  </td>
                  <td>
                    <AutoComplete
                      selected={{ value: '20000' }}
                      startNumber={20000}
                      endNumber={24000}
                      diffNumber={2000}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default WalletScreen
