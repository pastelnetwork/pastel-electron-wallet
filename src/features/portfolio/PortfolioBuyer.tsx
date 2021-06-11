import React, { useState } from 'react'

import PageHeader, {
  TBreadcrumbProps,
} from '../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'
import Select, { TOption } from '../../common/components/Select/Select'
import NFTCard, { INFTCardProps } from '../../common/components/NFTCard'
import Slider from '../../common/components/Slider/Slider'

import styles from './Portfolio.module.css'

import avatar from '../../common/assets/images/avatar-placeholder.png'
import portfolio1 from '../../common/assets/images/mock/portfolio-1.jpg'
import portfolio2 from '../../common/assets/images/mock/portfolio-2.jpg'
import portfolio3 from '../../common/assets/images/mock/portfolio-3.jpg'
import portfolio4 from '../../common/assets/images/mock/portfolio-4.jpg'

const mockOptions: TOption[] = [
  { value: 'option_1', label: 'Option 1' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
]

const mockCategories: TOption[] = [
  { value: 'AI', label: 'AI' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
]

const mockStatus: TOption[] = [
  { value: 'Auctions', label: 'Auctions' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
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

const mockNFTCard: INFTCardProps[] = [
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio1,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio2,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: false,
    percentage: 55,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio3,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: false,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio4,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio1,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio2,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio2,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio2,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
  {
    author: 'zndrson',
    avatarSrc: avatar,
    imageSrc: portfolio2,
    likes: 23,
    onSale: true,
    price: '222K',
    currencyName: 'PSL',
    title: 'Cosmic Perspective',
    liked: true,
    percentage: 75,
    variant: 'portfolio',
    isLastBid: true,
    hideLikeButton: true,
  },
]

const mockBreadcrumbs: TBreadcrumbProps[] = [
  {
    label: 'Portfolio',
    route: '#',
  },
  {
    label: 'My portfolio',
    route: '#',
  },
  {
    label: 'Owned',
  },
]

export default function PortfolioBuyer(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(2)
  const [filter, setFilter] = useState<TOption | null>(null)
  const [likes, setLikes] = useState<TOption | null>(null)

  const pageHeaderSortByOptions: PageHeaderSortByOptions[] = [
    {
      placeholder: 'In review (87)',
      selected: filter,
      onOptionChange: setFilter,
      options: mockOptions,
    },
  ]

  const sortByOptions: PageHeaderSortByOptions = {
    placeholder: 'Likes',
    selected: likes,
    onOptionChange: setLikes,
    options: mockOptions,
  }

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [type, settType] = useState<TOption | null>(mockStatus[0])
  const [time, setTime] = useState<TOption | null>(mockTime[0])
  const [rareness, setRareness] = useState<TOption | null>(mockRareness[0])

  const filterOptions = [
    {
      label: 'Categories',
      selected: category,
      onChange: setCategory,
      options: mockCategories,
      className: 'min-w-171px',
    },
    {
      label: 'Type',
      selected: type,
      onChange: settType,
      options: mockStatus,
      className: 'min-w-171px',
    },
    {
      label: 'Time',
      selected: time,
      onChange: setTime,
      options: mockTime,
      className: 'min-w-171px',
    },
    {
      label: 'Rareness',
      selected: rareness,
      onChange: setRareness,
      options: mockRareness,
      className: 'min-w-171px',
    },
  ]

  const routes = {
    data: [
      {
        label: 'Creator',
        count: 26,
      },
      {
        label: 'Seller',
        count: 2,
      },
      {
        label: 'Owned',
        count: 2,
      },
      {
        label: 'Liked',
      },
    ],
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  const [range, setRange] = useState<[number, number]>([400, 700])
  const formatValue = (value: number) => `${value}k`

  return (
    <div>
      <PageHeader
        title='My portfolio'
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
        variant='portfolio'
        breadcrumbs={mockBreadcrumbs}
        sortByText='Filter by'
        sortByTextClassName='font-medium text-gray-2d leading-4'
      />
      <div className='wrapper px-33px'>
        <div className='flex items-center xl:justify-between flex-col xl:flex-row mt-30px mb-30px px-27px'>
          <div className='flex items-center w-full xl:w-auto'>
            {filterOptions.map(option => (
              <div className='mr-24px' key={option.label}>
                <Select {...option} />
              </div>
            ))}
          </div>
          <div className='flex items-center xl:justify-between mt-30px xl:mt-0 w-full xl:w-auto'>
            <div className='flex items-center mr-24px'>
              <p className='pr-4 text-h5'>Sort by</p>
              <div className='flex space-x-6'>
                <Select
                  placeholder={sortByOptions.placeholder}
                  options={sortByOptions.options}
                  selected={sortByOptions.selected}
                  onChange={sortByOptions.onOptionChange}
                  className='min-w-118px'
                />
              </div>
            </div>
            <div className='flex h-full items-center justify-end max-w-278px'>
              <p className='text-h6 pr-12px text-gray-2d'>Price:</p>
              <Slider
                min={100}
                max={999}
                hideLabel
                values={range}
                onChange={setRange}
                formatValue={formatValue}
                formatTooltipValue={formatValue}
              />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div
            className={`${styles.portfolioContent} overflow-y-auto pl-27px pr-23px pb-30px mt-30px`}
          >
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-40px gap-y-61px'>
              {mockNFTCard?.map((nftItem, index) => (
                <NFTCard {...nftItem} key={index} hideFollow />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
