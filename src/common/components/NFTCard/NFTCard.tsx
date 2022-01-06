import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

import Tooltip from 'common/components/Tooltip'
import { Button } from 'common/components/Buttons'
import CountdownTimer from 'common/components/CountdownTimer'

import { formatNumber } from 'common/utils/format'
import {
  HeartFilled,
  Clipboard,
  Diamond,
  DiamondInHexagon,
  CrownInHexagon,
  ManInHexagon,
  FirTreeInHexagon,
} from 'common/components/Icons'
import { Override } from '../../utils/types'
import styles from './NFTCard.module.css'
import { useIsNSFW } from 'features/NSFW/NSFW.service'

export enum NFTCardVariantSize {
  XL,
  L,
  M,
}

export type TNFTCompactCard = {
  imageSrc: string
  title: string
  likes: number
  className?: string
  hideFollow?: boolean
  hideLikeButton?: boolean
  percentage?: number
  variant?: NFTCardVariantSize
  followers?: number
  avatarClassName?: string
  authorWrapperClassName?: string
  buttonClassName?: string
  searchText?: string
  detailUrl?: string
  copies?: string
  diamond?: string
  bidPercentage?: string
  nsfw: { porn: number; hentai: number }
  hideGreenNF?: boolean
  hidePerpetualRoyalty?: boolean
  hideCertifiedRare?: boolean
  hideDirectFromArtist?: boolean
  copiesAvailable?: number
  leftTime?: number
  royalty?: number
}

export type TNFTCard = Override<
  TNFTCompactCard,
  {
    id: string
    author: string
    avatarSrc: string
    price: number
    currencyName: string
    isAuctionBid?: boolean
    isNotForSale?: boolean
    isFixedPrice?: boolean
  }
>

