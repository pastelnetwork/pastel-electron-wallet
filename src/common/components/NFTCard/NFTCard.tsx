import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

export interface INFTCompactCardProps {
  imageSrc: string
  title: string
  likes: number
  liked: boolean
  className?: string
}

export interface INFTCardProps extends INFTCompactCardProps {
  author: string
  avatarSrc: string
  price: number | string
  currencyName: string
  onSale: boolean
}

const NFTCard = ({
  imageSrc,
  title,
  likes,
  className,
  liked,
  ...props
}: INFTCompactCardProps | INFTCardProps): JSX.Element => {
  const fullCardProps = 'author' in props && (props as INFTCardProps)

  const wrapperPaddingClass = fullCardProps ? 'pt-4 pb-27px' : 'pb-18px'
  const titleClass = fullCardProps
    ? 'font-extrabold text-h4 leading-6'
    : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'
  const footerClass = fullCardProps ? 'pt-2' : 'pt-2.5 pb-2px'

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
            <Link to='#' className='text-blue-3f'>
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
      <div className={cn('px-18px', footerClass)}>
        <div className='flex justify-between'>
          <div className={cn('text-gray-4a', titleClass)}>{title}</div>
          <span className='flex-center'>
            <i
              className={cn(
                'far fa-heart',
                liked ? 'text-error' : 'text-gray-400',
              )}
            />
            <span className='pl-6px text-gray-4a text-h6'>{likes}</span>
          </span>
        </div>
        {fullCardProps && (
          <div className='flex justify-between pt-4'>
            <div className='flex-center'>
              <span className='text-h5 leading-none text-gray-71'>Listed</span>
              <span className='text-h4 leading-none text-gradient pl-1 font-semibold'>
                {fullCardProps.price} {fullCardProps.currencyName}
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
