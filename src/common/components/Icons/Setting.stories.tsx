import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SettingIcon as Component, TSettingIconProps as Props } from './Setting'

export default {
  title: 'Icons/Setting Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} className='text-gray-33' />
}

export const SettingIcon = Template.bind({})
SettingIcon.args = {
  size: 18,
  hasNotification: false,
}
