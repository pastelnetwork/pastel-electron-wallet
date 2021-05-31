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
    <div className='bg-gray-f8 pt-5 px-60px'>
      <div className='flex'>
        {card_items.map(card => (
          <div className='mr-18px'>
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
    </div>
  )
}

export default withRouter(WalletScreen)
