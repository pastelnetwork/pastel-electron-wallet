import React, { useState, useMemo, useCallback } from 'react'
import dayjs, { Dayjs } from 'dayjs'

import PortfolioColumn from './PortfolioColumn'
import PortfolioItem, { TPortfolioItemProps } from './PortfolioItem'
import NFTCard, {
  TNFTCard,
  NFTCardVariantSize,
} from 'common/components/NFTCard'
import Notification from './Notification'
import LinkSection from './LinkSection'
import { useCurrencyName } from 'common/hooks/appInfo'
import * as ROUTES from 'common/utils/constants/routes'
import Radio from 'common/components/Radio'
import NotificationModal from './dashboardModals/notificationModal'
import Link from 'common/components/Link'
import notificationData from './dashboardModals/notificationModal.data'
import {
  mockDataImagesList,
  mockAvatarImagesList,
  mockNamesList,
} from 'features/members/data'
import Wallet from './Wallet'
import { translate } from 'features/app/translations'

const date = dayjs('2021-04-04')

enum Tabs {
  Creators,
  NFTs,
}

type TNotification = {
  id: string
  message: string
  date: Dayjs
  read: boolean
}

const mockNFTImagesList = [
  'https://lh3.googleusercontent.com/Y7jfdFlKEjQ2PfuGb9vFAgzvXqyynJjx2RbetMBfrHDiRg8cSPhWOf9JQOkkZzTkA86rkHpeNmfQoT5zLhqYlWj3izIfgxMWqOk3Oz4=w526',
  'https://lh3.googleusercontent.com/7QfQI8BYm_8_VMyCsBQo8vl7m4YwcAS66IpsGVtzy-hLp0Zej0vYca4eospy7HDVUbxJS-Hh2e4K_Mi91fpTUqaPT1I5-UspbtDKEw=w526',
  'https://lh3.googleusercontent.com/bXQB1peyRGOkWqjucQg_2Q-j90EoNv_aFq0raZRo-ooZ012dwrfa-J10XDKnVI57at1Py92LwRydAieb3PuIlvej3SDDHUox6v0y=w461',
]

