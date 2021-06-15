import React from 'react'
import { Story, Meta } from '@storybook/react'

import Chat, { TChatProps } from './Chat'

export default {
  title: 'Icons/Chat',
  component: Chat,
} as Meta

const Template: Story<TChatProps> = ({ ...args }) => {
  return <Chat {...args} />
}

export const ChatIcon = Template.bind({})
ChatIcon.args = {
  size: 30,
  className:
    'text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400',
}
