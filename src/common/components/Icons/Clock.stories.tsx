import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Clock as Icon, TClockProps as Props } from './Clock'

export default {
  title: 'Icons/Clock Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Clock = Template.bind({})
Clock.args = {
  size: 14,
  className: 'text-gray-71',
}
