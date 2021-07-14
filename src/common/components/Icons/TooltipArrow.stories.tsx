import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  TooltipArrow as Component,
  TTooltipArrowProps as Props,
} from './TooltipArrow'

export default {
  title: 'Icons/TooltipArrow Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <TooltipArrow {...args} className='text-gray-33' />
}

export const TooltipArrow = Template.bind({})
TooltipArrow.args = {
  width: 8,
  height: 4,
}
