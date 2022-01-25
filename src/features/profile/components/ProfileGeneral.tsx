import React from 'react'

import StarRate from './StarRate'
import ProfileGeneralRow from './ProfileGeneralRow'
import { translate } from 'features/app/translations'

export type TProfileGeneral = {
  location: string
  language: string
  categories: string
  reputation: number
  buyerBans: number
  highestFeeRecieved: string
  totalSalesAmount: string
  totalItemsSold: string
  topCategoryPercentage: string
  bio: string
}

function ProfileGeneral({
  location,
  language,
  categories,
  reputation,
  highestFeeRecieved,
  totalSalesAmount,
  totalItemsSold,
  bio,
}: TProfileGeneral): JSX.Element {
  const renderBioBlock = () => (
    <div className='w-full pb-10 pt-6'>
      <div className='flex pt-4'>
        <div className='w-190px text-gray-71'>{translate('bio')}</div>
      </div>
      <div className='flex pt-4'>
        <div className='flex-grow leading-normal text-gray-4a'>{bio}</div>
      </div>
    </div>
  )

  const renderTopContent = () => (
    <div className='w-full pb-10 space-y-4'>
      <ProfileGeneralRow title={translate('location')}>
        {location}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('language')}>
        {language}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('categories')}>
        {categories}
      </ProfileGeneralRow>
      <ProfileGeneralRow title={translate('pastelReputationScore')}>
        <StarRate rate={reputation} />
        <div className='pl-1.5 text-gray-a0 text-sm'>{reputation}</div>
      </ProfileGeneralRow>
    </div>
  )

  return (
    <div className='flex-grow w-full 1200px:w-3/5 xl:pr-78px leading-tight'>
      {renderTopContent()}
      <div className='w-full pb-10 pt-10 space-y-4'>
        <ProfileGeneralRow title={translate('highestSalePriceReceived')}>
          {highestFeeRecieved}
        </ProfileGeneralRow>
        <ProfileGeneralRow title={translate('totalCombinedSales')}>
          {totalSalesAmount}
        </ProfileGeneralRow>
        <ProfileGeneralRow title={translate('totalNFTsSold')}>
          {totalItemsSold}
        </ProfileGeneralRow>
      </div>
      {/* Third Row Group of General */}
      {renderBioBlock()}
    </div>
  )
}

export default ProfileGeneral
