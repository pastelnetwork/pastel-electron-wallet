import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import MemberStrip, { TMemberStripProps } from './MemberStrip'
import Select, { TOption } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'

import PageHeader from '../../common/components/PageHeader'
import { TPageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'

import mockMemberImage from '../../common/assets/images/member-image-placeholder.png'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import ScrollBar from '../../common/components/Scrollbar'

const stripMockImages = Array.from({ length: 10 }).map(() => mockMemberImage)
const mockMemberStrips: TMemberStripProps[] = [
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 161,
      name: 'Sally Fadel',
      isVerified: false,
      followedByUser: false,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 326,
      name: 'Anyia Harber',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 124,
      name: 'Edwardo Bea',
      isVerified: false,
      followedByUser: false,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 588,
      name: 'Reymundo',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '1,700,000K',
    totalSold: '1,500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
]

const mockOptions: TOption[] = [
  { value: 'All', label: 'All' },
  { value: 'option_2', label: 'TOption 2' },
  { value: 'option_3', label: 'TOption 3' },
]

const MembersDirectory: React.FC = () => {
  // Filters
  const [category, setCategory] = useState<TOption | null>(mockOptions[0])

  const [range, setRange] = useState(500)
  const formatValue = (value: number) => `${value}k`

  const filterOptions = {
    label: 'Categories',
    selected: category,
    onChange: setCategory,
    options: mockOptions,
  }

  // Page Header
  const [ranking, setRanking] = useState<TOption | null>(null)
  const [sold, setSold] = useState<TOption | null>(null)
  const [followers, setFollowers] = useState<TOption | null>(null)
  const [selectedItem, setSelectedItem] = useState(0)

  const pageHeaderSortByOptions: TPageHeaderSortByOptions[] = [
    {
      placeholder: 'Ranking',
      selected: ranking,
      onOptionChange: setRanking,
      options: mockOptions,
    },
    {
      placeholder: 'Sold',
      selected: sold,
      onOptionChange: setSold,
      options: mockOptions,
    },
    {
      placeholder: 'Followers',
      selected: followers,
      onOptionChange: setFollowers,
      options: mockOptions,
    },
  ]

  const data = [
    { label: 'Creators' },
    { label: 'Sellers' },
    { label: 'Buyers' },
  ]

  const routes = {
    data,
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  return (
    <div>
      <PageHeader
        title='Members'
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
      />
      <ScrollBar hasPageHeader={true}>
        <div className='wrapper content with-page-header pb-5 w-screen'>
          <div className='bg-white p-5 rounded-lg'>
            <div className='flex justify-between pb-25px'>
              <div className='w-244px'>
                <Select {...filterOptions} className='w-full' />
              </div>
              <div className='flex'>
                <div className='flex h-full items-center justify-end'>
                  <p className='text-h6 px-22px text-gray-2d'>Sales turover:</p>

                  <Slider
                    min={100}
                    max={999}
                    value={range}
                    onChange={setRange}
                    formatValue={formatValue}
                    formatTooltipValue={formatValue}
                  />
                </div>
              </div>
            </div>
            <div className='space-y-5'>
              {mockMemberStrips.map(item => (
                <MemberStrip {...item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </ScrollBar>
    </div>
  )
}

export default MembersDirectory
