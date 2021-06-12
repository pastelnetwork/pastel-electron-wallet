import React from 'react'
import { Dots } from 'common/components/Icons'
import TransactionItem, { TTransactionItemProps } from './TransactionItem'
import PortfolioColumn from './PortfolioColumn'
import PortfolioItem, { TPortfolioItemProps } from './PortfolioItem'
import NFTCard, { INFTCompactCardProps } from '../../common/components/NFTCard'
import Notification from './Notification'
import LinkSection from './LinkSection'
import dayjs from 'dayjs'
import smallImage from '../../common/assets/images/mock/small-image.png'
import image from '../../common/assets/images/nft-card-placeholder.png'
import { formatNumber } from '../../common/utils/format'

const date = dayjs('2021-04-04')

const walletBalance = 32000
const currencyName = 'PSL'

const transactions: TTransactionItemProps[] = [
  { type: 'in', amount: 320000, date, currencyName },
  { type: 'out', amount: 123000, date, currencyName },
  { type: 'in', amount: 320000, date, currencyName },
  { type: 'out', amount: 123000, date, currencyName },
  { type: 'in', amount: 320000, date, currencyName },
  { type: 'out', amount: 123000, date, currencyName },
  { type: 'in', amount: 320000, date, currencyName },
]

const portfolioItemProps: TPortfolioItemProps = {
  image: smallImage,
  title: 'Cosmic Perspective',
  author: '@zndrson',
  price: 5000,
  currencyName,
}

const NFTCardProps: INFTCompactCardProps = {
  imageSrc: image,
  likes: 23,
  title: 'Cosmic Perspective',
  liked: false,
}

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
            <div className='font-black text-gray-1d text-lg'>
              {formatNumber(walletBalance)} {currencyName}
            </div>
          </div>
          <div className='flex-grow pl-8 pr-3.5 mr-18px pb-5 h-0 overflow-auto'>
            {transactions.map((transaction, i) => (
              <TransactionItem key={i} {...transaction} />
            ))}
          </div>
          <LinkSection to='#' absolute gradient>
            Wallet details
          </LinkSection>
        </div>
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          <div className='md:flex-shrink-0 flex items-center h-6 px-6 mb-5'>
            <div className='font-extrabold text-gray-2d'>Portfolio</div>
            <div className='font-extrabold text-gray-a0 text-xs ml-3'>
              23 items
            </div>
            <button type='button' className='ml-auto relative -right-2px'>
              <Dots size={24} className='text-gray-b0 hover:opacity-80' />
            </button>
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
            <button type='button' className='ml-auto'>
              <Dots size={24} className='text-gray-b0 hover:opacity-80' />
            </button>
          </div>
          <div className='lg:flex-grow px-30px pb-14'>
            <div className='flex flex-col items-center space-y-30px md:space-y-0 md:grid md:grid-cols-2 md:gap-30px lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <NFTCard
                  key={i}
                  {...NFTCardProps}
                  className='max-w-sm md:max-w-full'
                />
              ))}
            </div>
          </div>
          <LinkSection to='#' absolute>
            Check NFT-art market
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
          <div className='flex-grow pl-8 pr-3.5 mr-18px h-0 overflow-auto'>
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
