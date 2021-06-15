import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TDateTimeWithDotProps } from './DateTimeWithDot'
import dayjs from 'dayjs'

export default {
  title: 'Format/Date Time With Dot',
  component: Component,
} as Meta

const TemplateOptions: Story<TDateTimeWithDotProps> = ({ ...args }) => {
  return <Component {...args} />
}

export const DateTimeWithDot = TemplateOptions.bind({})
DateTimeWithDot.args = {
  value: dayjs(),
  className: 'text-black',
}
