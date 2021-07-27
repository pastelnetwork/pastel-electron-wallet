import React from 'react'
import { Story, Meta } from '@storybook/react'

import { NFT as Icon, TNFTProps as Props } from './NFT'

export default {
  title: 'Icons/NFT Icon',
  component: Icon,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Icon {...args} className='text-black' />
}

export const NFT = Template.bind({})
NFT.args = {
  size: 14,
}
