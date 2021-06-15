import React from 'react'
import { Story, Meta } from '@storybook/react'

import Avatar, { TAvatarProps } from './Avatar'
import avatar from '../../../common/assets/images/avatar-placeholder.png'

export default {
  title: 'Avatar',
  component: Avatar,
} as Meta

const Template: Story<TAvatarProps> = ({ iconType, ...args }: TAvatarProps) => {
  return (
    <div className='mt-10 ml-10'>
      <Avatar iconType={iconType} {...args} />
    </div>
  )
}

export const SimpleAvatar = Template.bind({})
SimpleAvatar.args = {
  iconType: 'comment',
  avatarSrc: avatar,
  position: 'top',
}
