import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Caret as Component, TCaretProps as TProps } from './Caret'

export default {
  title: 'Icons/Caret',
  component: Component,
} as Meta

const Template: Story<TProps> = ({ ...args }) => {
  return <Component {...args} />
}

const className = 'text-black'

export const ArrowRight = Template.bind({})
ArrowRight.args = {
  to: 'right',
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
