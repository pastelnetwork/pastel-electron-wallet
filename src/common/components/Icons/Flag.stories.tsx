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

export const FilledFlag = Template.bind({})
FilledFlag.args = {
  size: 30,
  className: 'text-black',
  variant: 'fill',
}

export const StrokeFlag = Template.bind({})
StrokeFlag.args = {
  size: 30,
  className: 'text-black',
  variant: 'stroke',
}
