import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import styles from './NFTCard.module.css'

export interface INFTCompactCardProps {
  imageSrc: string
  title: string
  likes: number
  liked: boolean
  className?: string
  hideFollow?: boolean
  percentage?: number
  variant?: string
  isLastBid?: boolean
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
  hideFollow,
  percentage,
  variant,
  isLastBid,
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
            {variant === 'portfolio' ? (
              <h4 className='pl-2 text-h5 font-extrabold leading-6 text-gray-1b'>
                @{fullCardProps.author}
              </h4>
            ) : (
              <h4 className='pl-2 font-semibold'>@{fullCardProps.author}</h4>
            )}
          </div>
          {!hideFollow ? (
            <div className='flex items-center'>
              <Link to='#' className='text-blue-450'>
                follow
              </Link>
            </div>
          ) : null}
        </div>
      )}
      {/* Image */}
      {percentage ? (
        <div className='h-6px w-full bg-gray-f9 relative mb-1px mt-2px'>
          <div
            className={`absolute h-6px inline-block rounded-r-8px ${styles.bgPercentage}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      ) : null}
      <div className={`${imageHeightClass} relative`}>
        <img src={imageSrc} className='object-cover h-full w-full' />
        {fullCardProps && fullCardProps.onSale && variant === 'portfolio' ? (
          <div
            className={`absolute left-10px bottom-10px inline-block rounded-md overflow-hidden p-3px ${styles.statusBgColor}`}
          >
            <div className='rounded-md overflow-hidden py-3px px-11px text-h5 font-extrabold text-gray-2d leading-6 bg-white'>
              On Sale
            </div>
          </div>
        ) : null}
      </div>
      {/* Footer */}
      <div className={cn('px-18px', footerClass)}>
        <div className='flex justify-between'>
          <div
            className={cn('text-gray-4a', titleClass, {
              'whitespace-nowrap overflow-ellipsis pr-8px text-h5 font-extrabold m-w-full overflow-hidden':
                variant === 'portfolio',
            })}
          >
            {title}
          </div>
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
              <span
                className={`${
                  variant === 'portfolio'
                    ? 'font-medium leading-6 text-h6 text-gray-77'
                    : 'leading-none text-h5 text-gray-71'
                }`}
              >
                Listed
              </span>
              {variant === 'portfolio' ? (
                <span className='text-h5 font-extrabold pl-1 leading-6 text-gray-1a'>
                  {fullCardProps.price} {fullCardProps.currencyName}
                </span>
              ) : (
                <span className='text-h4 leading-none text-gradient pl-1 font-semibold'>
                  {fullCardProps.price} {fullCardProps.currencyName}
                </span>
              )}
            </div>
            {isLastBid ? (
              <div className='font-medium leading-6 text-h6 text-gray-a0'>
                last bid
              </div>
            ) : null}
            {variant !== 'portfolio' ? (
              <div className='text-h5 text-gray-a0'>
                {fullCardProps.onSale ? 'On sale' : 'Not for sale'}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default NFTCard
