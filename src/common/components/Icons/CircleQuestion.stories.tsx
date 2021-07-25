import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  CircleQuestion as Component,
  TCircleQuestionProps as Props,
} from './CircleQuestion'

export default {
  title: 'Icons/CircleQuestion',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} />
}

export const CircleQuestion = Template.bind({})
CircleQuestion.args = {
  size: 18,
  className: 'text-gray-33',
  hasNotification: true,
}
