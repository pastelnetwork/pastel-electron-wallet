import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Creator as Icon, TCreatorProps as Props } from './Creator'

export default {
  title: 'Icons/Creator Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Creator = Template.bind({})
Creator.args = {
  size: 14,
  className: 'text-black',
}
