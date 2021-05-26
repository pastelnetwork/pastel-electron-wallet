import React from 'react'

import { NFTCard, NFTCardProps } from '../../common/components/NFTCard/NFTCard'

import avatar from '../../common/assets/images/avatar-placeholder.png'
import image from '../../common/assets/images/nft-card-placeholder.png'

const mockCardProps: NFTCardProps = {
  author: 'zndrson',
  avatarSrc: avatar,
  imageSrc: image,
  likes: 23,
  onSale: true,
  price: '222K',
  title: 'Cosmic Perspective',
}

const PortfolioFeed: React.FC = () => {
  return (
    <div className='wrapper text-text-gray900 bg-background-main h-full '>
      <div className='grid grid-cols-3 md:grid-cols-4 gap-10'>
        {Array.from({ length: 6 }).map(() => (
          <NFTCard {...mockCardProps} />
        ))}
      </div>
    </div>
  )
}

export default PortfolioFeed
