import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Flag as Icon, TFlagProps as Props } from './Flag'

export default {
  title: 'Icons/Flag',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Flag = Template.bind({})
Flag.args = {
  size: 30,
  className: 'text-black',
}
