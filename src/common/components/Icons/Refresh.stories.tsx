import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Refresh as Component, TRefreshProps as Props } from './Refresh'

export default {
  title: 'Icons/Refresh Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Refresh {...args} className='text-gray-33' />
}

export const Refresh = Template.bind({})
Refresh.args = {
  width: 44,
  height: 44,
  pathColor: 'white',
}
