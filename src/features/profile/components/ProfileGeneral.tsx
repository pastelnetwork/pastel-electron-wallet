import React from 'react'
import StarRate from './StarRate'
import ProfileGeneralRow from './ProfileGeneralRow'

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

const ProfileGeneral = ({
  location,
  language,
  categories,
  reputation,
  highestFeeRecieved,
  totalSalesAmount,
  totalItemsSold,
  bio,
}: TProfileGeneral): JSX.Element => {
  return (
    <div className='flex-grow w-full 1200px:w-3/5 xl:pr-78px leading-tight'>
      <div className='w-full pb-10 space-y-4'>
        <ProfileGeneralRow title='Location'>{location}</ProfileGeneralRow>
        <ProfileGeneralRow title='Language'>{language}</ProfileGeneralRow>
        <ProfileGeneralRow title='Categories'>{categories}</ProfileGeneralRow>
        <ProfileGeneralRow title='Pastel Reputation Score'>
          <StarRate rate={reputation} />
          <div className='pl-1.5 text-gray-a0 text-sm'>{reputation}</div>
        </ProfileGeneralRow>
      </div>
      <div className='w-full pb-10 pt-10 space-y-4'>
        <ProfileGeneralRow title='Highest Sale Price Received'>
          {highestFeeRecieved}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total Combined Sales'>
          {totalSalesAmount}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total NFTs Sold'>
          {totalItemsSold}
        </ProfileGeneralRow>
      </div>
      {/* Third Row Group of General */}
      <div className='w-full pb-10 pt-6'>
        <div className='flex pt-4'>
          <div className='w-190px text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-4'>
          <div className='flex-grow leading-normal text-gray-4a'>{bio}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral
