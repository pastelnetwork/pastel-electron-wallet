import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Backspace as Icon, TBackspaceProps as Props } from './Backspace'

export default {
  title: 'Icons/Backspace',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Backspace = Template.bind({})
Backspace.args = {
  size: 30,
  className: 'text-black',
}
