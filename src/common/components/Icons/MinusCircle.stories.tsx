import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  MinusCircle as Component,
  TMinusCircleProps as Props,
} from './MinusCircle'

export default {
  title: 'Icons/Minus Circle',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <MinusCircle {...args} className='text-black' />
}

export const MinusCircle = Template.bind({})
MinusCircle.args = {
  size: 30,
}
