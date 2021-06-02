import React from 'react'
import { Link } from 'react-router-dom'
import { NFTCompactCardProps, NFTCardProps } from '.'
import cn from 'classnames'

const NFTCard = ({
  imageSrc,
  title,
  likes,
  className,
  ...props
}: NFTCompactCardProps | NFTCardProps): JSX.Element => {
  const fullCardProps = 'author' in props && (props as NFTCardProps)

  const wrapperPaddingClass = fullCardProps ? 'pt-4 pb-27px' : 'pb-18px'
  const titleWeightClass = fullCardProps ? 'font-extrabold' : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-md',
        wrapperPaddingClass,
        className,
      )}
    >
      {/* Header */}
      {fullCardProps && (
        <div className='w-full px-18px flex justify-between pb-2'>
          <div className='flex items-center'>
            <img src={fullCardProps.avatarSrc} className='w-9' />
            <h4 className='pl-2 font-semibold'>@{fullCardProps.author}</h4>
          </div>
          <div className='flex items-center'>
            <Link to='#' className='text-blue-450'>
              follow
            </Link>
          </div>
        </div>
      )}
      {/* Image */}
      <div className={imageHeightClass}>
        <img src={imageSrc} className='object-cover h-full w-full' />
      </div>
      {/* Footer */}
      <div className='px-18px pt-2'>
        <div className='flex justify-between'>
          <h4 className={cn('text-gray-4a', titleWeightClass)}>{title}</h4>
          <span className='flex-center'>
            <i className='far fa-heart text-error'></i>
            <span className='pl-6px text-gray-4a text-h6'>{likes}</span>
          </span>
        </div>
        {fullCardProps && (
          <div className='flex justify-between pt-4'>
            <div className='flex-center'>
              <span className='text-h5 leading-none text-gray-71'>Listed</span>
              <span className='text-h4 leading-none text-gradient pl-1 font-semibold'>
                {fullCardProps.price} PSL
              </span>
            </div>

            <div className='text-h5 text-gray-a0'>
              {fullCardProps.onSale ? 'On sale' : 'Not for sale'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTCard
