import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { Override } from '../../../common/utils/types'
import styles from './NFTCard.module.css'

export type TNFTCompactCard = {
  imageSrc: string
  title: string
  likes: number
  liked: boolean
  className?: string
  hideFollow?: boolean
  hideLikeButton?: boolean
  percentage?: number
  variant?: string
  isLastBid?: boolean
}

export type TNFTCard = Override<
  TNFTCompactCard,
  {
    author: string
    avatarSrc: string
    price: number | string
    currencyName: string
    onSale: boolean
  }
>

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
  hideLikeButton,
  ...props
}: TNFTCompactCard | TNFTCard): JSX.Element => {
  const fullCardProps = 'author' in props && (props as TNFTCard)

  const wrapperPaddingClass = fullCardProps
    ? variant === 'portfolio'
      ? 'pt-4 pb-18px'
      : 'pt-4 pb-27px'
    : 'pb-18px'
  const titleClass = fullCardProps
    ? 'font-extrabold text-h4 leading-6'
    : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'
  const footerClass = fullCardProps
    ? variant === 'portfolio'
      ? 'pt-13px'
      : 'pt-2'
    : 'pt-2.5 pb-0.5'

  return (
    <div
      className={cn(
        'bg-white rounded-lg',
        variant === 'portfolio' ? 'shadow-30px' : 'shadow-md',
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
              <Link to='#' className='text-blue-3f'>
                follow
              </Link>
            </div>
          ) : null}
        </div>
      )}
      {/* Image */}
      {percentage ? (
        <div className='h-1.5 w-full bg-gray-f9 relative mb-px mt-0.5'>
          <div
            className={`absolute h-1.5 inline-block rounded-r-lg ${styles.bgPercentage}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      ) : null}
      <div
        className={`${
          variant === 'portfolio' ? 'h-220px' : imageHeightClass
        } relative`}
      >
        <img src={imageSrc} className='object-cover h-full w-full' />
        {fullCardProps && fullCardProps.onSale && variant === 'portfolio' ? (
          <div
            className={`absolute left-2.5 bottom-2.5 inline-block rounded-md overflow-hidden p-3px ${styles.statusBgColor}`}
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
              'whitespace-nowrap overflow-ellipsis pr-2 text-h5 font-extrabold m-w-full overflow-hidden':
                variant === 'portfolio',
            })}
          >
            {title}
          </div>
          {!hideLikeButton ? (
            <span className='flex-center'>
              {variant === 'portfolio' ? (
                <i
                  className={cn(
                    'fa-heart',
                    liked ? 'text-red-6f fas' : 'text-gray-400 far',
                  )}
                />
              ) : (
                <i
                  className={cn(
                    'far fa-heart',
                    liked ? 'text-error' : 'text-gray-400',
                  )}
                />
              )}
              <span className='pl-1.5 text-gray-4a text-h6'>{likes}</span>
            </span>
          ) : null}
        </div>
        {fullCardProps && (
          <div
            className={`flex justify-between ${
              variant === 'portfolio' ? 'pt-2.5' : 'pt-4'
            }`}
          >
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
