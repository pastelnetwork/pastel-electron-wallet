import React from 'react'

import avatar from '../../../common/assets/images/avatar-placeholder.png'
import image from '../../../common/assets/images/nft-card-placeholder.png'
import {
  NFTCard as NFTCardComponent,
  NFTCardProps,
} from '../../../common/components/NFTCard/NFTCard'
import NFTMarketFeedComponent from '../NFTMarketFeed'

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
  title: 'NFT/NFTMarket',
}

export const NFTCard: React.FC = () => (
  <div className='grid grid-cols-3 lg:grid-cols-4 gap-10 text-gray-1a'>
    <NFTCardComponent {...mockCardProps} />
  </div>
)
export const MarketFeed: React.FC = () => <NFTMarketFeedComponent />
