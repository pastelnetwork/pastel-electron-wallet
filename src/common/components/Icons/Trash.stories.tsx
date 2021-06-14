import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Trash as Icon, TTrashProps as Props } from './Trash'

export default {
  title: 'Icons/Trash',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Trash = Template.bind({})
Trash.args = {
  size: 30,
  className: 'text-black',
}
