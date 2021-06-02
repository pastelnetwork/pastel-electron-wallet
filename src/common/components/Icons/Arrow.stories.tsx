import React from 'react'
import { Story, Meta } from '@storybook/react'

import Arrow, { TArrowProps } from './Arrow'

export default {
  title: 'Icons/Arrow',
  component: Arrow,
} as Meta

const Template: Story<TArrowProps> = ({ ...args }) => {
  return <Arrow {...args} className='text-black' />
}

export const ArrowRight = Template.bind({})
ArrowRight.args = {
  size: 30,
}

export const ArrowBottom = Template.bind({})
ArrowBottom.args = {
  to: 'bottom',
  size: 30,
}

export const ArrowLeft = Template.bind({})
ArrowLeft.args = {
  to: 'left',
  size: 30,
}

export const ArrowTop = Template.bind({})
ArrowTop.args = {
  to: 'top',
  size: 30,
}
