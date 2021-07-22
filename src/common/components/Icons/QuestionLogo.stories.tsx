import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  QuestionLogo as Icon,
  TQuestionLogoProps as Props,
} from './QuestionLogo'

export default {
  title: 'Icons/Logo Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-2d' />
}

export const QuestionLogo = Template.bind({})
QuestionLogo.args = {
  size: 36,
}
