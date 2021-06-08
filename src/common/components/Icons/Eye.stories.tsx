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

export const Eye = Template.bind({})
Eye.args = {
  size: 30,
  className: 'text-black',
}
