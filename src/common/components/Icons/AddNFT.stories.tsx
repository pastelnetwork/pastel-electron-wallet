import React from 'react'
import { Story, Meta } from '@storybook/react'

import { AddNFTIcon as Component, TAddNFTProps as Props } from './AddNFT'

export default {
  title: 'Icons/ADDNFTIcon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Component {...args} />
}

export const AddNFTIcon = Template.bind({})
AddNFTIcon.args = {
  size: 21,
}
