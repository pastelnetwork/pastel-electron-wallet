import React from 'react'
import { Story, Meta } from '@storybook/react'

import { HeartFilled as Icon, THeartFilledProps as Props } from './HeartFilled'

export default {
  title: 'Icons/Heart Filled',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const HeartFilled = Template.bind({})
HeartFilled.args = {
  size: 30,
  className: 'text-black',
}
