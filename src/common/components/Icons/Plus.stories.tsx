import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Plus as Icon, TPlusProps as Props } from './Plus'

export default {
  title: 'Icons/Plus Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const Plus = Template.bind({})
Plus.args = {
  size: 30,
}
