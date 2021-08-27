import React, { useState } from 'react'
import Select, { TOption } from 'common/components/Select/Select'
import {
  followersData,
  rankingData,
  soldData,
  mockMemberStrips,
} from './mockData'
import MemberStrip from '../members/MemberStrip'

export type TCreatorResultProps = {
  searchKey: string
}

const CreatorsResult = ({ searchKey }: TCreatorResultProps): JSX.Element => {
  const [ranking, setRanking] = useState<TOption | null>(rankingData[0])
  const [sold, setSold] = useState<TOption | null>(soldData[0])
  const [followers, setFollowers] = useState<TOption | null>(followersData[0])
  return (
    <div>
      <div className='bg-white flex py-[17px] px-[18px]'>
        <Select
          options={rankingData}
          className='bg-white w-[118px] mr-6'
          selected={ranking}
          onChange={setRanking}
          placeholder='Ranking'
        />
        <Select
          options={soldData}
          className='bg-white w-[118px] mr-6'
          onChange={setSold}
          selected={sold}
          placeholder='Sold'
        />
        <Select
          options={followersData}
          className='bg-white w-[118px]'
          onChange={setFollowers}
          selected={followers}
          placeholder='Followers'
        />
      </div>
      <div className='mt-5'>
        <div className='space-y-5'>
          {mockMemberStrips.map(item => (
            <MemberStrip {...item} key={item.id} searchText={searchKey} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatorsResult
