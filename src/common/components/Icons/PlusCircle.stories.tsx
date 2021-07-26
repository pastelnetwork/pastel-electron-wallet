import React from 'react'
import { Story, Meta } from '@storybook/react'

import { PlusCircle as Icon, TPlusCircleProps as TProps } from './PlusCircle'

export default {
  title: 'Icons/Plus Circle',
  component: Icon,
} as Meta

const Template: Story<TProps> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const PlusCircle = Template.bind({})
PlusCircle.args = {
  size: 30,
}

export const PlusCircleBold = Template.bind({})
PlusCircleBold.args = {
  size: 30,
  bold: true,
}
