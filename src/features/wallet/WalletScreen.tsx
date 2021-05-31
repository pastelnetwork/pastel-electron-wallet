import React from 'react'
import { withRouter } from 'react-router'
import placeholderIcon from '../../common/assets/icons/ico-placeholder.svg'

const WalletScreen = () => {
  return (
    <div className='psl-bg-gray-f8 pt-5 psl-px-60px'>
      <div>
        <div className='flex psl-w-427px psl-h-124px psl-pt-18px psl-pl-26px psl-border-gray-e7 border rounded-lg'>
          <div>
            <img className='w-92px h-87px' src={placeholderIcon} />
          </div>
          <div className='psl-pt-36px psl-pr-35px'>
            <div className='text-2xl leading-6 psl-text-gray-4e'>
              PSL 210,000
            </div>
            <div className=''>TOTAL BALENCE</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(WalletScreen)
