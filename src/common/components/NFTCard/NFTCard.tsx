import React from 'react'
import cn from 'classnames'

import Tooltip from 'common/components/Tooltip'
import { Button } from 'common/components/Buttons'
import {
  HeartFilled,
  Clipboard,
  Diamond,
  DiamondInHexagon,
  CrownInHexagon,
  ManInHexagon,
  FirTreeInHexagon,
} from 'common/components/Icons'
import { Override } from '../../../common/utils/types'
import styles from './NFTCard.module.css'

export type TNFTCompactCard = {
  imageSrc: string
  title: string
  likes: number
  liked: boolean
  className?: string
  hideFollow?: boolean
  hideUnFollow?: boolean
  hideLikeButton?: boolean
  percentage?: number
  variant?: string
  isLastBid?: boolean
  followers?: number
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
  className,
  percentage,
  variant,
  isLastBid,
  followers,
  ...props
}: TNFTCompactCard | TNFTCard): JSX.Element => {
  const fullCardProps = 'author' in props && (props as TNFTCard)

  const wrapperPaddingClass = 'pt-3 md:pt-4'
  const titleClass = fullCardProps
    ? 'font-extrabold text-h5 md:text-h4 leading-6'
    : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'
  const footerClass = fullCardProps
    ? variant === 'portfolio'
      ? 'pt-13px'
      : 'pt-2 md:pt-3'
    : 'pt-2.5 pb-0.5'

  const getTooltip = (title: string, description: string) => (
    <div className='px-2 py-6px'>
      <span className='text-xs font-medium'>{title}</span>
      <p className='text-10px leading-3 text-gray-a6'>{description}</p>
    </div>
  )

  return (
    <div
      className={cn(
        'bg-white rounded-lg flex flex-col',
        variant === 'portfolio' ? 'shadow-30px' : 'shadow-md',
        wrapperPaddingClass,
        className,
      )}
    >
      {/* Header */}
      {fullCardProps && (
        <div className='w-full px-3 pb-2 md:pb-3 md:px-3 flex justify-between'>
          <div className='flex items-center overflow-hidden'>
            <img src={fullCardProps.avatarSrc} className='w-9' />
            {variant === 'portfolio' ? (
              <h4 className='pl-2 text-h5 font-extrabold leading-6 text-gray-1b truncate'>
                @{fullCardProps.author}
              </h4>
            ) : (
              <h4 className='px-2 font-medium text-gray-4a text-sm md:text-h4 truncate'>
                @{fullCardProps.author}
              </h4>
            )}
          </div>
          <div className='flex items-center'>
            {followers ? (
              <>
                <HeartFilled size={14} className='text-pink-46' />
                <span className='text-sm text-gray-4a ml-2 hidden md:block'>
                  {followers}
                </span>
              </>
            ) : (
              <HeartFilled size={14} className='text-pink-46' />
            )}
          </div>
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
              On sale
            </div>
          </div>
        ) : null}
      </div>
      {/* Footer */}
      <div className={cn('px-3', footerClass)}>
        <div className='flex justify-between'>
          <div
            className={cn('text-gray-4a truncate', titleClass, {
              'whitespace-nowrap overflow-ellipsis pr-2 text-h5 m-w-full overflow-hidden':
                variant === 'portfolio',
            })}
          >
            {title}
          </div>
        </div>
        <div className='flex text-gray-71 text-sm lg:text-base justify-between py-2 md:py-3 flex-wrap'>
          <div className='flex items-center'>
            <Tooltip
              type='top'
              content={getTooltip(
                'Copies',
                'This is the number of "limited edition digital prints" that exist for this NFT.  No additional copies can ever be created of this NFT, even by the creator (and if the creator uses a similar image for a new NFT, the new NFT will have a lower Rareness Score',
              )}
              width={210}
            >
              <Clipboard size={12} className='cursor-pointer' />
            </Tooltip>
            <span className='text-sm ml-[5px] mr-[9px] lg:mr-2.5'>
              1 of 1,000
            </span>
            <Tooltip
              type='top'
              content={getTooltip(
                'Rareness Score',
                'This number measures how "rare" the NFT is relative to all the NFTS that were previously registered on Pastel. It is based on the pixel patterns of the underlying image, and can see through superficial modifications to an original image, such as cropping, color changes, noise, etc.',
              )}
              width={230}
            >
              <Diamond size={16} className='cursor-pointer' />
            </Tooltip>
            10%
          </div>
          <div className='flex items-center'>
            <Tooltip
              type='top'
              content={getTooltip(
                'GreenNF',
                '2% of sale proceeds go to plant trees',
              )}
              width={110}
            >
              <FirTreeInHexagon
                size={20}
                className='text-green-45 cursor-pointer'
              />
            </Tooltip>
            <Tooltip
              type='top'
              content={getTooltip(
                'Perpetual Royalty',
                'N% of all resale proceeds are paid to the creator forever',
              )}
              width={120}
            >
              <CrownInHexagon
                size={20}
                className='text-orange-ff cursor-pointer'
              />
            </Tooltip>
            <Tooltip
              type='top'
              content={getTooltip(
                'Certified Rare on Pastel',
                'NFT is sufficiently different from all previously registered NFTs on Pastel at the time of registration',
              )}
              width={150}
            >
              <DiamondInHexagon
                size={20}
                className='text-blue-79 cursor-pointer'
                firstStopClassName='text-blue-79'
                secondStopClassName='text-blue-68'
              />
            </Tooltip>
            <Tooltip
              type='top'
              content={getTooltip(
                'Direct from Artist',
                'the NFT copy is being sold by the creator, rather than another buyer of the NFT who is reselling it',
              )}
              width={140}
            >
              <ManInHexagon
                size={20}
                className='text-green-16 cursor-pointer'
                firstStopClassName='text-green-16'
                secondStopClassName='text-green-23'
              />
            </Tooltip>
          </div>
        </div>
      </div>
      {fullCardProps && (
        <div
          className={`px-3 pb-3 md:pb-4 bg-gray-ef bg-opacity-50 flex-grow ${
            variant === 'portfolio' ? 'pt-2.5' : 'pt-2 md:pt-3'
          }`}
        >
          <div className='flex items-center justify-between'>
            <span
              className={`text-sm font-medium ${
                variant === 'portfolio'
                  ? 'leading-6 text-sm text-gray-77'
                  : 'leading-none text-sm text-gray-71'
              }`}
            >
              {!fullCardProps.onSale
                ? 'Not for sale'
                : isLastBid
                ? 'Last Auction Bid'
                : 'Fixed Price'}
            </span>

            <div className='flex  text-sm font-black text-gray-2d'>
              {fullCardProps.onSale ? '12,000 PSL' : ''}
              {isLastBid && fullCardProps.onSale && (
                <span className='font-bold text-8px green-gradient ml-0.5'>
                  +100%
                </span>
              )}
            </div>
          </div>
          {variant !== 'portfolio' && (
            <div className='flex items-center text-xs font-extrabold justify-between pt-2 md:pt-3'>
              <div className='nft-text-gradient'>
                {!fullCardProps.onSale
                  ? ''
                  : isLastBid
                  ? '3h 30m 12s left'
                  : '15 Copies Available'}
              </div>
              <Button
                variant='transparent'
                className='h-32px text-sm font-medium border-2 border-blue-3f'
              >
                {!fullCardProps.onSale
                  ? 'Make an Offer'
                  : isLastBid
                  ? 'Place a Bid'
                  : 'Buy it Now'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NFTCard
