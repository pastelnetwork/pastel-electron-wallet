import React from 'react'

import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import { mockDataImagesList } from './data'
import MemberStripComponent, { TMemberStripProps } from './MemberStrip'

const mockMemberStrips: TMemberStripProps = {
  id: 'mock-strip',
  memberCard: {
    avatar: mockAvatar,
    followers: 161,
    name: 'Sally Fadel',
    isVerified: true,
    followedByUser: true,
  },
  highestSold: 1700000000,
  totalSold: 1500000,
  images: mockDataImagesList.slice(0, 4),
}
export default {
  title: 'MemberStrip',
}

export function MemberStrip(): JSX.Element {
  const renderMemberStripContent = () => (
    <div className='bg-white p-5 rounded-lg'>
      <MemberStripComponent {...mockMemberStrips} />
    </div>
  )

  return (
    <div className=' text-gray-1a bg-background-main h-full'>
      <div className='p-2'>{renderMemberStripContent()}</div>
    </div>
  )
}
