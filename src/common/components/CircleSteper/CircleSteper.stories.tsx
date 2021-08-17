import React from 'react'
import { Story, Meta } from '@storybook/react'

import CircleSteper, { TCircleSteperProps } from './index'

export default {
  title: 'CircleSteper',
  component: CircleSteper,
} as Meta

const Template: Story<TCircleSteperProps> = ({
  ...args
}: TCircleSteperProps) => {
  return <CircleSteper {...args} />
}

export const SimpleCircleSteper = Template.bind({})
SimpleCircleSteper.args = {
  size: 65,
  totalStep: 4,
  spaceAngle: 10,
  currentStep: 2,
  stopColor1: '#3F9AF7',
  stopColor2: '#6C5DD3',
  spacing: 10,
}
