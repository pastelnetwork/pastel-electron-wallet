import React from 'react'
import { withRouter } from 'react-router'
import NumberFormat from 'react-number-format'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'
import elminationIcon from '../../common/assets/icons/ico-elmination.svg'
import clockIcon from '../../common/assets/icons/ico-clock.svg'
import Tooltip from '../../common/components/Tooltip/Tooltip'
import Toggle from '../../common/components/Toggle'
import { ThemeProvider } from 'styled-components/macro'
import { theme } from '../../common/theme'

const WalletScreen = () => {
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
        <div className='mt-3.5 flex items-center'>
          <div className='flex items-center'>
            <Toggle />
            <img className='ml-2' src={elminationIcon} />
          </div>
          <div>
            <img src={clockIcon} />
            <span>Total:</span>
            <NumberFormat
              value='22000'
              displayType={'text'}
              thousandSeparator={true}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default withRouter(WalletScreen)
