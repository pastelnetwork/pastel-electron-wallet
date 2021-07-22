import React from 'react'
import { Story, Meta } from '@storybook/react'

import { User as Icon, TUserProps as Props } from './User'

export default {
  title: 'Icons/User Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const User = Template.bind({})
User.args = {
  size: 14,
}
