import React, { useState } from 'react'

import PageHeader, {
  TBreadcrumbProps,
} from '../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'
import { TOption } from '../../common/components/Select/Select'
import NFTCard, { INFTCardProps } from '../../common/components/NFTCard'

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
    label: 'Liked',
  },
]

export default function PortfolioLiked(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(3)
  const [filter, setFilter] = useState<TOption | null>(null)

  const pageHeaderSortByOptions: PageHeaderSortByOptions[] = [
    {
      placeholder: 'In review (87)',
      selected: filter,
      onOptionChange: setFilter,
      options: mockOptions,
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
        <div className='flex'>
          <div className='w-full'>
            <div
              className={`${styles.portfolioLikedContent} overflow-y-auto pl-27px pr-23px pb-16px mt-15px pt-15px`}
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
    </div>
  )
}
