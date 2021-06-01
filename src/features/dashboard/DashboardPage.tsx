import React from 'react'
import Dots from '../../common/components/Icons/Dots'
import TransactionItem from './TransactionItem'
import PortfolioColumn from './PortfolioColumn'
import PortfolioItem from './PortfolioItem'
import NFTCard from './NFTCard'
import Notification from './Notification'

const transactions: { type: 'in' | 'out'; amount: string }[] = [
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
  { type: 'out', amount: '123,000 PSL' },
  { type: 'in', amount: '320,000 PSL' },
]

const notifications = [
  '1 new listing',
  '1 new sale',
  '1 new transfer',
  '1 new sale',
  '1 new listing',
  '1 new sale',
  '1 new transfer',
  '1 new sale',
]

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
          <div className='absolute left-0 bottom-0 right-6 text-center flex-center h-12 bg-gradient-to-b from-transparent via-white to-white'>
            <div className='text-blue-3f text-xs font-extrabold'>
              Wallet details
            </div>
          </div>
        </div>
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          <div className='md:flex-shrink-0 flex items-center h-6 px-6 mb-5'>
            <div className='font-extrabold text-gray-2d'>Portfolio</div>
            <div className='font-extrabold text-gray-a0 text-xs ml-3'>
              23 items
            </div>
            <Dots size={24} className='text-gray-b0 ml-auto' />
          </div>
          <div className='md:flex-grow w-full overflow-auto md:flex'>
            <PortfolioColumn title='Sales in progress'>
              <PortfolioItem />
              <PortfolioItem />
            </PortfolioColumn>
            <PortfolioColumn
              title='Sales in review'
              className='md:border-l md:border-r md:border-gray-e7'
            >
              <PortfolioItem />
            </PortfolioColumn>
            <PortfolioColumn title='On Sale'>
              <PortfolioItem />
              <PortfolioItem />
            </PortfolioColumn>
          </div>
          <div className='md:flex-shrink-0 h-12 flex-center'>
            <div className='text-blue-3f text-xs font-extrabold'>
              Portfolio details
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='h-380px' />
        <div className='paper pt-6 flex-grow md:flex md:flex-col relative w-0 mr-5 relative'>
          <div className='flex items-center h-6 mb-2.5 flex-shrink-0 px-30px'>
            <div className='font-extrabold text-gray-2d'>Trending NFTs</div>
            <div className='font-black text-gray-1d text-lg ml-2.5'>
              312,000 listed
            </div>
            <Dots size={24} className='text-gray-b0 ml-auto' />
          </div>
          <div className='md:flex-grow md:overflow-auto px-30px pb-10'>
            <div className='flex flex-col items-center space-y-30px md:space-y-0 md:grid md:grid-flow-col md:gap-30px'>
              {new Array(3).fill(null).map((_, i) => (
                <NFTCard key={i} />
              ))}
            </div>
          </div>
          <div className='h-10 flex-center absolute left-0 right-0 bottom-0'>
            <div className='text-blue-3f text-xs font-extrabold'>
              Check your NFT feed
            </div>
          </div>
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
            {notifications.map((message, i) => (
              <Notification key={i} message={message} />
            ))}
          </div>
          <div className='text-center flex-center h-10 bg-gradient-to-b from-transparent via-white to-white'>
            <div className='text-blue-3f text-xs font-extrabold'>
              Check all notifications
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
