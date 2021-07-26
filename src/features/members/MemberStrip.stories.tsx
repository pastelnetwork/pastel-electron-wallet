import React from 'react'

import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import mockMemberImage from '../../common/assets/images/member-image-placeholder.png'
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
  highestSold: 1700000,
  totalSold: 1500,
  images: [mockMemberImage, mockMemberImage, mockMemberImage, mockMemberImage],
}
export default {
  title: 'MemberStrip',
}

export const MemberStrip = (): JSX.Element => (
  <div className=' text-gray-1a bg-background-main h-full'>
    <div className='p-2'>
      <div className='bg-white p-5 rounded-lg'>
        <MemberStripComponent {...mockMemberStrips} />
      </div>
    </div>
  </div>
)
