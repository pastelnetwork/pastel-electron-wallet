import React from 'react'
import { Story, Meta } from '@storybook/react'

import { NFT as Component, TNFTProps as Props } from './NFT'

export default {
  title: 'Icons/NFT Icon',
  component: Component,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <NFT {...args} className='text-black' />
}

export const NFT = Template.bind({})
NFT.args = {
  width: 14,
  height: 14,
}
