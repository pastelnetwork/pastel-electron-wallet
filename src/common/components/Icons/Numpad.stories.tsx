import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Numpad as Icon, TNumpadProps as Props } from './Numpad'

export default {
  title: 'Icons/Numpad',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Numpad = Template.bind({})
Numpad.args = {
  size: 30,
  className: 'text-black',
}
