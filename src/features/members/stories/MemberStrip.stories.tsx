import React from 'react'

import mockAvatar from '../../../common/assets/images/avatar2-placeholder.png'
import image from '../../../common/assets/images/member-image-placeholder.png'
import MemberStripComponent, { MemberStripProps } from '../MemberStrip'

const mockMemberStrips: MemberStripProps = {
  memberCard: {
    avatar: mockAvatar,
    followers: 161,
    name: 'Sally Fadel',
  },
  heighestSold: '1.700,000k',
  totalSell: '1.500K',
  images: [image, image, image, image],
}
export default {
  title: 'Members/MemberStrip',
}

export const MemberStrip: React.FC = () => (
  <div className=' text-gray-1a bg-background-main h-full'>
    <div className='p-2'>
      <div className='bg-white p-5 rounded-lg'>
        <MemberStripComponent {...mockMemberStrips} />
      </div>
    </div>
  </div>
)
