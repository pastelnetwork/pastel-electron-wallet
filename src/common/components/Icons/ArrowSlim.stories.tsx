import React from 'react'
import { Story, Meta } from '@storybook/react'

import { ArrowSlim, TArrowSlimProps } from './ArrowSlim'

export default {
  title: 'Icons/ArrowSlim',
  component: ArrowSlim,
} as Meta

const Template: Story<TArrowSlimProps> = ({ ...args }) => {
  return <ArrowSlim {...args} />
}

const className = 'text-black'

export const ArrowRight = Template.bind({})
ArrowRight.args = {
  size: 30,
  className,
}

export const ArrowBottom = Template.bind({})
ArrowBottom.args = {
  to: 'bottom',
  size: 30,
  className,
}

export const ArrowLeft = Template.bind({})
ArrowLeft.args = {
  to: 'left',
  size: 30,
  className,
}

export const ArrowTop = Template.bind({})
ArrowTop.args = {
  to: 'top',
  size: 30,
}
