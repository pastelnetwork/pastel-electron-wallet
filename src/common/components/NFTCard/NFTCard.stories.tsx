import React from 'react'
import { Story, Meta } from '@storybook/react'

import avatar from '../../../common/assets/images/avatar-placeholder.png'
import image from '../../../common/assets/images/nft-card-placeholder.png'
import NFTCardComponent, { NFTCardProps } from '.'

const mockCardProps: NFTCardProps = {
  author: 'zndrson',
  avatarSrc: avatar,
  imageSrc: image,
  likes: 23,
  onSale: true,
  price: '222K',
  title: 'Cosmic Perspective',
}

export default {
  title: 'NFTCard',
  component: NFTCardComponent,
} as Meta

const Template: Story<NFTCardProps> = props => {
  return (
    <div className='grid grid-cols-4 gap-10'>
      <NFTCardComponent {...props} />
    </div>
  )
}

export const NFTCard = Template.bind({})
NFTCard.args = { ...mockCardProps }