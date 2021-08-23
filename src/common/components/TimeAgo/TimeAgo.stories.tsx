import React from 'react'
import { Story, Meta } from '@storybook/react'

import timeAgo from './index'

export default {
  title: 'TimeAgo',
} as Meta

const Template: Story<{ date: number }> = ({ date }: { date: number }) => {
  return <div>{timeAgo(date)}</div>
}

export const SimpleToggle = Template.bind({})
SimpleToggle.args = {
  date: new Date('2021-06-15').getTime(),
}
