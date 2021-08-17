import React from 'react'
import { Story, Meta } from '@storybook/react'

import TimeAgo, { TTimeAgoProps } from './index'

export default {
  title: 'TimeAgo',
  component: TimeAgo,
} as Meta

const Template: Story<TTimeAgoProps> = ({ ...args }: TTimeAgoProps) => {
  return <TimeAgo {...args} />
}

export const SimpleToggle = Template.bind({})
SimpleToggle.args = {
  date: new Date('2021-06-15').getTime(),
  className: '',
}