export default function NFTCard({
  imageSrc,
  title,
  className,
  percentage,
  variant,
  followers,
  authorWrapperClassName,
  buttonClassName = 'bg-transparent',
  avatarClassName,
  searchText,
  copies = '1 of 1,000',
  diamond = '10%',
  bidPercentage = '+100%',
  detailUrl = '#',
  nsfw,
  hideGreenNF,
  hidePerpetualRoyalty,
  hideCertifiedRare,
  hideDirectFromArtist,
  copiesAvailable,
  leftTime,
  royalty,
  ...props
}: TNFTCompactCard | TNFTCard): JSX.Element {
  const isNSFW = useIsNSFW(nsfw)

  const fullCardProps = 'author' in props && (props as TNFTCard)
  const vRoyalty: number = royalty || 0

  let imageClassName = 'w-9 h-9 mr-2'
  let imageHeightClass = 'h-[300px]'
  let headerClassName = 'px-4 pt-4'
  let normalSpacingClassName = 'mt-3'
  let footerClassName = 'pt-3 pr-3 pb-4 pl-4'
  let buttonFooterWrapper = 'pt-3'
  let infoClassName = 'px-4 pb-3'
  let contentSpacing = 'px-4'
  let diamondClassName = 'ml-[20px]'

  if (variant === NFTCardVariantSize.M) {
    imageClassName = 'w-6 h-6 mr-[6px]'
    imageHeightClass = 'h-[236px]'
    headerClassName = 'px-3 pt-3'
    normalSpacingClassName = 'mt-2'
    footerClassName = 'pt-14px px-3 pb-11px'
    buttonFooterWrapper = 'pt-11px'
    infoClassName = 'px-3 pb-2'
    contentSpacing = 'px-3'
    diamondClassName = 'ml-3'
  }

  const getTooltip = (title: string, description: string) => (
    <div className='px-2 py-6px text-left'>
      <div className='text-white text-mini-leading-16-medium'>{title}</div>
      <div className='mt-1 text-gray-a0 text-mini-leading-16'>
        {description}
      </div>
    </div>
  )

  const renderBuyItNowButton = () => (
    <div>
      <Button
        variant='transparent'
        className={cn(
          'h-32px text-sm font-medium border-2 border-blue-3f',
          buttonClassName,
        )}
      >
        Buy it Now
      </Button>
    </div>
  )

  const renderFixedPriceButton = (fullCardProps: TNFTCard) => (
    <>
      <div className='flex justify-between'>
        <div
          className={cn(
            'text-gray-4a',
            variant === NFTCardVariantSize.M
              ? 'text-h6-leading-20-medium'
              : 'text-h5-medium',
          )}
        >
          Fixed price
        </div>
        <div
          className={cn(
            'text-gray-2d',
            variant === NFTCardVariantSize.M
              ? 'text-h6-leading-20-black'
              : 'text-h5-heavy',
          )}
        >
          {formatNumber(fullCardProps.price)} {fullCardProps.currencyName}
        </div>
      </div>
      <div
        className={cn('flex justify-between items-center', buttonFooterWrapper)}
      >
        <div
          className={cn(
            'nft-text-gradient',
            variant === NFTCardVariantSize.M
              ? 'text-h6-leading-20-heavy'
              : 'text-h5-heavy',
          )}
        >
          {copiesAvailable} Copies Available
        </div>
        {renderBuyItNowButton()}
      </div>
    </>
  )

  const renderMakeAnOfferutton = () => (
    <div>
      <Button
        variant='transparent'
        className={cn(
          'h-32px text-sm font-medium border-2 border-blue-3f',
          buttonClassName,
        )}
      >
        Make an Offer
      </Button>
    </div>
  )

  const renderNotForSale = () => (
    <>
      <div className='flex justify-between'>
        <div
          className={cn(
            'text-gray-4a',
            variant === NFTCardVariantSize.M
              ? 'text-h6-leading-20-medium'
              : 'text-h5-medium',
          )}
        >
          Not for sale
        </div>
      </div>
      <div className={cn('flex justify-between', buttonFooterWrapper)}>
        <div>&nbsp;</div>
        {renderMakeAnOfferutton()}
      </div>
    </>
  )

  const renderPlaceBidButton = () => (
    <div>
      <Button
        variant='transparent'
        className={cn(
          'h-32px text-sm font-medium border-2 border-blue-3f',
          buttonClassName,
        )}
      >
        Place a Bid
      </Button>
    </div>
  )

  const renderCountdownTimerBlock = () => (
    <div
      className={cn(
        'nft-text-gradient',
        variant === NFTCardVariantSize.M
          ? 'text-h6-leading-20-heavy'
          : 'text-h5-heavy',
      )}
    >
      <CountdownTimer countDownDate={leftTime} /> left
    </div>
  )

  const renderAuctionBidPrice = (fullCardProps: TNFTCard) => (
    <div
      className={cn(
        'text-gray-2d',
        variant === NFTCardVariantSize.M
          ? 'text-h6-leading-20-black'
          : 'text-h5-heavy',
      )}
    >
      {formatNumber(fullCardProps.price)} {fullCardProps.currencyName}
    </div>
  )

  const renderAuctionBid = (fullCardProps: TNFTCard) => (
    <>
      <div className='flex justify-between'>
        <div
          className={cn(
            'text-gray-4a',
            variant === NFTCardVariantSize.M
              ? 'text-h6-leading-20-medium'
              : 'text-h5-medium',
          )}
        >
          Last Auction Bid
        </div>
        <div className='flex items-center'>
          {renderAuctionBidPrice(fullCardProps)}
          {bidPercentage && (
            <div
              className={cn(
                'text-green-00',
                variant === NFTCardVariantSize.M
                  ? 'text-[6px] leading-[6px] font-bold'
                  : 'text-[8px] leading-[6px] font-bold',
              )}
            >
              {bidPercentage}
            </div>
          )}
        </div>
      </div>
      <div
        className={cn('flex justify-between items-center', buttonFooterWrapper)}
      >
        {renderCountdownTimerBlock()}
        {renderPlaceBidButton()}
      </div>
    </>
  )

  const renderCopiesTooltip = () => (
    <Tooltip
      type='top'
      content={getTooltip(
        'Copies',
        'This is the number of "limited edition digital prints" that exist for this NFT.  No additional copies can ever be created of this NFT, even by the creator (and if the creator uses a similar image for a new NFT, the new NFT will have a lower Rareness Score"',
      )}
      width={208}
      classnames='ml-8'
      marginLeft='1.25rem'
    >
      <div className='flex items-center'>
        <Clipboard
          size={variant === NFTCardVariantSize.M ? 12 : 14}
          className='cursor-pointer mr-1 text-gray-71'
        />
        <div
          className={cn(
            'text-gray-71',
            variant === NFTCardVariantSize.M ? 'text-h6-leading-20' : 'text-h5',
          )}
        >
          {copies}
        </div>
      </div>
    </Tooltip>
  )

  const renderRarenessScoreTooltip = () => (
    <Tooltip
      type='top'
      content={getTooltip(
        'Rareness Score',
        'This number measures how "rare" the NFT is relative to all the NFTS that were previously registered on Pastel. It is based on the pixel patterns of the underlying image, and can see through superficial modifications to an original image, such as cropping, color changes, noise, etc.',
      )}
      width={230}
    >
      <div className={cn('flex items-center', diamondClassName)}>
        <Diamond
          size={variant === NFTCardVariantSize.M ? 12 : 14}
          className='cursor-pointer mr-1 text-gray-71'
        />
        <div
          className={cn(
            'text-gray-71',
            variant === NFTCardVariantSize.M ? 'text-h6-leading-20' : 'text-h5',
          )}
        >
          {diamond}
        </div>
      </div>
    </Tooltip>
  )

  const renderTitleDetailUrlLink = () => (
    <div className={cn(contentSpacing, normalSpacingClassName)}>
      <Link to={detailUrl} className='cursor-pointer w-full'>
        <div
          className={cn(
            'text-gray-1a',
            variant === NFTCardVariantSize.M
              ? 'text-h5-heavy'
              : 'text-h4-heavy',
          )}
        >
          {searchText
            ? parse(
                title.replace(
                  new RegExp(searchText, 'gi'),
                  match => `<mark class='bg-blue-9b pt-1 pb-1'>${match}</mark>`,
                ),
              )
            : title}
        </div>
      </Link>
    </div>
  )

  const renderNFTDetailImage = () => (
    <div className={cn('relative overflow-hidden', imageHeightClass)}>
      <img
        src={imageSrc}
        className={cn(
          'object-cover h-full w-full cursor-pointer',
          imageHeightClass,
          isNSFW && 'filter blur-[10px]',
        )}
        alt='Detail'
      />
    </div>
  )

  const renderImageDetailUrlLink = () => (
    <div className={cn(normalSpacingClassName, percentage && 'mt-0')}>
      <Link to={detailUrl} className='cursor-pointer w-full'>
        {renderNFTDetailImage()}
      </Link>
    </div>
  )

  const renderTitleAndImage = (fullCardProps: TNFTCard) => (
    <div className='flex items-center justify-between'>
      <img
        src={fullCardProps.avatarSrc}
        className={cn('rounded-full', imageClassName, avatarClassName)}
        alt='Avatar'
      />
      <div
        className={cn(
          'text-gray-4a',
          variant === NFTCardVariantSize.M
            ? 'text-h6-leading-20'
            : 'h4_18_24_medium',
        )}
      >
        {parse(
          searchText
            ? `@${fullCardProps.author}`.replace(
                new RegExp(searchText, 'gi'),
                match => `<mark class='bg-yellow-ff pt-1 pb-1'>${match}</mark>`,
              )
            : `@${fullCardProps.author}`,
        )}
      </div>
    </div>
  )

  return (
    <div
      className={cn('bg-white rounded-lg flex flex-col shadow-30px', className)}
    >
      {fullCardProps ? (
        <div
          className={cn(
            'flex items-center justify-between',
            headerClassName,
            authorWrapperClassName,
          )}
        >
          {renderTitleAndImage(fullCardProps)}
          {!fullCardProps.hideLikeButton ? (
            <div className='flex items-center'>
              <HeartFilled size={18} className='text-pink-46' />
              {!fullCardProps.hideFollow && variant !== NFTCardVariantSize.M ? (
                <div className='text-gray-4a pl-6px text-h6-leading-20'>
                  {followers}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
      {percentage ? (
        <div
          className={cn(
            'h-1.5 w-full bg-gray-f9 relative mb-px mt-0.5',
            normalSpacingClassName,
          )}
        >
          <div
            className={`absolute h-1.5 inline-block rounded-r-lg ${styles.bgPercentage}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : null}
      {renderImageDetailUrlLink()}
      {renderTitleDetailUrlLink()}
      <div
        className={cn(
          'flex items-center justify-between',
          normalSpacingClassName,
          infoClassName,
        )}
      >
        <div className='flex items-center'>
          {renderCopiesTooltip()}
          {renderRarenessScoreTooltip()}
        </div>
        <div className='flex items-center'>
          {!hideGreenNF ? (
            <Tooltip
              type='top'
              content={getTooltip(
                'GreenNFT',
                '2% of sale proceeds go to plant trees',
              )}
              width={140}
            >
              <FirTreeInHexagon
                size={variant === NFTCardVariantSize.M ? 20 : 24}
                className='text-green-45 cursor-pointer mr-[1px]'
              />
            </Tooltip>
          ) : null}
          {!hidePerpetualRoyalty ? (
            <Tooltip
              type='top'
              content={getTooltip(
                'Perpetual Royalty',
                `${vRoyalty}% of all resale proceeds are paid to the creator forever`,
              )}
              width={145}
            >
              <CrownInHexagon
                size={variant === NFTCardVariantSize.M ? 20 : 24}
                className='text-orange-ff cursor-pointer mr-[1px]'
              />
            </Tooltip>
          ) : null}
          {!hideCertifiedRare ? (
            <Tooltip
              type='top'
              content={getTooltip(
                'Certified Rare on Pastel',
                'NFT is sufficiently different from all previously registered NFTs on Pastel at the time of registration',
              )}
              width={185}
            >
              <DiamondInHexagon
                size={variant === NFTCardVariantSize.M ? 20 : 24}
                className='text-blue-79 cursor-pointer mr-[1px]'
                firstStopClassName='text-blue-79'
                secondStopClassName='text-blue-68'
              />
            </Tooltip>
          ) : null}
          {!hideDirectFromArtist ? (
            <Tooltip
              type='top'
              content={getTooltip(
                'Direct from Artist',
                'the NFT copy is being sold by the creator, rather than another buyer of the NFT who is reselling it',
              )}
              width={180}
            >
              <ManInHexagon
                size={variant === NFTCardVariantSize.M ? 20 : 24}
                className='text-green-16 cursor-pointer mr-[1px]'
                firstStopClassName='text-green-16'
                secondStopClassName='text-green-23'
              />
            </Tooltip>
          ) : null}
        </div>
      </div>
      {fullCardProps ? (
        <div
          className={cn(
            'bg-gray-ef rounded-b-lg bg-opacity-50',
            contentSpacing,
            footerClassName,
          )}
        >
          {fullCardProps.isAuctionBid ? renderAuctionBid(fullCardProps) : null}
          {fullCardProps.isNotForSale ? renderNotForSale() : null}
          {fullCardProps.isFixedPrice
            ? renderFixedPriceButton(fullCardProps)
            : null}
        </div>
      ) : null}
    </div>
  )
}
