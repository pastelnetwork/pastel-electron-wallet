import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'

import { PORTFOLIO_DETAIL } from 'common/utils/constants/routes'
import NFTCard, { TNFTCard } from 'common/components/NFTCard'
import Select, { TOption } from 'common/components/Select/Select'
import Slider from 'common/components/Slider/Slider'
import PageHeader from 'common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from 'common/components/Breadcrumbs'
import { useCurrencyName } from 'common/hooks/appInfo'
import {
  mockDataImagesList,
  mockAvatarImagesList,
  mockNamesList,
} from 'features/members/data'
import { translate } from 'features/app/translations'

import styles from './NFTMarketFeed.module.css'

enum Tabs {
  feed,
  statistics,
}

export default function NFTMarketFeed(): JSX.Element {
  const currencyName = useCurrencyName()
  const mockCardProps: TNFTCard = {
    id: '1',
    author: 'zndrson',
    avatarSrc: mockAvatarImagesList[0],
    imageSrc: mockDataImagesList[0].url,
    likes: 23,
    price: 12000,
    currencyName,
    title: 'Cosmic Perspective longname test',
    followers: 256,
    detailUrl: PORTFOLIO_DETAIL,
    nsfw: { porn: 0, hentai: 0 },
  }

  const [selectedItem, setSelectedItem] = useState(Tabs.feed)

  const mockCategories: TOption[] = [
    { value: 'all', label: translate('all') },
    { value: 'illustration', label: translate('illustration') },
  ]

  const mockStatus: TOption[] = [
    { value: 'all', label: translate('all') },
    { value: 'auctions', label: translate('auction') },
    { value: 'makeAnOffers', label: translate('makeAnOffer') },
    { value: 'fixedPrice', label: translate('fixedPrice') },
  ]

  const mockTime: TOption[] = [
    { value: 'Future', label: translate('future') },
    { value: 'Present', label: translate('present') },
    { value: 'Past', label: translate('past') },
  ]

  const mockRareness: TOption[] = [
    { value: 'High', label: translate('high') },
    { value: 'Medium', label: translate('medium') },
    { value: 'Low', label: translate('low') },
  ]

  const mockNFTs: TNFTCard[] = Array.from({ length: 6 }).map((_, i) => {
    const nsfw = (i + 1) % 3 ? 0 : 100

    return {
      ...mockCardProps,
      id: i.toString(),
      nsfw: { porn: nsfw, hentai: nsfw },
      imageSrc: mockDataImagesList[i].url,
      avatarSrc: mockAvatarImagesList[i],
      author: mockNamesList[i],
      copies: translate('copiesValue', { number: i + 1, total: 7 }),
      diamond: `${Math.floor(Math.random() * 100)}%`,
      title: mockDataImagesList[i].title,
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: (i + 1) % 2 === 0,
      isFixedPrice: (i + 1) % 3 === 0 && (i + 1) % 2 !== 0,
      isNotForSale: (i + 1) % 2 !== 0 && (i + 1) % 3 !== 0,
    }
  })

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [status, setStatus] = useState<TOption | null>(mockStatus[0])
  const [time, setTime] = useState<TOption | null>(mockTime[0])
  const [rareness, setRareness] = useState<TOption | null>(mockRareness[0])

  const filterOptions = [
    {
      label: translate('categories'),
      selected: category,
      onChange: setCategory,
      options: mockCategories,
    },
    {
      label: translate('status'),
      selected: status,
      onChange: setStatus,
      options: mockStatus,
    },
    {
      label: translate('time'),
      selected: time,
      onChange: setTime,
      options: mockTime,
    },
    {
      label: translate('rareness'),
      selected: rareness,
      onChange: setRareness,
      options: mockRareness,
    },
  ]

  const [range, setRange] = useState<[number, number]>([500, 700])
  const formatValue = useCallback((value: number) => `${value.toFixed(0)}k`, [
    range,
  ])

  const data = [
    { label: translate('feed') },
    { label: translate('statistics') },
  ]

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: translate('market'),
      route: '#',
    },
    {
      label: data[selectedItem].label,
    },
  ]

  const routes = {
    data,
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  const renderNFTCards = () => (
    <div className='w-full'>
      <div
        className={`${styles.nftContent} overflow-y-auto overflow-x-hidden pl-27px pr-23px pb-26px grid grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-[24px] text-gray-1a`}
      >
        {mockNFTs.map(nft => (
          <NFTCard {...nft} key={nft.id} />
        ))}
      </div>
    </div>
  )

  const renderPriceRangeFilter = () => (
    <div className='flex'>
      <div className='flex h-full items-center justify-end'>
        <p className='text-base font-medium px-22px text-gray-4a'>
          {translate('priceRange')}:
        </p>
        <Slider
          min={0}
          max={999}
          values={range}
          onChange={setRange}
          formatValue={formatValue}
          formatTooltipValue={formatValue}
          step={1}
          hideLabel
        />
      </div>
    </div>
  )

  const renderFilters = () => (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3.5'>
      {filterOptions.map(option => (
        <Select {...option} key={option.label} className='bg-white' />
      ))}
    </div>
  )

  return (
    <div className=''>
      <Breadcrumbs className='h-35px items-center' breadcrumbs={breadcrumbs} />
      <PageHeader title={translate('market')} routes={routes} />
      <div className='wrapper px-33px py-30px'>
        {/* Filters */}
        <div className='flex justify-between px-27px pb-26px'>
          {renderFilters()}
          {renderPriceRangeFilter()}
        </div>
        {renderNFTCards()}
      </div>
    </div>
  )
}
