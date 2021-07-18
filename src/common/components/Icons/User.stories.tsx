import React from 'react'
import { Story, Meta } from '@storybook/react'

import { User as Component, TUserProps as Props } from './User'

export default {
  title: 'Icons/User Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <User {...args} className='text-black' />
}

export const User = Template.bind({})
User.args = {
  width: 14,
  height: 14,
}
