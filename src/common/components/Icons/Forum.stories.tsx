import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Forum as Icon, TForumProps as Props } from './Forum'

export default {
  title: 'Icons/Forum Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const Forum = Template.bind({})
Forum.args = {
  size: 14,
}
