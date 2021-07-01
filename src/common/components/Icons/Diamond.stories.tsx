import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Diamond as Icon, TDiamondProps as Props } from './Diamond'

export default {
  title: 'Icons/Diamond',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Diamond = Template.bind({})
Diamond.args = {
  size: 30,
  className: 'text-green-45',
}
