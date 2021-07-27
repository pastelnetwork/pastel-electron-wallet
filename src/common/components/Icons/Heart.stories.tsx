import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Heart as Icon, THeartProps as Props } from './Heart'

export default {
  title: 'Icons/Heart',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Heart = Template.bind({})
Heart.args = {
  size: 30,
  className: 'text-error',
}
