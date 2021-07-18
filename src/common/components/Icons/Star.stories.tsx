import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Star as Icon, TStarProps as Props } from './Star'

export default {
  title: 'Icons/Star',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const FilledStar = Template.bind({})
FilledStar.args = {
  width: 18,
  height: 16,
  className: 'text-gray-8e',
  filled: false,
}
export const SimpleStar = Template.bind({})

SimpleStar.args = {
  width: 18,
  height: 16,
  className: 'text-yellow-ffd',
  filled: true,
}
