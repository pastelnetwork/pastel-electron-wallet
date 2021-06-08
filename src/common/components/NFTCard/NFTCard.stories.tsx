import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import avatar from '../../../common/assets/images/avatar-placeholder.png'
import image from '../../../common/assets/images/nft-card-placeholder.png'
import NFTCardComponent, { INFTCardProps } from './NFTCard'

const mockCardProps: INFTCardProps = {
  author: 'zndrson',
  avatarSrc: avatar,
  imageSrc: image,
  likes: 23,
  liked: true,
  onSale: true,
  price: '222K',
  currencyName: 'PSL',
  title: 'Cosmic Perspective',
  className: 'w-300px',
}

export default {
  title: 'NFTCard',
  component: NFTCardComponent,
} as Meta

const Template: Story<INFTCardProps> = props => {
  return (
    <MemoryRouter>
      <div className='grid grid-cols-4 gap-10'>
        <NFTCardComponent {...props} />
      </div>
    </MemoryRouter>
  )
}

export const NFTCard = Template.bind({})
NFTCard.args = { ...mockCardProps }
