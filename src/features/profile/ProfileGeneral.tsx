import React from 'react'
import StarRate from './StarRate'

export type ProfileGeneralProps = {
  location: string
  postcode: string
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
  postcode,
  language,
  categories,
  reputation,
  buyerBans,
  highestFeeRecieved,
  totalSalesAmount,
  totalItemsSold,
  topCategoryPercentage,
  bio,
}: ProfileGeneralProps): JSX.Element => {
  return (
    <div className='flex-grow divide-y divide-grey-400 w-full xl:w-3/5 xl:pr-14'>
      {/* First Row Group of General */}
      <div className='w-full py-10 pt-4'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Location</div>
          <div className='flex flex-grow text-gray-4a'>
            <div>{location}</div>
            <div className='mx-auto -mt-1'>{postcode}</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Language</div>
          <div className='flex flex-grow text-gray-4a'>{language}</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Categories</div>
          <div className='flex flex-grow w-min text-gray-4a'>{categories}</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer reputation</div>
          <div className='flex flex-grow text-gray-4a flex-wrap'>
            <StarRate />
            <div className='pl-6px text-gray-500'>{reputation} reputation</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer bans</div>
          <div className='text-blue-400'>{buyerBans}</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Highest fee recieved
          </div>
          <div className='flex-grow text-gray-4a'>{highestFeeRecieved}</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total sales amount</div>
          <div className='flex-grow text-gray-4a'>{totalSalesAmount}</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total items sold</div>
          <div className='flex-grow text-gray-4a'>{totalItemsSold}</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Top category persentage
          </div>
          <div className='flex-grow text-gray-4a'>{topCategoryPercentage}</div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-2'>
          <div className='flex-grow text-gray-4a'>{bio}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral
