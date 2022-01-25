import React, { useCallback, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

import PageHeader from 'common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from 'common/components/Breadcrumbs'
import { TPageHeaderSortByOptions } from 'common/components/PageHeader/PageHeader'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard, {
  TNFTCard,
  NFTCardVariantSize,
} from 'common/components/NFTCard'
import Slider from 'common/components/Slider/Slider'
import * as ROUTES from 'common/utils/constants/routes'
import { useCurrencyName } from 'common/hooks/appInfo'
import { translate } from 'features/app/translations'

import styles from './Portfolio.module.css'

import avatar from 'common/assets/images/avatar-placeholder.png'
import portfolio1 from 'common/assets/images/mock/portfolio-1.jpg'
import portfolio2 from 'common/assets/images/mock/portfolio-2.jpg'
import portfolio3 from 'common/assets/images/mock/portfolio-3.jpg'
import portfolio4 from 'common/assets/images/mock/portfolio-4.jpg'

import {
  mockDataImagesList,
  mockAvatarImagesList,
  mockNamesList,
} from 'features/members/data'

const portfolios = [portfolio1, portfolio2, portfolio3, portfolio4]

export default function Portfolio(): JSX.Element {
  const currencyName = useCurrencyName()

  const mockOptions: TOption[] = [
    { value: 'Likes', label: translate('likes') },
    { value: 'Categories', label: translate('categories') },
  ]

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

  const mockBreadcrumbs: TBreadcrumb[] = [
    {
      label: translate('portfolio'),
      route: '#',
    },
    {
      label: translate('myNFTPortfolio'),
      route: '#',
    },
    {
      label: '',
    },
  ]

  const mockupPortfolio: TNFTCard[] = []
  Array.from({ length: 26 }).map((_, index) => {
    mockupPortfolio.push({
      id: index.toString(),
      author: mockNamesList[index],
      avatarSrc: mockAvatarImagesList[index],
      imageSrc: mockDataImagesList[index].url,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: mockDataImagesList[index].title,
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      copies: translate('copiesValue', { number: index + 1, total: 26 }),
      diamond: `${Math.floor(Math.random() * 100)}%`,
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: (index + 1) % 2 === 0,
      isFixedPrice: (index + 1) % 3 === 0 && (index + 1) % 2 !== 0,
      isNotForSale: (index + 1) % 2 !== 0 && (index + 1) % 3 !== 0,
    })
  })

  const mockupPortfolioOwned: TNFTCard[] = [
    {
      id: uuidv4(),
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio1,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      copies: translate('copiesValue', { number: 1, total: 260 }),
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: true,
    },
    {
      id: uuidv4(),
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio2,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: translate('copiesValue', { number: 1, total: 260 }),
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(3, 'day').valueOf(),
      copiesAvailable: 15,
      isNotForSale: true,
    },
  ]

  const mockupPortfolioSold: TNFTCard[] = [
    {
      id: uuidv4(),
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio3,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: translate('copiesValue', { number: 1, total: 260 }),
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(5, 'day').valueOf(),
      copiesAvailable: 15,
      isFixedPrice: true,
    },
    {
      id: uuidv4(),
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolio4,
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: translate('copiesValue', { number: 1, total: 260 }),
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(1, 'day').valueOf(),
      copiesAvailable: 15,
      isNotForSale: true,
    },
  ]

  const mockupPortfolioLiked: TNFTCard[] = []
  Array.from({ length: 32 }).map((_, index) => {
    const randomPortfolioIndex = Math.floor(Math.random() * 4)
    mockupPortfolioLiked.push({
      id: uuidv4(),
      author: 'zndrson',
      avatarSrc: avatar,
      imageSrc: portfolios[randomPortfolioIndex],
      likes: 23,
      price: 12000,
      followers: 10,
      currencyName,
      title: 'Cosmic Perspective longname test',
      copies: translate('copiesValue', { number: 1, total: 260 }),
      detailUrl: ROUTES.PORTFOLIO_DETAIL,
      nsfw: { porn: 0, hentai: 0 },
      leftTime: dayjs().add(2, 'day').valueOf(),
      copiesAvailable: 15,
      isAuctionBid: (index + 1) % 2 === 0,
      isFixedPrice: (index + 1) % 3 === 0 && (index + 1) % 2 !== 0,
      isNotForSale: (index + 1) % 2 !== 0 && (index + 1) % 3 !== 0,
    })
  })

  const [selectedItem, setSelectedItem] = useState(0)
  const [filter, setFilter] = useState<TOption | null>(null)
  const [likes, setLikes] = useState<TOption | null>(null)
  const [breadcrumbs, setBreadcrumbs] = useState(mockBreadcrumbs)
  const [cards, setCards] = useState<TNFTCard[]>([])

  const pageHeaderSortByOptions: TPageHeaderSortByOptions[] = [
    {
      placeholder: `${translate('inReview')} (87)`,
      selected: filter,
      onOptionChange: setFilter,
      options: mockOptions,
    },
  ]

  const sortByOptions: TPageHeaderSortByOptions = {
    placeholder: translate('likes'),
    selected: likes,
    onOptionChange: setLikes,
    options: mockOptions,
  }

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [type, settType] = useState<TOption | null>(mockStatus[0])
  const [time, setTime] = useState<TOption | null>(mockTime[0])

  const filterOptions = [
    {
      label: translate('categories'),
      selected: category,
      onChange: setCategory,
      options: mockCategories,
      selectClassName: 'bg-white min-w-171px',
    },
    {
      label: translate('type'),
      selected: type,
      onChange: settType,
      options: mockStatus,
      selectClassName: 'bg-white min-w-171px',
    },
    {
      label: translate('time'),
      selected: time,
      onChange: setTime,
      options: mockTime,
      selectClassName: 'bg-white min-w-171px',
    },
  ]

  const routes = {
    data: [
      {
        label: translate('creator'),
        count: mockupPortfolio.length,
      },
      {
        label: translate('sold'),
        count: mockupPortfolioSold.length,
      },
      {
        label: translate('owned'),
        count: mockupPortfolioOwned.length,
      },
      {
        label: translate('liked'),
        count: mockupPortfolioLiked.length,
      },
    ],
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  useEffect(() => {
    const updatedbreadcrumbs = [...breadcrumbs]
    updatedbreadcrumbs[2].label = routes.data[selectedItem].label
    setBreadcrumbs(updatedbreadcrumbs)

    switch (selectedItem) {
      case 1:
        setCards(mockupPortfolioOwned)
        break
      case 2:
        setCards(mockupPortfolioSold)
        break
      case 3:
        setCards(mockupPortfolioLiked)
        break
      default:
        setCards(mockupPortfolio)
    }
  }, [selectedItem])

  const [range, setRange] = useState<[number, number]>([400, 700])
  const [rarenessRange, setRarenessRange] = useState<[number, number]>([0, 1])
  const formatValue = useCallback((value: number) => `${value.toFixed(0)}k`, [
    range,
    rarenessRange,
  ])
  const formatRarenessValue = useCallback(
    (value: number) => `${value.toFixed(1)}`,
    [rarenessRange],
  )

  const handleLikeOptionChange = useCallback(
    (val: TOption | null) => {
      setLikes(val)
    },
    [likes],
  )

  const renderNFTCards = () => (
    <div className='w-full'>
      <div
        className={`${styles.portfolioContent} overflow-y-auto pl-27px pr-23px pb-30px mt-30px`}
      >
        <div className='grid grid-cols-3 1200px:grid-cols-4 xl:grid-cols-5 gap-y-[21px] gap-4'>
          {cards.map(nftItem => (
            <NFTCard
              {...nftItem}
              key={nftItem.id}
              hideFollow
              variant={NFTCardVariantSize.M}
            />
          ))}
        </div>
      </div>
    </div>
  )

  const renderSort = () => (
    <div className='flex items-center mr-6'>
      <p className='pr-4 text-h5'>{translate('sortBy')}</p>
      <div className='flex space-x-6'>
        <Select
          placeholder={sortByOptions.placeholder}
          options={sortByOptions.options}
          selected={sortByOptions.selected}
          onChange={handleLikeOptionChange}
          className='bg-white min-w-118px'
        />
      </div>
    </div>
  )

  const renderPriceFilter = () => (
    <div className='flex items-center xl:justify-between mt-30px xl:mt-0 w-full xl:w-auto'>
      <div className='flex h-full items-center justify-end max-w-278px mr-6'>
        <p className='text-h6 pr-3 text-gray-2d'>{translate('rareness')}</p>
        <Slider
          min={0}
          max={1}
          hideLabel
          values={rarenessRange}
          onChange={setRarenessRange}
          formatValue={formatRarenessValue}
          formatTooltipValue={formatRarenessValue}
          step={0.1}
        />
      </div>
      {renderSort()}
      <div className='flex h-full items-center justify-end max-w-278px'>
        <p className='text-h6 pr-3 text-gray-2d'>{translate('price')}:</p>
        <Slider
          min={0}
          max={999}
          hideLabel
          values={range}
          onChange={setRange}
          formatValue={formatValue}
          formatTooltipValue={formatValue}
          step={1}
        />
      </div>
    </div>
  )

  return (
    <div className='flex flex-col w-full min-h-full'>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader
        title={translate('myNFTPortfolio')}
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
        variant='portfolio'
        sortByText={translate('filterBy')}
        sortByTextClassName='font-medium text-gray-2d leading-4'
      />
      {cards?.length ? (
        <div className='wrapper px-33px'>
          <div className='flex items-center xl:justify-between flex-col xl:flex-row mt-30px mb-30px px-27px'>
            <div className='flex items-center w-full xl:w-auto'>
              {filterOptions.map(option => (
                <div className='mr-6' key={option.label}>
                  <Select {...option} />
                </div>
              ))}
            </div>
            {renderPriceFilter()}
          </div>
          {renderNFTCards()}
        </div>
      ) : (
        <div className='flex flex-grow flex-col items-center justify-center my-40vh'>
          <span className='mb-1.5 text-gray-4a text-lg font-black'>
            {translate('youHaveNotCreatedAnyNFTs')}
          </span>
          <p className='text-center text-gray-71 text-sm font-normal'>
            {translate('toCreateANewNFTDescription')}
          </p>
        </div>
      )}
    </div>
  )
}
