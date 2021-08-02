import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

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
import { useIsNSFW } from 'features/NSFW/NSFW.service'

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
  authorClassName?: string
  exauthorClassName?: string
  avatarClassName?: string
  searchText?: string
  detailUrl?: string
  copies?: string
  diamond?: string
  bidPercentage?: string
  nsfw: { porn: number; hentai: number }
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
  authorClassName = 'text-sm font-normal text-gray-4a ',
  exauthorClassName = 'font-medium text-gray-4a text-sm md:text-h4',
  avatarClassName = 'w-9',
  searchText,
  copies = '1 of 1,000',
  diamond = '10%',
  bidPercentage = '+100%',
  detailUrl = '#',
  nsfw,
  ...props
}: TNFTCompactCard | TNFTCard): JSX.Element => {
  const fullCardProps = 'author' in props && (props as TNFTCard)
  const isNFTPortfolio = variant === 'nft-portfolio'
  const isPortfolio = variant === 'portfolio'
  const wrapperPaddingClass = 'pt-3 md:pt-4'
  const titleClass = fullCardProps
    ? 'font-extrabold text-h5 md:text-base leading-6 text-gray-1a'
    : 'font-medium'
  const imageHeightClass = fullCardProps ? 'h-230px' : 'h-220px'
  const footerClass = fullCardProps
    ? isPortfolio
      ? 'pt-13px'
      : 'pt-2 md:pt-3'
    : 'pt-2.5 pb-0.5'
  const isNSFW = useIsNSFW(nsfw)

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
        isPortfolio ? 'shadow-30px' : 'shadow-md',
        wrapperPaddingClass,
        className,
      )}
    >
      {/* Header */}
      {fullCardProps && (
        <div className='w-full px-14px pb-2 md:pb-3 md:px-3 flex justify-between'>
          <div className='flex items-center overflow-hidden'>
            <img src={fullCardProps.avatarSrc} className={avatarClassName} />
            {variant === 'portfolio' ? (
              <h4 className={cn('pl-2 leading-6 truncate', authorClassName)}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: searchText
                      ? `@${fullCardProps.author}`.replace(
                          new RegExp(searchText, 'gi'),
                          match =>
                            `<mark class='bg-yellow-ff pt-1 pb-1'>${match}</mark>`,
                        )
                      : `@${fullCardProps.author}`,
                  }}
                />
              </h4>
            ) : (
              <h4 className={cn('px-2 truncate', exauthorClassName)}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: searchText
                      ? `@${fullCardProps.author}`.replace(
                          new RegExp(searchText, 'gi'),
                          match =>
                            `<mark class='bg-yellow-ff pt-1 pb-1'>${match}</mark>`,
                        )
                      : `@${fullCardProps.author}`,
                  }}
                />
              </h4>
            )}
          </div>
          <div className='flex items-center'>
            {fullCardProps.hideLikeButton ? (
              <>
                {followers ? (
                  <>
                    <HeartFilled size={14} className='text-pink-46' />
                    {!fullCardProps.hideFollow ? (
                      <span className='text-sm text-gray-4a ml-2 hidden md:block'>
                        {followers}
                      </span>
                    ) : null}
                  </>
                ) : (
                  <HeartFilled size={14} className='text-pink-46' />
                )}
              </>
            ) : null}
          </div>
        </div>
      )}
      {/* Image */}
      {percentage ? (
        <div className='h-1.5 w-full bg-gray-f9 relative mb-px mt-0.5'>
          <div
            className={`absolute h-1.5 inline-block rounded-r-lg ${styles.bgPercentage}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : null}
      <Link to={detailUrl} className='cursor-pointer w-full'>
        <div
          className={cn('relative overflow-hidden', {
            'h-[220px]': isPortfolio,
            [imageHeightClass]: !isPortfolio,
          })}
        >
          <img
            src={imageSrc}
            className={cn(
              'object-cover h-full w-full cursor-pointer',
              isNSFW && 'filter blur-[10px]',
            )}
          />
          {fullCardProps && fullCardProps.onSale && isPortfolio ? (
            <div
              className={`absolute left-2.5 bottom-2.5 inline-block rounded-md overflow-hidden p-3px ${styles.statusBgColor}`}
            >
              <div className='rounded-md overflow-hidden py-3px px-11px text-h5 font-extrabold text-gray-2d leading-6 bg-white'>
                On sale
              </div>
            </div>
          ) : null}
        </div>
      </Link>
      {/* Footer */}
      <div
        className={cn(
          !isNFTPortfolio && 'px-3 md:px-14px',
          footerClass,
          isNFTPortfolio && 'px-3',
        )}
      >
        <div className='flex justify-between'>
          <Link to={detailUrl} className='cursor-pointer w-full'>
            <div
              className={cn(
                'text-gray-1a truncate',
                titleClass,
                isPortfolio &&
                  'whitespace-nowrap overflow-ellipsis pr-2 text-h5 m-w-full overflow-hidden',
                isNFTPortfolio && 'text-base text-gray-1a',
              )}
            >
              {title}
            </div>
          </Link>
        </div>
        <div className='flex text-gray-71 text-sm lg:text-base justify-between py-2 md:py-3 flex-wrap'>
          <div className='flex items-center text-sm'>
            <Tooltip
              type='top'
              content={getTooltip(
                'Copies',
                'This is the number of "limited edition digital prints" that exist for this NFT.  No additional copies can ever be created of this NFT, even by the creator (and if the creator uses a similar image for a new NFT, the new NFT will have a lower Rareness Score',
              )}
              width={210}
            >
              <Clipboard
                size={isNFTPortfolio ? 9 : 8}
                className='cursor-pointer'
              />
            </Tooltip>
            <span
              className={cn(
                isNFTPortfolio
                  ? 'ml-5px mr-9px'
                  : 'text-sm ml-[5px] mr-[9px] lg:mr-2.5',
              )}
            >
              {copies}
            </span>
            <Tooltip
              type='top'
              content={getTooltip(
                'Rareness Score',
                'This number measures how "rare" the NFT is relative to all the NFTS that were previously registered on Pastel. It is based on the pixel patterns of the underlying image, and can see through superficial modifications to an original image, such as cropping, color changes, noise, etc.',
              )}
              width={230}
            >
              <Diamond
                size={isNFTPortfolio ? 13 : 11}
                className='cursor-pointer'
              />
            </Tooltip>
            {diamond}
          </div>
          <div className='flex items-center text-sm'>
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
          className={cn(
            'pb-3 md:pb-4 bg-gray-ef bg-opacity-50 flex-grow',
            isPortfolio && 'pt-2.5 px-3 md:px-14px',
            !isNFTPortfolio && !isPortfolio && 'pt-2 md:pt-3 px-3 md:px-14px',
            isNFTPortfolio && 'px-3 pt-14px',
          )}
        >
          <div className='flex items-center justify-between'>
            <span
              className={cn(
                isPortfolio &&
                  'leading-6 text-h6 text-gray-4a text-sm font-medium',
                isNFTPortfolio && 'text-sm font-medium text-gray-4a',
                !isPortfolio &&
                  !isNFTPortfolio &&
                  'text-sm md:text-base font-medium leading-none text-h5 text-gray-71',
              )}
            >
              {!fullCardProps.onSale
                ? 'Not for sale'
                : isLastBid
                ? 'Last Auction Bid'
                : 'Fixed Price'}
            </span>
            {!isPortfolio ? (
              <div
                className={cn(
                  'flex text-gray-2d',
                  isNFTPortfolio && 'text-sm font-black items-start',
                  !isNFTPortfolio &&
                    'text-sm md:text-base lg:text-h5 font-extrabold',
                )}
              >
                {fullCardProps.onSale ? '12,000 PSL' : ''}
                {isLastBid && fullCardProps.onSale && (
                  <span
                    className={cn(
                      'font-bold green-gradient',
                      isNFTPortfolio && 'pl-2px text-6px',
                      !isNFTPortfolio && 'text-8px',
                    )}
                  >
                    {bidPercentage}
                  </span>
                )}
              </div>
            ) : null}
          </div>
          {!isPortfolio && (
            <div
              className={cn(
                'flex items-center justify-between font-extrabold',
                isNFTPortfolio && 'text-xs leading-18px pt-9px',
                !isNFTPortfolio && 'text-xs md:text-sm pt-2 md:pt-3 ',
              )}
            >
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
