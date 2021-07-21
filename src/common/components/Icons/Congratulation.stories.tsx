import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  Congratulation as Icon,
  TCongratulationProps as Props,
} from './Congratulation'

export default {
  title: 'Icons/Congratulation Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const SimpleCongratulationIcon = Template.bind({})
SimpleCongratulationIcon.args = {
  size: 24,
  className: 'text-gray-2d',
}
