import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Plus as Component, TPlusProps as Props } from './Plus'

export default {
  title: 'Icons/Plus',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} className='text-black' />
}

export const Plus = Template.bind({})
Plus.args = {
  size: 30,
}
