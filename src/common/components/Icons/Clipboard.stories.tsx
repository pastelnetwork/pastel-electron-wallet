import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Clipboard as Icon, TClipboardProps as Props } from './Clipboard'

export default {
  title: 'Icons/Clipboard',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Clipboard = Template.bind({})
Clipboard.args = {
  size: 30,
  className: 'text-green-45',
}
