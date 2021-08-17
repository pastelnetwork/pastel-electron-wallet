import React, { useState } from 'react'

import * as ROUTES from 'common/utils/constants/routes'
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

enum Tabs {
  feed,
  statistics,
}

const NFTMarketFeed = (): JSX.Element => {
  const currencyName = useCurrencyName()
  const mockCardProps: TNFTCard = {
    author: 'zndrson',
    avatarSrc: mockAvatarImagesList[0],
    imageSrc: mockDataImagesList[0].url,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName,
    title: 'Cosmic Perspective longname test',
    liked: true,
    followers: 256,
    isLastBid: false,
    detailUrl: ROUTES.PORTFOLIO_DETAIL,
    nsfw: { porn: 0, hentai: 0 },
    onSalePrice: Math.floor(Math.random() * 20000),
  }

  const [selectedItem, setSelectedItem] = useState(Tabs.feed)

  const mockCategories: TOption[] = [
    { value: 'all', label: 'All' },
    { value: 'illustration', label: 'Illustration' },
  ]

  const mockStatus: TOption[] = [
    { value: 'all', label: 'All' },
    { value: 'auctions', label: 'Auctions' },
    { value: 'makeAnOffers', label: 'Make an Offers' },
    { value: 'fixedPrice', label: 'Fixed Price' },
  ]

  const mockTime: TOption[] = [
    { value: 'Future', label: 'Future' },
    { value: 'Present', label: 'Present' },
    { value: 'Past', label: 'Past' },
  ]

  const mockRareness: TOption[] = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ]

  const mockNFTs: TNFTCard[] = Array.from({ length: 6 }).map((_, i) => {
    const nsfw = (i + 1) % 3 ? 0 : 100

    return {
      ...mockCardProps,
      onSale: Boolean(i % 2),
      isLastBid: Boolean(i % 3),
      nsfw: { porn: nsfw, hentai: nsfw },
      imageSrc: mockDataImagesList[i].url,
      avatarSrc: mockAvatarImagesList[i],
      author: mockNamesList[i],
      copies: `${i + 1} of 6`,
      diamond: `${Math.floor(Math.random() * 100)}%`,
      title: mockDataImagesList[i].title,
    }
  })

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [status, setStatus] = useState<TOption | null>(mockStatus[0])
  const [time, setTime] = useState<TOption | null>(mockTime[0])
  const [rareness, setRareness] = useState<TOption | null>(mockRareness[0])

  const filterOptions = [
    {
      label: 'Categories',
      selected: category,
      onChange: setCategory,
      options: mockCategories,
    },
    {
      label: 'Status',
      selected: status,
      onChange: setStatus,
      options: mockStatus,
    },
    {
      label: 'Time',
      selected: time,
      onChange: setTime,
      options: mockTime,
    },
    {
      label: 'Rareness',
      selected: rareness,
      onChange: setRareness,
      options: mockRareness,
    },
  ]

  const [range, setRange] = useState<[number, number]>([500, 700])
  const formatValue = (value: number) => `${value.toFixed(0)}k`

  const data = [{ label: 'Feed' }, { label: 'Statistics' }]

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: 'Market',
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

  return (
    <div className=''>
      <Breadcrumbs className='h-35px items-center' breadcrumbs={breadcrumbs} />
      <PageHeader title='Market' routes={routes} />
      <div className='wrapper content with-page-header h-full w-screen py-30px'>
        {/* Filters */}
        <div className='flex justify-between pb-50px'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3.5'>
            {filterOptions.map(option => (
              <Select {...option} key={option.label} />
            ))}
          </div>
          <div className='flex'>
            <div className='flex h-full items-center justify-end'>
              <p className='text-h6 px-22px text-gray-2d'>Price range:</p>
              <Slider
                min={0}
                max={999}
                values={range}
                onChange={setRange}
                formatValue={formatValue}
                formatTooltipValue={formatValue}
                step={1}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-10 text-gray-1a'>
          {mockNFTs.map((nft, i) => (
            <NFTCard
              {...nft}
              key={i}
              className='max-w-[318px] md:max-w-[250]px lg:max-w-[318px] xl:max-w-[364px]'
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NFTMarketFeed
