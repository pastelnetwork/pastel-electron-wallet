import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Close as Icon, TCloseProps as Props } from './Close'

export default {
  title: 'Icons/Close Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const CloseIcon = Template.bind({})
CloseIcon.args = {
  size: 20,
  pathClassName: '#8894AA',
  circleClassName: '#F6F7F9',
}
