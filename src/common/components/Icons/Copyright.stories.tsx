import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Copyright as Icon, TCopyrightProps as Props } from './Copyright'

export default {
  title: 'Icons/Copyright',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Copyright = Template.bind({})
Copyright.args = {
  size: 30,
  className: 'text-black',
}
