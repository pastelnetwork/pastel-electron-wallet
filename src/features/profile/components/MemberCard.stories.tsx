import React from 'react'
import { Story, Meta } from '@storybook/react'

import MemberCard, { TMemberBoardProps } from './MemberCard'
import avatar from '../../../common/assets/images/avatar-placeholder.png'
import product from '../../../common/assets/images/nft-card-placeholder.png'

export default {
  title: 'MemberCard',
  component: MemberCard,
} as Meta

const Template: Story<TMemberBoardProps> = ({ ...args }: TMemberBoardProps) => {
  return (
    <div className='mt-10 ml-10'>
      <MemberCard {...args} />
    </div>
  )
}

export const MemberCardWithProduct = Template.bind({})
MemberCardWithProduct.args = {
  name: 'Glenn Greer',
  avatarSrc: avatar,
  time: '12h ago',
  description:
    'Love this so much! What tools do you use to create your 3d illustrations?',
  productURL: product,
}
