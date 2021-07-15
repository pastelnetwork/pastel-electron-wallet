import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  QuestionLogo as Component,
  TQuestionLogoProps as Props,
} from './QuestionLogo'

export default {
  title: 'Icons/Logo Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <QuestionLogo {...args} className='text-gray-2d' />
}

export const QuestionLogo = Template.bind({})
QuestionLogo.args = {
  width: 36,
  height: 36,
}
