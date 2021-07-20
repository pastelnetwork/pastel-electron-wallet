import React from 'react'
import { useHistory } from 'react-router-dom'

import * as ROUTES from 'common/utils/constants/routes'
import MemberCard, { TMemberCard } from './MemberCard'

export type TMemberStripProps = {
  id: string
  memberCard: TMemberCard
  heighestSold: number | string
  totalSold: number | string
  images: string[]
  currencyName: string
  searchText?: string
}

const MemberStrip = ({
  id,
  memberCard,
  heighestSold,
  images,
  totalSold,
  currencyName,
  searchText,
}: TMemberStripProps): JSX.Element => {
  const history = useHistory()
  const toMemberProfile = () => {
    history.replace(ROUTES.MEMBERS_PROFILE)
  }
  return (
    <div className='flex space-x-30px'>
      {/* Member Card */}
      <div
        className='min-w-[244px] h-142px cursor-pointer'
        onClick={toMemberProfile}
      >
        <MemberCard {...memberCard} searchText={searchText} />
      </div>
      <div className='border-b border-navigation-background overflow-hidden'>
        <div className='flex space-x-4 h-full'>
          {/* Sale data */}
          <div className='flex flex-col justify-center h-full min-w-120px pr-21px'>
            <h6 className='text-gray-77 pb-1 text-12px'>Highest sold</h6>
            <div className='w-max text-12px font-semibold border py-1 px-2 rounded border-success-pressed text-success-pressed'>
              {heighestSold} {currencyName}
            </div>
            <div className='text-gray-1a font-semibold pt-3 text-12px whitespace-nowrap overflow-x-hidden'>
              Total sold{' '}
              <div className='font-display'>
                <span className='text-gradient'>{totalSold}</span>
                <span className='text-gradient'> {currencyName}</span>
              </div>
            </div>
          </div>
          {/* Images */}
          <div className='flex space-x-5 h-full overflow-x-auto overflow-y-hidden scrollbar-bg-white'>
            {images.map((imgSrc, i) => (
              <div
                className='flex flex-col justify-center h-full '
                key={`${id}${i}`}
              >
                <div className='w-28 h-101px'>
                  <img src={imgSrc} className='object-cover rounded-xl' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberStrip
