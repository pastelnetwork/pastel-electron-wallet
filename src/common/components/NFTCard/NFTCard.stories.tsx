import React from 'react'
import { Story, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import avatar from '../../../common/assets/images/avatar-placeholder.png'
import image from '../../../common/assets/images/nft-card-placeholder.png'
import NFTCardComponent, { TNFTCard, NFTCardVariantSize } from './NFTCard'

const mockCardProps: TNFTCard = {
  author: 'zndrson',
  avatarSrc: avatar,
  imageSrc: image,
  likes: 23,
  price: 12000,
  currencyName: 'PSL',
  title: 'Cosmic Perspective Longname',
  className: 'w-[364px]',
  followers: 0,
  nsfw: { porn: 0, hentai: 0 },
}

export default {
  title: 'NFTCard',
  component: NFTCardComponent,
} as Meta

const Template: Story<TNFTCard> = props => {
  return (
    <MemoryRouter>
      <div className='grid grid-cols-4 gap-10'>
        <NFTCardComponent {...props} />
      </div>
    </MemoryRouter>
  )
}

export const PlaceABid = Template.bind({})
PlaceABid.args = {
  ...mockCardProps,
  isAuctionBid: true,
  leftTime: new Date('Jan 5, 2022 15:37:25').getTime(),
  variant: NFTCardVariantSize.XL,
}

export const BuyItNow = Template.bind({})
BuyItNow.args = {
  ...mockCardProps,
  copiesAvailable: 15,
  isFixedPrice: true,
  variant: NFTCardVariantSize.XL,
}

export const MakeAnOffer = Template.bind({})
MakeAnOffer.args = {
  ...mockCardProps,
  isNotForSale: true,
  variant: NFTCardVariantSize.XL,
}
