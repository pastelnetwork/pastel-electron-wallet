import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Refresh as Icon, TRefreshProps as Props } from './Refresh'

export default {
  title: 'Icons/Refresh Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-gray-33' />
}

export const Refresh = Template.bind({})
Refresh.args = {
  size: 44,
  pathColor: 'white',
}
