import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Money as Icon, TMoneyProps as Props } from './Money'

export default {
  title: 'Icons/Money',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Money = Template.bind({})
Money.args = {
  size: 30,
  className: 'text-black',
}
