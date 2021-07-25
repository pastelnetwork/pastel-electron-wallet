import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  MessageIcon as Component,
  TMessageIconProps as Props,
} from './MessageIcon'

export default {
  title: 'Icons/Message Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} className='text-gray-33' />
}

export const MessageIcon = Template.bind({})
MessageIcon.args = {
  size: 18,
  hasNotification: false,
}
