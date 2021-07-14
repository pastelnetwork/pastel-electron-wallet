import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Clock as Component, TClockProps as Props } from './Clock'

export default {
  title: 'Icons/Clock Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Clock {...args} className='text-71' />
}

export const Clock = Template.bind({})
Clock.args = {
  width: 14,
  height: 14,
}
