import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  TooltipArrow as Icon,
  TTooltipArrowProps as Props,
} from './TooltipArrow'

export default {
  title: 'Icons/TooltipArrow Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const TooltipArrow = Template.bind({})
TooltipArrow.args = {
  size: 8,
}
