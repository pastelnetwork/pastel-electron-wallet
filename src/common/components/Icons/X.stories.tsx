import React from 'react'
import { Story, Meta } from '@storybook/react'

import { X as Icon, TXProps as Props } from './X'

export default {
  title: 'Icons/X',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const X = Template.bind({})
X.args = {
  size: 30,
  className: 'text-black',
}
