import React from 'react'
import { Story, Meta } from '@storybook/react'

import Vote, { TVoteProps } from './Vote'

export default {
  title: 'Icons/Vote',
  component: Vote,
} as Meta

const Template: Story<TVoteProps> = ({ ...args }) => {
  return <Vote {...args} />
}

export const VoteIcon = Template.bind({})
VoteIcon.args = {
  size: 30,
  className:
    'text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400',
}
