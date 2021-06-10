import React from 'react'
import { Story, Meta } from '@storybook/react'

import Heart, { THeartProps } from './Heart'

export default {
  title: 'Icons/Heart',
  component: Heart,
} as Meta

const Template: Story<THeartProps> = ({ ...args }) => {
  return <Heart {...args} className='text-black' />
}

export const HeartIcon = Template.bind({})
HeartIcon.args = {
  size: 30,
}
