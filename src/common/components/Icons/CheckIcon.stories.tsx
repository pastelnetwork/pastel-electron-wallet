import React from 'react'
import { Story, Meta } from '@storybook/react'

import { CheckIcon as Icon, TCheckIconProps as Props } from './CheckIcon'

export default {
  title: 'Icons/CheckMark',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const SimpleCheck = Template.bind({})
SimpleCheck.args = {
  size: 30,
  className: 'text-black',
  strokeWidth: 2,
}
