import React from 'react'
import { Link } from 'react-router-dom'
import { NFTCardProps } from '.'

const NFTCard = ({
  author,
  avatarSrc,
  imageSrc,
  title,
  likes,
  price,
  onSale,
}: NFTCardProps): JSX.Element => {
  return (
    <div className='bg-white rounded-lg shadow-md pt-4 pb-27px'>
      {/* Header */}
      <div className='w-full px-18px flex justify-between pb-2'>
        <div className='flex items-center'>
          <img src={avatarSrc} className='w-9' />
          <h4 className='pl-2 font-semibold'>@{author}</h4>
        </div>
        <div className='flex items-center'>
          <Link to='#' className='text-blue-450'>
            follow
          </Link>
        </div>
      </div>
      {/* Image */}
      <div className='h-230px object-cover'>
        <img src={imageSrc} className='h-full w-full' />
      </div>
      {/* Footer */}
      <div className='px-18px pt-2'>
        <div className='flex justify-between'>
          <h4 className='font-semibold text-gray-4a'>{title}</h4>
          <span className='flex-center'>
            <i className='far fa-heart text-error'></i>
            <span className='pl-6px text-gray-4a text-h6'>{likes}</span>
          </span>
        </div>
        <div className='flex justify-between pt-4'>
          <div className='flex-center'>
            <span className='text-h5 leading-none text-gray-71'>Listed</span>
            <span className='text-h4 leading-none text-gradient pl-1 font-semibold'>
              {price} PSL
            </span>
          </div>

          <div className='text-h5 text-gray-a0'>
            {onSale ? 'On sale' : 'Not for sale'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
