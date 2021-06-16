import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Crop as Icon, TCropProps as Props } from './Crop'

export default {
  title: 'Icons/Crop',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} />
}

export const Crop = Template.bind({})
Crop.args = {
  size: 30,
  className: 'text-black',
}
