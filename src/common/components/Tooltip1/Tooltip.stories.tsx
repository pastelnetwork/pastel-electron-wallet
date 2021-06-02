import React from 'react'
import { Story, Meta } from '@storybook/react'

import Tooltip, { TooltipProps } from './Tooltip'

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TooltipProps> = ({ type, ...args }: TooltipProps) => {
  return (
    <Tooltip {...args} type={type}>
      This is the tooltip component
    </Tooltip>
  )
}

export const SimpleAutocomplete = Template.bind({})
SimpleAutocomplete.args = {
  type: 'top',
  content: 'Transparent info',
  classnames: 'pt-5px pl-9px pr-2.5 pb-1 text-xs',
  width: 108,
}
