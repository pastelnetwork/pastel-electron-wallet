import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  TransparencyBalance as Icon,
  TTransparencyBalanceProps as Props,
} from './TransparencyBalance'

export default {
  title: 'Icons/TransparencyBalance',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const TransparencyBalance = Template.bind({})
TransparencyBalance.args = {
  size: 70,
  className: 'text-black',
  variant: 'active',
}
