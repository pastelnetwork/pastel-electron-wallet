import React, { useState } from 'react'

import PageHeader, {
  TBreadcrumbProps,
} from '../../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../../common/components/PageHeader/PageHeader'
import Select, { TOption } from '../../../common/components/Select/Select'
import NFTCard, { INFTCardProps } from '../../../common/components/NFTCard'

import avatar from '../../../common/assets/images/avatar-placeholder.png'
import portfolio1 from '../../../common/assets/images/mock/portfolio-1.jpg'
import portfolio2 from '../../../common/assets/images/mock/portfolio-2.jpg'
import portfolio3 from '../../../common/assets/images/mock/portfolio-3.jpg'
import portfolio4 from '../../../common/assets/images/mock/portfolio-4.jpg'

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
    label: 'Buyer',
  },
]

export default function PortfolioBuyer(): JSX.Element {
  const [price, setPrice] = useState<TOption | null>(null)
  const [likes, setLikes] = useState<TOption | null>(null)

  const pageHeaderSortByOptions: PageHeaderSortByOptions[] = [
    {
      placeholder: 'Price',
      selected: price,
      onOptionChange: setPrice,
      options: mockOptions,
    },
    {
      placeholder: 'Likes',
      selected: likes,
      onOptionChange: setLikes,
      options: mockOptions,
    },
  ]
  const pageHeaderRoutes = [
    {
      label: 'Creator',
      totalItem: 26,
    },
    {
      label: 'Seller',
      totalItem: 2,
    },
    {
      label: 'Owned',
      totalItem: 2,
      isSelected: true,
    },
    {
      label: 'Liked',
    },
  ]

  const categories = [
    {
      name: 'Bookmarked',
      totalItem: 87,
    },
    {
      name: 'Buying',
      totalItem: 1,
    },
    {
      name: 'Bought',
      totalItem: 9,
    },
  ]

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

  return (
    <div>
      <PageHeader
        title='My portfolio'
        routes={pageHeaderRoutes}
        sortByOptions={pageHeaderSortByOptions}
        variant='portfolio'
        breadcrumbs={mockBreadcrumbs}
      />
      <div className='wrapper'>
        <div className='flex'>
          <div className='w-full'>
            <div className='flex items-center mt-10px mb-30px'>
              {filterOptions.map(option => (
                <div className='mr-24px' key={option.label}>
                  <Select {...option} />
                </div>
              ))}
            </div>
            <div className='max-h-54vh overflow-y-auto pr-28px pb-16px'>
              <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-30px gap-y-18px'>
                {mockNFTCard?.map((nftItem, index) => (
                  <NFTCard {...nftItem} key={index} hideFollow />
                ))}
              </div>
            </div>
          </div>
          <div className='mt-90px w-196px ml-36px'>
            <p className='text-h5 leading-3 font-medium text-gray-42 pl-12px'>
              Filter by:
            </p>
            <ul className='mt-20px'>
              {categories?.map((category, index) => (
                <li key={index} className='list-none mb-8px'>
                  <span
                    className={`font-medium cursor-pointer text-h5 leading-none py-8px px-12px rounded-8px inline-block ${
                      index === 0 ? 'text-gray-2d bg-gray-a6' : 'text-gray-a0'
                    } hover:text-gray-2d hover:bg-gray-a6`}
                  >
                    {category.name} ({category.totalItem})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
