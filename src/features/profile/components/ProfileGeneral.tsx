import React from 'react'
import StarRate from './StarRate'

export type TProfileGeneral = {
  location: string
  language: string
  categories: string
  reputation: number
  buyerBans: number
  highestFeeRecieved: string
  totalSalesAmount: string
  totalItemsSold: number
  topCategoryPercentage: string
  bio: string
}

const ProfileGeneral = ({
  location,
  language,
  categories,
  reputation,
  buyerBans,
  highestFeeRecieved,
  totalSalesAmount,
  totalItemsSold,
  topCategoryPercentage,
  bio,
}: TProfileGeneral): JSX.Element => {
  return (
    <div className='flex-grow divide-y divide-gray-a6 w-full xl:w-3/5 xl:pr-78px leading-tight'>
      <div className='w-full pb-10 space-y-4'>
        <ProfileGeneralRow title='Location'>{location}</ProfileGeneralRow>
        <ProfileGeneralRow title='Language'>{language}</ProfileGeneralRow>
        <ProfileGeneralRow title='Categories'>{categories}</ProfileGeneralRow>
        <ProfileGeneralRow title='Buyer reputatio'>
          <StarRate rate={reputation} />
          <div className='pl-6px text-gray-a0 text-sm'>
            {reputation} reputation
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Buyer bans'>
          <div className='text-blue-400'>{buyerBans}</div>
        </ProfileGeneralRow>
      </div>
      <div className='w-full pb-10 pt-10 space-y-4'>
        <ProfileGeneralRow title='Highest fee recieved'>
          {highestFeeRecieved}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total sales amount'>
          {totalSalesAmount}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total items sold'>
          {totalItemsSold}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Top category persentage'>
          {topCategoryPercentage}
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

type TProfileGeneralRow = {
  title: string
  children: string | number | JSX.Element | JSX.Element[]
}

const ProfileGeneralRow = ({
  title,
  children,
}: TProfileGeneralRow): JSX.Element => {
  return (
    <div className='flex'>
      <div className='w-190px text-gray-71'>{title}</div>
      <div className='flex flex-grow font-medium text-gray-4a whitespace-pre'>
        {children}
      </div>
    </div>
  )
}

export default ProfileGeneral
