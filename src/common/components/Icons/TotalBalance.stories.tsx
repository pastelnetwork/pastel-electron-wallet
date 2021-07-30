import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  TotalBalance as Icon,
  TToatalBalanceProps as Props,
} from './TotalBalance'

export default {
  title: 'Icons/TotalBalance',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const TotalBalance = Template.bind({})
TotalBalance.args = {
  size: 69,
  className: 'text-black',
  variant: 'active',
}
