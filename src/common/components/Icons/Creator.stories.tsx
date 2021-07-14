import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Creator as Component, TCreatorProps as Props } from './Creator'

export default {
  title: 'Icons/Creator Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Creator {...args} className='text-black' />
}

export const Creator = Template.bind({})
Creator.args = {
  width: 14,
  height: 14,
}
