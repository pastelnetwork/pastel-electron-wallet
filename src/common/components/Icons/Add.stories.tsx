import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AddIcon as Component, TAddIconProps as Props } from './Add'

export default {
  title: 'Icons/Add',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} />
}

export const AddIcon = Template.bind({})
AddIcon.args = {
  size: 29,
  strokeWidth: 1.4,
  className: 'text-blue-3f',
}
