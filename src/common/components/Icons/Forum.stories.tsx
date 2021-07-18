import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Forum as Component, TForumProps as Props } from './Forum'

export default {
  title: 'Icons/Forum Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Forum {...args} className='text-black' />
}

export const Forum = Template.bind({})
Forum.args = {
  width: 14,
  height: 14,
}
