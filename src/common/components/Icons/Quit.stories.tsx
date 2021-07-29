import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Quit as Icon, TQuitProps as Props } from './Quit'

export default {
  title: 'Icons/Quit Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const QuitIcon = Template.bind({})
QuitIcon.args = {
  size: 30,
  className: 'text-blue-3f',
}
