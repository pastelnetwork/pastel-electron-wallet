import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TTooltipProps } from './Tooltip2'

export default {
  title: 'Tooltip2',
  component: Component,
} as Meta

const Template: Story<TTooltipProps> = ({ ...args }: TTooltipProps) => {
  return (
    <div className='mt-10'>
      <Component {...args}>{ref => <span ref={ref}>hover me</span>}</Component>
    </div>
  )
}

export const Tooltip2 = Template.bind({})
Tooltip2.args = {
  text: 'Tooltip text',
}
