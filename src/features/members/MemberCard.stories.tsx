import React from 'react'
import MemberCardComponent, { TMemberCard } from './MemberCard'
import { Story, Meta } from '@storybook/react'

import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'

const memberCard: TMemberCard = {
  avatar: mockAvatar,
  followers: 161,
  name: 'Sally Fadel',
  isVerified: false,
  followedByUser: true,
}

export default {
  title: 'MemberCard',
  component: MemberCardComponent,
} as Meta

const Template: Story<TMemberCard> = props => {
  return (
    <div className='w-244px h-142px'>
      <MemberCardComponent {...props} />
    </div>
  )
}

export const MemberCard = Template.bind({})
MemberCard.args = { ...memberCard }
