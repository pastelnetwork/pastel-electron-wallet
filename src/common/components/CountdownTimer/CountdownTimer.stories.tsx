import React from 'react'
import { Story, Meta } from '@storybook/react'
import CountdownTimer, { TCountdownTimerProps } from './CountdownTimer'

export default {
  component: CountdownTimer,
  title: 'CountdownTimer',
} as Meta

const Template: Story<TCountdownTimerProps> = ({
  ...args
}: TCountdownTimerProps) => {
  return <CountdownTimer {...args} />
}

export const SimpleCountdownTimer = Template.bind({})
SimpleCountdownTimer.args = {
  countDownDate: new Date('Jan 5, 2022 15:37:25').getTime(),
}
