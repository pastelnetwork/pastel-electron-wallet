import React from 'react'
import { Story, Meta } from '@storybook/react'
import { CircleCheck as Icon, TCircleCheckProps as Props } from './CircleCheck'

export default {
  title: 'Icons/CheckMark',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const CircleCheck = Template.bind({})
CircleCheck.args = {
  size: 40,
  className: 'text-green-45',
}
