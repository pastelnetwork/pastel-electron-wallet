import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Key as Icon, TKeyProps as Props } from './Key'

export default {
  title: 'Icons/Key',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Key = Template.bind({})
Key.args = {
  size: 24,
  className: 'text-blue-3f',
}
