import React from 'react'
import { Story, Meta } from '@storybook/react'

import { TwitterIcon as Icon, TTwitterProps as Props } from './Twitter'

export default {
  title: 'Icons/Twitter Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const TwitterIcon = Template.bind({})
TwitterIcon.args = {
  width: 20,
  height: 20,
  className: 'text-gray-88',
}
