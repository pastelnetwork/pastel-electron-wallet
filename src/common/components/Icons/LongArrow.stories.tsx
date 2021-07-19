import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  LongArrow as Component,
  LongArrow,
  TLongArrowProps as Props,
} from './LongArrow'

export default {
  title: 'Icons/Arrow',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <LongArrow {...args} className='text-gray-88' />
}

export const SimpleLongArrow = Template.bind({})
SimpleLongArrow.args = {
  width: 24,
  height: 24,
  to: 'right',
}
