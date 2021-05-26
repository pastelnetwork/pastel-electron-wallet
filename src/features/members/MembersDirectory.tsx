import React from 'react'
import MemberStrip, { MemberStripProps } from './MemberStrip'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import image from '../../common/assets/images/member-image-placeholder.png'

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

const MembersDirectory: React.FC = () => {
  return (
    <div className=' text-text-gray900 bg-background-main h-full overflow-y-scroll'>
      <div className='wrapper'>
        <div className='bg-white p-5 rounded-lg'>
          <div className='space-y-5'>
            {Array.from({ length: 5 }).map(() => (
              <MemberStrip {...mockMemberStrips} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembersDirectory
