import React from 'react'
import { TNFT } from '../Nft.types'
import dayjs from 'dayjs'
import Breadcrumbs from './Breadcrumbs'
import Header from './header/Header'
import Image from './image/Image'
import Info from './info/Info'
import Description from './description/Description'
import Comments from './comments/Comments'
import nftImage from 'common/assets/images/mock/nft-big-image.png'
import avatar1 from 'common/assets/images/mock/avatar-1.png'

const nft: TNFT = {
  id: 230456346,
  title: 'Super nfty floating head professional',
  image: nftImage,
  pastelRareness: 65,
  internetRareness: 45,
  likes: 721,
  liked: true,
  views: 231,
  status: 'listed',
  price: 12000,
  currencyName: 'PSL',
  time: dayjs().add(1, 'day').add(11, 'hours').add(11, 'seconds'),
  bids: 12900,
  author: {
    avatar: avatar1,
    name: 'Banksy86',
  },
  copies: 1,
  owner: 'Banksy86',
  collection: 'angel in the sky',
  category: 'illustration',
  tags: ['add your tag'],
  description:
    'I’m baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pinterest mumblecore tousled occupy brunch whatever ugh.',
}

nft.description += nft.description // make it longer for "read more"

export default function PortfolioPage(): JSX.Element {
  return (
    <>
      <Breadcrumbs
        items={[{ title: 'Portfolio', link: '#' }, { title: nft.title }]}
      />
      <Header nft={nft} />
      <div className='page-container py-30px space-y-30px md:space-y-0 md:grid md:grid-cols-2 md:gap-5 lg:gap-10'>
        <Image nft={nft} />
        <div className='flex space-x-5 lg:space-x-10 md:pb-12'>
          <Info nft={nft} />
          <div className='bg-white pt-30px px-5 lg:px-22px rounded-lg flex-grow flex flex-col'>
            <Description nft={nft} />
            <hr className='my-30px' />
            <Comments />
          </div>
        </div>
      </div>
    </>
  )
}
