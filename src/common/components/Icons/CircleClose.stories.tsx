import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  CircleCloseIcon as Icon,
  TCircleCloseProps as Props,
} from './CircleClose'

export default {
  title: 'Icons/Circle Close Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const CircleCloseIcon = Template.bind({})
CircleCloseIcon.args = {
  size: 40,
  className: 'text-gray-71',
}
