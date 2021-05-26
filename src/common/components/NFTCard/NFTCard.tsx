import React from 'react'

export interface NFTCardProps {
  author: string
  avatarSrc: string
  imageSrc: string
  title: string
  likes: number
  price: number | string
  onSale: boolean
  // listed ?
  // 5/10 ?
}

export const NFTCard: React.FC<NFTCardProps> = ({
  author,
  avatarSrc,
  imageSrc,
  title,
  likes,
  price,
  onSale,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-medium py-4'>
      {/* Header */}
      <div className='w-full px-4.5 flex justify-between pb-2'>
        <div className='flex items-center'>
          <img src={avatarSrc} className='w-9' />
          <h4 className='pl-2 font-semibold'>@{author}</h4>
        </div>
        <div className='flex items-center'>
          <p className='text-text-link'>Follow</p>
        </div>
      </div>
      {/* Image */}
      <div className='h-58 object-cover'>
        <img src={imageSrc} className='h-full' />
      </div>
      {/* Footer */}
      <div className='px-4.5 pt-2'>
        <div className='flex justify-between'>
          <h4 className='font-semibold text-text-gray700'>{title}</h4>
          <span>
            <i className='far fa-heart text-error'></i>
            <span className='pl-1 text-text-gray700'>{likes}</span>
          </span>
        </div>
        <div className='flex justify-between pt-4'>
          <div className='flex items-center'>
            <div className='text-h5 text-text-gray600'>Listed</div>
            <div className='text-h4 text-gradient pl-1 font-semibold'>
              {price} PSL
            </div>
          </div>
          <div className='text-h5 text-text-gray500'>5/10</div>
          <div className='text-h5 text-text-gray500'>
            {onSale ? 'On Sale' : 'Not for Sale'}
          </div>
        </div>
      </div>
    </div>
  )
}
