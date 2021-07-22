import React from 'react'
import { Story, Meta } from '@storybook/react'

import { FacebookIcon as Icon, TFacebookProps as Props } from './Facebook'

export default {
  title: 'Icons/Facebook Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const FacebookIcon = Template.bind({})
FacebookIcon.args = {
  size: 20,
  className: 'text-gray-88',
}
