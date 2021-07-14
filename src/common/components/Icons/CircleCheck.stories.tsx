import React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  CircleCheck as Component,
  TCircleCheckProps as Props,
} from './CircleCheck'

export default {
  title: 'Icons/CircleCheck Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <CircleCheck {...args} className='text-green-45' />
}

export const CircleCheck = Template.bind({})
CircleCheck.args = {
  width: 40,
  height: 40,
}
