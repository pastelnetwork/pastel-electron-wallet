import React from 'react'
import { Story, Meta } from '@storybook/react'

import DateTimeWithDot, { TDateTimeWithDotProps } from './DateTimeWithDot'
import dayjs from 'dayjs'

export default {
  title: 'Format/DateTimeWithDot',
  component: DateTimeWithDot,
} as Meta

const TemplateOptions: Story<TDateTimeWithDotProps> = ({ ...args }) => {
  return <DateTimeWithDot {...args} />
}

export const DisplayDateTimeWithDot = TemplateOptions.bind({})
DisplayDateTimeWithDot.args = {
  value: dayjs(),
  className: 'text-black',
}
