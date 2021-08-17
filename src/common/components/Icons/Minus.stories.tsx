import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Minus as Component, TMinusProps as Props } from './Minus'

export default {
  title: 'Icons/Minus',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} className='text-black' />
}

export const Minus = Template.bind({})
Minus.args = {
  size: 30,
}
