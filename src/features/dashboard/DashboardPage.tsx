import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import TransactionItem, { TTransactionItemProps } from './TransactionItem'
import PortfolioColumn from './PortfolioColumn'
import PortfolioItem, { TPortfolioItemProps } from './PortfolioItem'
import NFTCard, {
  TNFTCard,
  NFTCardVariantSize,
} from '../../common/components/NFTCard'
import Notification from './Notification'
import LinkSection from './LinkSection'
import { useCurrencyName } from 'common/hooks/appInfo'
import { WalletRPC, TransactionRPC } from 'api/pastel-rpc'
import { TTotalBalance, TTransactionType } from 'types/rpc'
import * as ROUTES from 'common/utils/constants/routes'
import { formatNumber } from '../../common/utils/format'
import Radio from 'common/components/Radio'
import NotificationModal from './dashboardModals/notificationModal'
import Link from 'common/components/Link'
import notificationData from './dashboardModals/notificationModal.data'
import {
  mockDataImagesList,
  mockAvatarImagesList,
  mockNamesList,
} from 'features/members/data'

const date = dayjs('2021-04-04')

enum Tabs {
  Creators,
  NFTs,
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
notifications = [
  ...notifications,
  ...notifications,
  ...notifications,
  ...notifications,
  ...notifications,
  ...notifications,
  ...notifications,
]

const mockNFTImagesList = [
  'https://lh3.googleusercontent.com/Y7jfdFlKEjQ2PfuGb9vFAgzvXqyynJjx2RbetMBfrHDiRg8cSPhWOf9JQOkkZzTkA86rkHpeNmfQoT5zLhqYlWj3izIfgxMWqOk3Oz4=w526',
  'https://lh3.googleusercontent.com/7QfQI8BYm_8_VMyCsBQo8vl7m4YwcAS66IpsGVtzy-hLp0Zej0vYca4eospy7HDVUbxJS-Hh2e4K_Mi91fpTUqaPT1I5-UspbtDKEw=w526',
  'https://lh3.googleusercontent.com/bXQB1peyRGOkWqjucQg_2Q-j90EoNv_aFq0raZRo-ooZ012dwrfa-J10XDKnVI57at1Py92LwRydAieb3PuIlvej3SDDHUox6v0y=w461',
]

export default function DashboardPage(): JSX.Element {
  const currencyName = useCurrencyName()

  const [cards, setCards] = useState<TNFTCard[]>([])
  const [tab, setTab] = useState<number>(0)
  const [openNotificationModal, setOpenNotificationModal] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const [transactions, setTransactions] = useState<TTransactionItemProps[]>([])
  const [walletLoading, setWalletLoading] = useState(true)

  useEffect(() => {
    const randomCards: TNFTCard[] = []
    Array.from({ length: 3 }).map((_, index) => {
      randomCards.push({
        imageSrc: mockNFTImagesList[index],
        likes: 23,
        title: mockDataImagesList[index].title,
        author: mockNamesList[index],
        avatarSrc: mockAvatarImagesList[index],
        price: 12000,
        currencyName,
        detailUrl: ROUTES.PORTFOLIO_DETAIL,
        nsfw: { porn: 0, hentai: 0 },
        copies: `${index + 1} of 3`,
        diamond: `${Math.floor(Math.random() * 100)}%`,
        hideGreenNF: index !== 0,
        hidePerpetualRoyalty: index !== 0,
        hideCertifiedRare: true,
        hideDirectFromArtist: index !== 1,
        leftTime: dayjs().add(3, 'day').valueOf(),
        copiesAvailable: 15,
        isAuctionBid: index === 0,
        isFixedPrice: index === 1,
        isNotForSale: index === 2,
      })
    })
    setCards(randomCards)

    const fetchData = async () => {
      const walletRPC = new WalletRPC()
      const transactionRPC = new TransactionRPC()
      const results = await Promise.all([
        await walletRPC.fetchTotalBalance(),
        await transactionRPC.fetchTandZTransactions(),
      ])
      const balances: TTotalBalance = results[0]
      const trans = results[1]
      setWalletBalance(balances.total)
      const transactionsData: TTransactionItemProps[] = trans.map(
        transaction => ({
          type: (transaction.type as TTransactionType) || TTransactionType.ALL,
          amount: transaction.amount || 0,
          date: dayjs.unix(transaction.time).format('DD/MM/YY'),
        }),
      )
      setWalletLoading(false)
      setTransactions(transactionsData)
    }

    fetchData()
  }, [])

  const followers: Array<TPortfolioItemProps> = [
    {
      image: mockAvatarImagesList[0],
      title: mockDataImagesList[0].title,
      author: mockNamesList[0],
      price: Math.floor(Math.random() * 10000),
      currencyName,
      type: 'progress',
    },
    {
      image: mockAvatarImagesList[1],
      title: mockDataImagesList[1].title,
      author: mockNamesList[1],
      price: Math.floor(Math.random() * 1000),
      currencyName,
      type: 'progress',
    },
    {
      image: mockAvatarImagesList[2],
      title: mockDataImagesList[2].title,
      author: mockNamesList[2],
      price: Math.floor(Math.random() * 1000),
      currencyName,
      type: 'review',
    },
    {
      image: mockAvatarImagesList[3],
      title: mockDataImagesList[3].title,
      author: mockNamesList[3],
      price: Math.floor(Math.random() * 1000),
      currencyName,
      type: 'sale',
    },
    {
      image: mockAvatarImagesList[4],
      title: mockDataImagesList[4].title,
      author: mockNamesList[4],
      price: Math.floor(Math.random() * 1000),
      currencyName,
      type: 'sale',
    },
    {
      image: mockAvatarImagesList[5],
      title: mockDataImagesList[5].title,
      author: mockNamesList[5],
      price: Math.floor(Math.random() * 1000),
      currencyName,
      type: 'sale',
    },
  ]

  return (
    <div className='wrapper content with-page-header h-full w-screen py-5 max-w-screen-2xl'>
      <div className='flex mb-5'>
        <div className='paper pt-6 pb-5 w-335px flex flex-col relative h-[388px]'>
          <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
            {!walletLoading ? (
              <>
                <div className='font-extrabold text-gray-2d text-lg'>
                  Wallet balance
                </div>
                <div className='font-extrabold text-gray-2d text-sm'>
                  {walletBalance > 0 ? formatNumber(walletBalance) : 0}{' '}
                  {currencyName}
                </div>
              </>
            ) : null}
          </div>
          <div className='pl-[30px] pr-4 mr-14px overflow-auto h-[252px]'>
            {walletLoading ? (
              <div className='flex items-center justify-center h-full h4_18_24_medium'>
                Loading ....
              </div>
            ) : (
              <>
                {transactions.map((transaction, i) => (
                  <TransactionItem key={i} {...transaction} />
                ))}
                {transactions.length === 0 && (
                  <div className='flex justify-center mt-[111px]'>
                    <span className='text-base text-gray-a0'>
                      You have no {currencyName}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          {!walletLoading ? (
            <LinkSection to={ROUTES.WALLET} absolute gradient>
              Wallet Details
            </LinkSection>
          ) : null}
        </div>
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          <div className='md:flex-shrink-0 flex items-center h-6 px-[30px] mb-5'>
            <div className='font-extrabold text-lg text-gray-2d'>Portfolio</div>
            <div className='font-medium text-gray-a0 text-sm ml-2 mt-px'>
              23 items
            </div>
          </div>
          {followers.length > 0 && (
            <div className='grid md:grid-cols-3 gap-[26px] md:flex pl-[30px] pr-14px h-[282px] overflow-auto mr-18px'>
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
        <div className='paper pt-6 flex-grow lg:flex lg:flex-col w-0 mr-5 relative'>
          <div className='flex items-center h-6 mb-30px flex-shrink-0 px-30px justify-between'>
            <div className='flex items-center'>
              <div className='font-extrabold text-gray-2d text-lg leading-6'>
                Trending NFTs
              </div>
              <div className='font-medium text-gray-a0 text-sm ml-2'>
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
                checked={tab === Tabs.NFTs}
                onChange={param => {
                  param && setTab(1)
                }}
                labelClassName='text-sm ml-3'
              >
                NFTs
              </Radio>
            </div>
          </div>
          <div className='lg:flex-grow px-30px pb-7'>
            <div
              className={
                cards.length > 0
                  ? 'flex flex-col items-center space-y-30px md:space-y-0 md:grid grid-cols-1 md:grid-cols-2 md:gap-5 xl:grid-cols-3'
                  : 'flex justify-center'
              }
            >
              {cards.map((item, i) => (
                <NFTCard key={i} {...item} variant={NFTCardVariantSize.M} />
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
                ? 'pl-8 pr-3.5 mr-18px overflow-y-auto h-full max-h-[1360px] md:max-h-[970px] xl:max-h-[460px]'
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
