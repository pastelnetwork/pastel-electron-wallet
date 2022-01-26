import React, { useState } from 'react'

import Select, { TOption } from 'common/components/Select/Select'
import { mockMemberStrips } from './mockData'
import MemberStrip from '../members/MemberStrip'
import { translate } from 'features/app/translations'

export type TCreatorResultProps = {
  searchKey: string
}

export default function CreatorsResult({
  searchKey,
}: TCreatorResultProps): JSX.Element {
  const rankingData = [{ value: 'Ranking', label: translate('ranking') }]
  const followersData = [{ value: 'Followers', label: translate('followers') }]
  const soldData = [{ value: 'Sold', label: translate('sold') }]

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
          placeholder={translate('ranking')}
        />
        <Select
          options={soldData}
          className='bg-white w-[118px] mr-6'
          onChange={setSold}
          selected={sold}
          placeholder={translate('sold')}
        />
        <Select
          options={followersData}
          className='bg-white w-[118px]'
          onChange={setFollowers}
          selected={followers}
          placeholder={translate('followers')}
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
