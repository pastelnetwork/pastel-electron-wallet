import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Warning as Icon, TWarningProps as Props } from './Warning'

export default {
  title: 'Icons/Warning',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Warning = Template.bind({})
Warning.args = {
  size: 30,
  className: 'text-orange-ffc',
}
