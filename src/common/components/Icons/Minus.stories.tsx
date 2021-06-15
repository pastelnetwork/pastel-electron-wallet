import React from 'react'
import { Story, Meta } from '@storybook/react'

import Minus, { TMinusProps as Props } from './Minus'

export default {
  title: 'Icons/Minus',
  component: Minus,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Minus {...args} className='text-black' />
}

export const HeartIcon = Template.bind({})
HeartIcon.args = {
  size: 30,
}
