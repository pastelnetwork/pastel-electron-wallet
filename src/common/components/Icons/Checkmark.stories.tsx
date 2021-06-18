import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Checkmark as Icon, TCheckmarkProps as Props } from './Checkmark'

export default {
  title: 'Icons/Box Arrow Up',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Checkmark = Template.bind({})
Checkmark.args = {
  size: 30,
  className: 'text-black',
}
