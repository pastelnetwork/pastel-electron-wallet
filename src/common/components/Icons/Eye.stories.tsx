import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Eye as Icon, TEyeProps as Props } from './Eye'

export default {
  title: 'Icons/Eye',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const EyeType1 = Template.bind({})
EyeType1.args = {
  size: 30,
  variant: 'type1',
  className: 'text-black',
}

export const EyeType2 = Template.bind({})
EyeType2.args = {
  size: 19,
  variant: 'type2',
  className: 'text-gray-88',
}

export const HiddenIcon = Template.bind({})
HiddenIcon.args = {
  size: 19,
  variant: 'hidden',
  className: 'text-gray-88',
}
