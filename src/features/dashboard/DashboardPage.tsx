import React from 'react'
import Dots from '../../common/components/Icons/Dots'
import TransactionItem from './TransactionItem'
import PortfolioColumn from './PortfolioColumn'
import PortfolioItem, { PortfolioItemProps } from './PortfolioItem'
import NFTCard, { NFTCompactCardProps } from '../../common/components/NFTCard'
import Notification from './Notification'
import LinkSection from './LinkSection'
import dayjs from 'dayjs'
import smallImage from '../../common/assets/images/mock/small-image.png'
import image from '../../common/assets/images/nft-card-placeholder.png'

const transactions: { type: 'in' | 'out'; amount: string }[] = [
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
]

const portfolioItemProps: PortfolioItemProps = {
  image: smallImage,
  title: 'Comic Perspective',
  author: '@zndrson',
  price: 5000,
}

const NFTCardProps: NFTCompactCardProps = {
  imageSrc: image,
  likes: 23,
  title: 'Cosmic Perspective',
}

const date = dayjs()
let notifications = [
  {
    message: '1 new listing',
    date,
  },
  {
    message: '1 new sale',
    date,
  },
  {
    message: '1 new transfer',
    date,
  },
]
notifications = [...notifications, ...notifications, ...notifications]

export default function DashboardPage(): JSX.Element {
  return (
    <div className='page-container py-5 w-full max-w-screen-xl mx-auto'>
      <div className='flex mb-5'>
        <div className='h-380px' />
        <div className='paper pt-6 pb-5 w-335px flex flex-col relative'>
          <div className='flex items-center justify-between h-6 mb-3 flex-shrink-0 px-8'>
            <div className='font-extrabold text-gray-2d'>Wallet balance</div>
            <div className='font-black text-gray-1d text-lg'>32,000 PSTL</div>
          </div>
          <div className='flex-grow pl-8 pr-3.5 mr-18px pb-5 h-0 overflow-auto'>
            {transactions.map((transaction, i) => (
              <TransactionItem key={i} {...transaction} />
            ))}
          </div>
          <LinkSection to='#' absolute gradient>
            Wallet Details
          </LinkSection>
        </div>
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          <div className='md:flex-shrink-0 flex items-center h-6 px-6 mb-5'>
            <div className='font-extrabold text-gray-2d'>Portfolio</div>
            <div className='font-extrabold text-gray-a0 text-xs ml-3'>
              23 items
            </div>
            <Dots
              size={24}
              className='text-gray-b0 ml-auto relative -right-2px'
            />
          </div>
          <div className='md:flex-grow md:flex'>
            <PortfolioColumn title='Sales in progress'>
              <PortfolioItem {...portfolioItemProps} />
              <PortfolioItem {...portfolioItemProps} />
            </PortfolioColumn>
            <PortfolioColumn
              title='In review'
              className='md:border-l md:border-r md:border-gray-e7'
            >
              <PortfolioItem {...portfolioItemProps} />
            </PortfolioColumn>
            <PortfolioColumn title='On Sale'>
              <PortfolioItem {...portfolioItemProps} />
              <PortfolioItem {...portfolioItemProps} />
            </PortfolioColumn>
          </div>
          <LinkSection to='#'>Portfolio details</LinkSection>
        </div>
      </div>
      <div className='flex'>
        <div className='h-380px' />
        <div className='paper pt-6 flex-grow lg:flex lg:flex-col relative w-0 mr-5 relative'>
          <div className='flex items-center h-6 mb-2.5 flex-shrink-0 px-30px'>
            <div className='font-extrabold text-gray-2d'>Trending NFTs</div>
            <div className='font-black text-gray-1d text-lg ml-2.5'>
              312,000 listed
            </div>
            <Dots size={24} className='text-gray-b0 ml-auto' />
          </div>
          <div className='lg:flex-grow px-30px pb-14'>
            <div className='flex flex-col items-center space-y-30px lg:space-y-0 lg:grid lg:grid-flow-col lg:gap-30px'>
              {Array.from({ length: 3 }).map((_, i) => (
                <NFTCard key={i} {...NFTCardProps} className='max-w-xs' />
              ))}
            </div>
          </div>
          <LinkSection to='#' absolute>
            Check your NFT feed
          </LinkSection>
        </div>
        <div className='paper pt-6 w-419px flex-shrink-0 flex flex-col relative'>
          <div className='flex items-center justify-between h-6 mb-3 flex-shrink-0 px-8'>
            <div className='font-extrabold text-gray-2d'>
              Latest notifications
            </div>
            <div className='font-extrabold text-gray-a0 text-xs ml-3'>
              4 unread
            </div>
          </div>
          <div className='flex-grow pl-8 pr-3.5 mr-18px pb-5 h-0 overflow-auto'>
            {notifications.map((notification, i) => (
              <Notification key={i} {...notification} />
            ))}
          </div>
          <LinkSection to='#'>Check all notifications</LinkSection>
        </div>
      </div>
    </div>
  )
}
