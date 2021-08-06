import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  ShieldedBalance as Icon,
  TShieldedBalanceProps as Props,
} from './ShieldedBalance'

export default {
  title: 'Icons/ShieldedBalance',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const ShieldedBalance = Template.bind({})
ShieldedBalance.args = {
  size: 69,
  className: 'text-black',
  variant: 'active',
}
