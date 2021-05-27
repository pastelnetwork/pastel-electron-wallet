import React from 'react'
import smallImage from '../../common/assets/images/mock/small-image.png'

export default function PortfolioItem(): JSX.Element {
  return (
    <div className='h-12 rounded-lg flex items-center border border-gray-e7 p-1.5 mb-3 whitespace-nowrap'>
      <div
        className='w-9 h-9 flex-shrink-0 bg-center bg-cover rounded-lg'
        style={{ backgroundImage: `url(${smallImage})` }}
      />
      <div className='flex-grow flex items-center justify-between ml-1.5'>
        <div>
          <div className='text-gray-4a font-extrabold text-xs'>
            Comic Perspective
          </div>
          <div className='text-gray-a0 font-medium text-xs'>@zndrson</div>
        </div>
        <div className='self-end'>
          <div className='text-gray-a0 font-medium text-xs'>Bid</div>
          <div className='text-gray-33 font-extrabold text-xs'>5000 PSL</div>
        </div>
      </div>
    </div>
  )
}
