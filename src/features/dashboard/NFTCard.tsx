import React from 'react'
import nftImage from '../../common/assets/images/mock/nft/1.png'
import Heart from '../../common/components/Icons/Heart'

export default function NFTCard(): JSX.Element {
  return (
    <div className='bg-white rounded w-250px shadow-30px'>
      <div
        className='w-full bg-center bg-cover h-220px'
        style={{
          backgroundImage: `url(${nftImage})`,
        }}
      />
      <div className='pt-3 pb-5 px-4'>
        <div className='flex items-center justify-between text-gray-4a'>
          <div className='font-bold font-medium'>Cosmic Perspective</div>
          <div className='flex-center text-sm'>
            <Heart size={18} className='mr-1.5' />
            23
          </div>
        </div>
      </div>
    </div>
  )
}
