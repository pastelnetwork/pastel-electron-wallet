import React, { useState, useEffect } from 'react'
import TransactionItem, { TTransactionItemProps } from './TransactionItem'
import PortfolioColumn from './PortfolioColumn'
import PortfolioItem, { TPortfolioItemProps } from './PortfolioItem'
import NFTCard, { TNFTCard } from '../../common/components/NFTCard'
import Notification from './Notification'
import LinkSection from './LinkSection'
import dayjs, { Dayjs } from 'dayjs'

import * as ROUTES from 'common/utils/constants/routes'
import { useAppSelector } from 'redux/hooks'
import smallImage from '../../common/assets/images/mock/small-image.png'
import avatar from '../../common/assets/images/avatar-placeholder.png'
import image from '../../common/assets/images/nft-card-placeholder.png'
import { formatNumber } from '../../common/utils/format'
import Radio from 'common/components/Radio'
import NotificationModal from './dashboardModals/notificationModal'
import Link from 'common/components/Link'
import notificationData from './dashboardModals/notificationModal.data'

const date = dayjs('2021-04-04')

const walletBalance = 32000

enum Tabs {
  Creators,
  Nfts,
}

type TNotification = {
  message: string
  date: Dayjs
  read: boolean
}

let notifications: Array<TNotification> = [
  {
    message: '1 new listing',
    date,
    read: false,
  },
  {
    message: '1 new sale',
    date,
    read: true,
  },
  {
    message: '1 new transfer',
    date,
    read: true,
  },
  {
    message: '1 new sale',
    date,
    read: true,
  },
]
notifications = [...notifications, ...notifications, ...notifications]

export default function DashboardPage(): JSX.Element {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)

  const [cards, setCards] = useState<TNFTCard[]>([])
  const [tab, setTab] = useState<number>(0)
  const [openNotificationModal, setOpenNotificationModal] = useState(false)
  useEffect(() => {
    const randomCards: TNFTCard[] = []
    Array.from({ length: 3 }).map((_, index) => {
      randomCards.push({
        imageSrc: image,
        likes: 23,
        title: 'Cosmic Perspective',
        liked: false,
        author: 'zndrson',
        avatarSrc: avatar,
        onSale: false,
        price: '222K',
        currencyName,
        percentage: 75,
        variant: 'portfolio',
        isLastBid: [true, false][Math.floor(Math.random() * 2)],
        hideLikeButton: true,
        hideFollow: true,
        hideUnFollow: index % 3 === 0 ? false : true,
        detailUrl: ROUTES.PORTFOLIO_DETAIL,
        nsfw: { porn: 0, hentai: 0 },
      })
    })
    setCards(randomCards)
  }, [])

  const followers: Array<TPortfolioItemProps> = [
    {
      image: smallImage,
      title: 'Cosmic Perspective',
      author: '@zndrson',
      price: 5000,
      currencyName,
      type: 'progress',
    },
    {
      image: smallImage,
      title: 'Cosmic Perspective',
      author: '@zndrson',
      price: 5000,
      currencyName,
      type: 'progress',
    },
    {
      image: smallImage,
      title: 'Cosmic Perspective',
      author: '@zndrson',
      price: 5000,
      currencyName,
      type: 'review',
    },
    {
      image: smallImage,
      title: 'Cosmic Perspective',
      author: '@zndrson',
      price: 5000,
      currencyName,
      type: 'sale',
    },
    {
      image: smallImage,
      title: 'Cosmic Perspective',
      author: '@zndrson',
      price: 5000,
      currencyName,
      type: 'sale',
    },
  ]

  const transactions: TTransactionItemProps[] = [
    { type: 'in', amount: 320000, date, currencyName },
    { type: 'out', amount: 123000, date, currencyName },
    { type: 'in', amount: 320000, date, currencyName },
    { type: 'out', amount: 123000, date, currencyName },
    { type: 'in', amount: 320000, date, currencyName },
    { type: 'out', amount: 123000, date, currencyName },
    { type: 'in', amount: 320000, date, currencyName },
  ]

  return (
    <div className='page-container py-5 w-full max-w-screen-xl mx-auto'>
      <div className='flex mb-5'>
        <div className='paper pt-6 pb-5 w-335px flex flex-col relative h-[388px]'>
          <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
            <div className='font-extrabold text-gray-2d text-lg'>
              Wallet balance
            </div>
            <div className='font-extrabold text-gray-2d text-sm'>
              {formatNumber(walletBalance)} {currencyName}
            </div>
          </div>
          <div className='pl-[30px] pr-4 mr-14px overflow-auto h-[252px]'>
            {transactions.map((transaction, i) => (
              <TransactionItem key={i} {...transaction} />
            ))}
            {transactions.length === 0 && (
              <div className='flex justify-center mt-[111px]'>
                <span className='text-base text-gray-a0'>You have no PSL</span>
              </div>
            )}
          </div>
          <LinkSection to={ROUTES.WALLET} absolute gradient>
            Wallet Details
          </LinkSection>
        </div>
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          <div className='md:flex-shrink-0 flex items-center h-6 px-[30px] mb-5'>
            <div className='font-extrabold text-lg text-gray-2d'>Portfolio</div>
            <div className='font-medium text-gray-a0 text-sm ml-2 mt-px'>
              23 items
            </div>
          </div>
          {followers.length > 0 && (
            <div className='grid md:grid-cols-3 gap-[26px] md:flex px-[30px] h-[282px] overflow-auto'>
              <PortfolioColumn title='Sales in progress (2)'>
                {followers
                  .filter(item => item.type == 'progress')
                  .map((item, index) => (
                    <PortfolioItem key={index} {...item} />
                  ))}
              </PortfolioColumn>
              <PortfolioColumn title='In review (1)'>
                {followers
                  .filter(item => item.type == 'review')
                  .map((item, index) => (
                    <PortfolioItem key={index} {...item} />
                  ))}
              </PortfolioColumn>
              <PortfolioColumn title='On Sale (2)'>
                {followers
                  .filter(item => item.type == 'sale')
                  .map((item, index) => (
                    <PortfolioItem key={index} {...item} />
                  ))}
              </PortfolioColumn>
            </div>
          )}
          {followers.length == 0 && (
            <div className='h-[282px]'>
              <div className='flex justify-center mt-[111px]'>
                <span className='text-base text-gray-a0'>
                  You have no Followers
                </span>
              </div>
            </div>
          )}
          <LinkSection className='' to={ROUTES.PORTFOLIO}>
            Show more
          </LinkSection>
        </div>
      </div>
      <div className='flex'>
        <div className='paper pt-6 flex-grow lg:flex lg:flex-col w-0 mr-5 relative max-w-[850px]'>
          <div className='flex items-center h-6 mb-4 flex-shrink-0 px-30px justify-between'>
            <div className='flex'>
              <div className='font-extrabold text-gray-2d text-lg'>
                Trending NFTs
              </div>
              <div className='font-medium text-gray-a0 text-sm ml-2 mt-1'>
                312,000 listed
              </div>
            </div>
            <div className='flex items-center'>
              <div className='mr-6'>
                <Radio
                  checked={tab === Tabs.Creators}
                  onChange={param => {
                    param && setTab(0)
                  }}
                  labelClassName='text-sm ml-3'
                >
                  Creators
                </Radio>
              </div>
              <Radio
                checked={tab === Tabs.Nfts}
                onChange={param => {
                  param && setTab(1)
                }}
                labelClassName='text-sm ml-3'
              >
                Nfts
              </Radio>
            </div>
          </div>
          <div className='lg:flex-grow px-30px pb-7'>
            <div
              className={
                cards.length > 0
                  ? 'flex flex-col items-center space-y-30px md:space-y-0 md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3'
                  : 'flex justify-center'
              }
            >
              {cards.map((item, i) => (
                <NFTCard
                  key={i}
                  {...item}
                  className='max-w-sm md:max-w-full min-[250px] min-h-[372px]'
                />
              ))}
              {cards.length === 0 && (
                <div className='text-gray-a0 text-base mt-[146px]'>
                  You have no NFTs
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='paper pt-6 w-419px min-h-[458px] flex-shrink-0 flex flex-col relative md:w-[451px]'>
          <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
            <div className='font-extrabold text-lg text-gray-2d'>
              Latest Notifications
            </div>
            <div className='font-medium text-gray-a0 text-sm'>1 unread</div>
          </div>
          <div
            className={
              notifications.length > 0
                ? 'pl-8 pr-3.5 mr-18px overflow-y-auto h-full md:h-[258px]'
                : 'flex justify-center'
            }
          >
            {notifications.map((notification, i) => (
              <Notification key={i} {...notification} className='h-[52px]' />
            ))}
            {notifications.length === 0 && (
              <div className='text-gray-a0 text-base mt-[146px]'>
                You have no Notifications
              </div>
            )}
          </div>
          <div className='pt-4 pb-4 text-center rounded-b-md leading-none absolute bottom-0 w-full'>
            <Link
              onClick={() => setOpenNotificationModal(true)}
              className='text-blue-3f text-sm font-medium inline-block h-3'
            >
              Check All Notifications
            </Link>
          </div>
        </div>
      </div>
      <NotificationModal
        isOpen={openNotificationModal}
        notifications={notificationData}
        handleClose={() => setOpenNotificationModal(false)}
      />
    </div>
  )
}
