import React from 'react'
import { Story, Meta } from '@storybook/react'

import Dots, { TDotsProps } from './Dots'

export default {
  title: 'Icons/Dots',
  component: Dots,
} as Meta

const Template: Story<TDotsProps> = ({ ...args }) => {
  return <Dots {...args} className='text-black' />
}

export const DotsHorizontal = Template.bind({})
DotsHorizontal.args = {
  size: 30,
}

export const DotsVertical = Template.bind({})
DotsVertical.args = {
  vertical: true,
  size: 30,
}
