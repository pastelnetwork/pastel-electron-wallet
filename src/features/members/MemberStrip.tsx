import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import * as ROUTES from 'common/utils/constants/routes'
import MemberCard, { TMemberCard } from './MemberCard'
import { useCurrencyName } from '../../common/hooks/appInfo'
import { formatPrice } from '../../common/utils/format'
import { translate } from 'features/app/translations'

export type TImageProps = {
  url: string
  title: string
}

export type TMemberStripProps = {
  id: string
  memberCard: TMemberCard
  highestSold: number
  totalSold: number
  images: TImageProps[]
  searchText?: string
}

function MemberStrip({
  id,
  memberCard,
  highestSold,
  images,
  totalSold,
  searchText,
}: TMemberStripProps): JSX.Element {
  const history = useHistory()

  const toMemberProfile = useCallback(() => {
    history.replace(ROUTES.MEMBERS_PROFILE)
  }, [])

  const currency = useCurrencyName()

  const renderTotalSold = () => (
    <div className='font-display'>
      <span className='text-gradient'>{totalSold}</span>
      <span className='text-gradient'>
        {' '}
        {formatPrice(highestSold, currency)}
      </span>
    </div>
  )

  const renderSaleData = () => (
    <div className='flex flex-col justify-center h-full min-w-120px pr-21px'>
      <h6 className='text-gray-77 pb-1 text-12px'>
        {translate('highestSold')}
      </h6>
      <div className='w-max text-12px font-semibold border pt-2 pb-1.5 px-2 rounded border-success-pressed text-green-45'>
        {formatPrice(highestSold, currency)}
      </div>
      <div className='text-gray-1a font-semibold pt-3 text-12px whitespace-nowrap overflow-x-hidden'>
        <span className='text-tab-active font-extrabold'>
          {translate('totalSold')}
        </span>
        {renderTotalSold()}
      </div>
    </div>
  )

  const renderImages = () => (
    <div className='flex space-x-5 h-full overflow-x-auto overflow-y-hidden scrollbar-bg-white'>
      {images.map(imgSrc => (
        <div
          className='flex flex-col justify-center h-full '
          key={`${id}${imgSrc.url}`}
        >
          <div className='w-28 h-101px'>
            <img
              src={imgSrc.url}
              className='object-cover rounded-xl'
              alt='Member'
            />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='flex space-x-30px'>
      {/* Member Card */}
      <div
        className='min-w-[244px] h-142px cursor-pointer'
        onClick={toMemberProfile}
        role='button'
        aria-hidden
        tabIndex={0}
      >
        <MemberCard {...memberCard} searchText={searchText} />
      </div>
      <div className='border-b border-navigation-background overflow-hidden'>
        <div className='flex space-x-4 h-full'>
          {/* Sale data */}
          {renderSaleData()}
          {/* Images */}
          {renderImages()}
        </div>
      </div>
    </div>
  )
}

export default MemberStrip
