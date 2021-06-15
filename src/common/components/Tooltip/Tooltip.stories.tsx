import React from 'react'
import { Story, Meta } from '@storybook/react'

import Tooltip, { TTooltipProps } from './index'

export default {
  title: 'Tooltip',
  component: Tooltip,
} as Meta

const Template: Story<TTooltipProps> = ({ type, ...args }: TTooltipProps) => {
  return (
    <div className='mt-10 ml-48'>
      <Tooltip {...args} type={type}>
        This is the tooltip component
      </Tooltip>
    </div>
  )
}

export const SimpleAutocomplete = Template.bind({})
SimpleAutocomplete.args = {
  type: 'top',
  content: 'Transparent info',
  classnames: 'pt-5px pl-9px pr-2.5 pb-1 text-xs',
  width: 108,
}