export default function DashboardPage(): JSX.Element {
  const notifications: Array<TNotification> = [
    {
      id: '1',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '2',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '3',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '4',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '5',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '6',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '7',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '8',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '9',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '10',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '11',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '12',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '13',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '14',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '15',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '16',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '17',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '18',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '19',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '20',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '21',
      message: translate('notificationNewListing', { number: 1 }),
      date,
      read: false,
    },
    {
      id: '22',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '23',
      message: translate('notificationNewTransfer', { number: 1 }),
      date,
      read: true,
    },
    {
      id: '24',
      message: translate('notificationNewSale', { number: 1 }),
      date,
      read: true,
    },
  ]

  const currencyName = useCurrencyName()

  const [tab, setTab] = useState<number>(0)
  const [openNotificationModal, setOpenNotificationModal] = useState(false)

  const cards: TNFTCard[] = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, index) => ({
        id: index.toString(),
        imageSrc: mockNFTImagesList[index],
        likes: 23,
        title: mockDataImagesList[index].title,
        author: mockNamesList[index],
        avatarSrc: mockAvatarImagesList[index],
        price: 12000,
        currencyName,
        detailUrl: ROUTES.PORTFOLIO_DETAIL,
        nsfw: { porn: 0, hentai: 0 },
        copies: translate('copiesValue', { number: index + 1, total: 3 }),
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
      })),
    [],
  )

  const followers: Array<TPortfolioItemProps> = [
    {
      image: mockAvatarImagesList[0],
      title: mockDataImagesList[0].title,
      author: mockNamesList[0],
      price: Math.floor(Math.random() * 10000),
      type: 'progress',
    },
    {
      image: mockAvatarImagesList[1],
      title: mockDataImagesList[1].title,
      author: mockNamesList[1],
      price: Math.floor(Math.random() * 1000),
      type: 'progress',
    },
    {
      image: mockAvatarImagesList[2],
      title: mockDataImagesList[2].title,
      author: mockNamesList[2],
      price: Math.floor(Math.random() * 1000),
      type: 'review',
    },
    {
      image: mockAvatarImagesList[3],
      title: mockDataImagesList[3].title,
      author: mockNamesList[3],
      price: Math.floor(Math.random() * 1000),
      type: 'sale',
    },
    {
      image: mockAvatarImagesList[4],
      title: mockDataImagesList[4].title,
      author: mockNamesList[4],
      price: Math.floor(Math.random() * 1000),
      type: 'sale',
    },
    {
      image: mockAvatarImagesList[5],
      title: mockDataImagesList[5].title,
      author: mockNamesList[5],
      price: Math.floor(Math.random() * 1000),
      type: 'sale',
    },
  ]

  const handleNFTChange = useCallback(() => {
    setTab(1)
  }, [])

  const handleCreatorsChange = useCallback(() => {
    setTab(0)
  }, [])

  const handleShowNotificationModal = useCallback(() => {
    setOpenNotificationModal(true)
  }, [])

  const handleCloseNotificationModal = useCallback(() => {
    setOpenNotificationModal(false)
  }, [])

  const renderNofications = () => (
    <div className='paper pt-6 w-419px min-h-[458px] flex-shrink-0 flex flex-col relative md:w-[451px]'>
      <div className='flex items-center justify-between h-6 mb-4 flex-shrink-0 px-8'>
        <div className='font-extrabold text-lg text-gray-2d'>
          {translate('latestNotifications')}
        </div>
        <div className='font-medium text-gray-a0 text-sm'>
          1 {translate('unread')}
        </div>
      </div>
      <div
        className={
          notifications.length > 0
            ? 'pl-8 pr-3.5 mr-18px overflow-y-auto h-full max-h-[1360px] md:max-h-[970px] xl:max-h-[460px]'
            : 'flex justify-center'
        }
      >
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            className='h-[52px]'
          />
        ))}
        {notifications.length === 0 && (
          <div className='text-gray-a0 text-base mt-[146px]'>
            {translate('youHaveNoNotifications')}
          </div>
        )}
      </div>
      <div className='pt-4 pb-4 text-center rounded-b-md leading-none absolute bottom-0 w-full'>
        <Link
          onClick={handleShowNotificationModal}
          className='text-blue-3f text-sm font-medium inline-block h-3'
        >
          {translate('checkAllNotifications')}
        </Link>
      </div>
    </div>
  )

  const renderTrendingNFTsControl = () => (
    <div className='flex items-center'>
      <div className='mr-6'>
        <Radio
          checked={tab === Tabs.Creators}
          onChange={handleCreatorsChange}
          labelClassName='text-sm ml-3'
        >
          {translate('creators')}
        </Radio>
      </div>
      <Radio
        checked={tab === Tabs.NFTs}
        onChange={handleNFTChange}
        labelClassName='text-sm ml-3'
      >
        {translate('NFTs')}
      </Radio>
    </div>
  )

  const renderTrendingNFTsInfo = () => (
    <div className='flex items-center'>
      <div className='font-extrabold text-gray-2d text-lg leading-6'>
        {translate('trendingNFTs')}
      </div>
      <div className='font-medium text-gray-a0 text-sm ml-2'>
        312,000 {translate('listed')}
      </div>
    </div>
  )

  const renderTrendingNFTs = () => (
    <div className='paper pt-6 flex-grow lg:flex lg:flex-col w-0 mr-5 relative'>
      <div className='flex items-center h-6 mb-30px flex-shrink-0 px-30px justify-between'>
        {renderTrendingNFTsInfo()}
        {renderTrendingNFTsControl()}
      </div>
      <div className='lg:flex-grow px-30px pb-7'>
        <div
          className={
            cards.length > 0
              ? 'flex flex-col items-center space-y-30px md:space-y-0 md:grid grid-cols-1 md:grid-cols-2 md:gap-5 xl:grid-cols-3'
              : 'flex justify-center'
          }
        >
          {cards.map(item => (
            <NFTCard key={item.id} {...item} variant={NFTCardVariantSize.M} />
          ))}
          {cards.length === 0 && (
            <div className='text-gray-a0 text-base mt-[146px]'>
              {translate('youHaveNoNFTs')}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderShowMorePortfolioLink = () => (
    <LinkSection className='' to={ROUTES.PORTFOLIO}>
      {translate('showMore')}
    </LinkSection>
  )

  const renderPortfolioHeader = () => (
    <div className='md:flex-shrink-0 flex items-center h-6 px-[30px] mb-5'>
      <div className='font-extrabold text-lg text-gray-2d'>
        {translate('portfolio')}
      </div>
      <div className='font-medium text-gray-a0 text-sm ml-2 mt-px'>
        23 {translate('items')}
      </div>
    </div>
  )

  return (
    <div className='wrapper content with-page-header h-full w-screen py-5 max-w-screen-2xl'>
      <div className='flex mb-5'>
        <Wallet />
        <div className='paper flex-grow w-0 ml-5 pt-6 relative md:flex md:flex-col'>
          {renderPortfolioHeader()}
          {followers.length > 0 && (
            <div className='grid md:grid-cols-3 gap-[26px] md:flex pl-[30px] pr-14px h-[282px] overflow-auto mr-18px'>
              <PortfolioColumn title={`${translate('salesInProgress')} (2)`}>
                {followers
                  .filter(item => item.type == 'progress')
                  .map(item => {
                    const title: string = item.title || ''
                    const type: string = item.type || ''
                    return <PortfolioItem key={`${title}-${type}`} {...item} />
                  })}
              </PortfolioColumn>
              <PortfolioColumn title={`${translate('items')} (1)`}>
                {followers
                  .filter(item => item.type == 'review')
                  .map(item => {
                    const title: string = item.title || ''
                    const type: string = item.type || ''
                    return <PortfolioItem key={`${title}-${type}`} {...item} />
                  })}
              </PortfolioColumn>
              <PortfolioColumn title={`${translate('salesInProgress')} (2)`}>
                {followers
                  .filter(item => item.type == 'sale')
                  .map(item => {
                    const title: string = item.title || ''
                    const type: string = item.type || ''
                    return <PortfolioItem key={`${title}-${type}`} {...item} />
                  })}
              </PortfolioColumn>
            </div>
          )}
          {followers.length == 0 && (
            <div className='h-[282px]'>
              <div className='flex justify-center mt-[111px]'>
                <span className='text-base text-gray-a0'>
                  {translate('youHaveNoFollowers')}
                </span>
              </div>
            </div>
          )}
          {renderShowMorePortfolioLink()}
        </div>
      </div>
      <div className='flex'>
        {renderTrendingNFTs()}
        {renderNofications()}
      </div>
      <NotificationModal
        isOpen={openNotificationModal}
        notifications={notificationData}
        handleClose={handleCloseNotificationModal}
      />
    </div>
  )
}
