import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Dots as Icon, TDotsProps } from './Dots'

export default {
  title: 'Icons/Dots',
  component: Icon,
} as Meta

const Template: Story<TDotsProps> = ({ ...args }) => {
  return <Icon {...args} />
}

export const DotsHorizontal = Template.bind({})
DotsHorizontal.args = {
  size: 30,
  className: 'text-black',
}

export const DotsVertical = Template.bind({})
DotsVertical.args = {
  vertical: true,
  size: 30,
  className: 'text-black',
}
