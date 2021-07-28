import React from 'react'
import { useToggle } from 'react-use'
import dayjs from 'dayjs'

import { useAppSelector } from 'redux/hooks'
import { TNFT } from '../Nft.types'
import Breadcrumbs from './Breadcrumbs'
import Header from './header/Header'
import Image from './image/Image'
import Info from './info/Info'
import { Button } from 'common/components/Buttons'
import Description from './description/Description'
import Comments from './comments/Comments'
import nftImage from 'common/assets/images/mock/nft-big-image.png'
import avatar1 from 'common/assets/images/mock/avatar-1.png'
import Modal3 from 'features/nft/nftModals/TransferAuthorshipModal'
import Modal4 from 'features/nft/nftModals/AuthorshipClaimModal'
import Modal5 from 'features/nft/nftModals/ClaimTicketModal'
import Modal6 from 'features/nft/nftModals/CopiesDetailsModal'
import Modal7 from 'features/nft/nftModals/PricePlanModal'
import Modal8 from 'features/nft/nftModals/OwnershipHistoryModal'

const breadcrumbs = [
  { title: 'My NFT Portfolio', link: '#' },
  { title: '“Super Nfty Floating Head”' },
]

export default function PortfolioPage(): JSX.Element {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)

  const nft: TNFT = {
    id: 230456346,
    title: 'Super nfty floating head professional',
    image: nftImage,
    pastelRareness: 65,
    internetRareness: 45,
    likes: 721,
    liked: true,
    views: 231,
    type: 'Live Auction',
    status: 8,
    price: 12000,
    currencyName,
    time: dayjs().add(1, 'day').add(11, 'hours').add(11, 'seconds'),
    bids: 12900,
    author: {
      avatar: avatar1,
      name: 'Banksy86',
    },
    copies: 1,
    royalty: '10% Perpetual Royalty',
    owner: 'Banksy86',
    collection: 'Angel in the sky',
    category: 'Illustration',
    tags: ['Add your tag'],
    description:
      'There is something magical about space and astronauts. Who wouldn’t want to see the earth from space, or run around on the moon? Space is the final frontier for mankind and essentialy to the future of our species. This piece is an hommage to the brave men and women who represent mankind in this most ambitious of endeavors, who strive to push',
  }

  nft.description += nft.description // make it longer for "read more"

  const [isShowModal3, toggleShowModal3] = useToggle(false)
  const [isShowModal4, toggleShowModal4] = useToggle(false)
  const [isShowModal5, toggleShowModal5] = useToggle(false)
  const [isShowModal6, toggleShowModal6] = useToggle(false)
  const [isShowModal7, toggleShowModal7] = useToggle(false)
  const [isShowModal8, toggleShowModal8] = useToggle(false)

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <Header nft={nft} />
      <div className='page-container py-30px space-y-30px md:space-y-0 md:grid md:grid-cols-2 md:gap-5 lg:gap-10'>
        <div>
          <Image nft={nft} />
          <div className='flex flex-row  space-x-3 justify-between flex-wrap gap-y-4'>
            <Button onClick={toggleShowModal3}>Modal3</Button>
            <Button onClick={toggleShowModal4}>Modal4</Button>
            <Button onClick={toggleShowModal5}>Modal5</Button>
            <Button onClick={toggleShowModal6}>Modal6</Button>
            <Button onClick={toggleShowModal7}>Modal7</Button>
            <Button onClick={toggleShowModal8}>Modal8</Button>
          </div>
        </div>
        <div className='flex space-x-5 lg:space-x-10 md:pb-12'>
          <Info nft={nft} currencyName={currencyName} />
          <div className='bg-white pt-30px px-5 lg:px-22px rounded-lg flex-grow flex flex-col'>
            <Description nft={nft} />
            <hr className='my-30px' />
            <Comments />
          </div>
        </div>
      </div>
      <Modal3 isOpen={isShowModal3} handleClose={toggleShowModal3} />
      <Modal4 isOpen={isShowModal4} handleClose={toggleShowModal4} />
      <Modal5 isOpen={isShowModal5} handleClose={toggleShowModal5} />
      <Modal6 isOpen={isShowModal6} handleClose={toggleShowModal6} />
      <Modal7 isOpen={isShowModal7} handleClose={toggleShowModal7} />
      <Modal8 isOpen={isShowModal8} handleClose={toggleShowModal8} />
    </>
  )
}
