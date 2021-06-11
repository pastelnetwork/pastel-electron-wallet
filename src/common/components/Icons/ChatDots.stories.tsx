import React from 'react'
import { Story, Meta } from '@storybook/react'

import { ChatDots as Icon, TChatDotsProps as Props } from './ChatDots'

export default {
  title: 'Icons/Chat Dots',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const ChatDots = Template.bind({})
ChatDots.args = {
  size: 30,
  className: 'text-black',
}
