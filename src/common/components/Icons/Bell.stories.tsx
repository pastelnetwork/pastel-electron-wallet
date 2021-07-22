import React from 'react'
import { Story, Meta } from '@storybook/react'

import { BellIcon as Component, TBellIconProps as Props } from './Bell'

export default {
  title: 'Icons/BellIcon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} />
}

export const BellIcon = Template.bind({})
BellIcon.args = {
  size: 16,
  className: 'text-gray-33',
  hasNotification: true,
}
