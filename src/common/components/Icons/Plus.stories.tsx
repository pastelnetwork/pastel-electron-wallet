import React from 'react'
import { Story, Meta } from '@storybook/react'

import Plus, { TPlusProps as Props } from './Plus'

export default {
  title: 'Icons/Plus',
  component: Plus,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Plus {...args} className='text-black' />
}

export const HeartIcon = Template.bind({})
HeartIcon.args = {
  size: 30,
}
