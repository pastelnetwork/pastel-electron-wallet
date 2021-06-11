import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Expand as Icon, TExpandProps as Props } from './Expand'

export default {
  title: 'Icons/Expand',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Expand = Template.bind({})
Expand.args = {
  size: 30,
  className: 'text-black',
}
