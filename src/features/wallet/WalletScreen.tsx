import React from 'react'
import { withRouter } from 'react-router'
import NumberFormat from 'react-number-format'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'

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
    <div className='psl-bg-gray-f8 psl-pt-5 psl-px-60px'>
      <div className='psl-flex'>
        {card_items.map(card => (
          <div className='psl-mr-18px'>
            <div
              className={`psl-flex psl-w-427px psl-h-124pxpsl-pl-26px psl-border-gray-e7 psl-border psl-rounded-lg ${
                card.style.background == 'white' ? 'psl-bg-white' : ''
              }`}
            >
              <div className='psl-pt-18px psl-pl-26px psl-pb-19px'>
                <img className='psl-w-92px psl-h-87px' src={card.icon} />
              </div>
              <div className='psl-pt-36px psl-pl-35px'>
                <div className='psl-text-2xl psl-leading-6 psl-text-gray-4e psl-pt-9'>
                  PSL{' '}
                  <NumberFormat
                    value={card.psl}
                    displayType={'text'}
                    thousandSeparator={true}
                  />
                </div>
                <div className='psl-text-gray-93 text-sm'>TOTAL BALENCE</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouter(WalletScreen)
