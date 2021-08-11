import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import MemberStrip, { TMemberStripProps } from './MemberStrip'
import Select, { TOption } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'
import Breadcrumbs, { TBreadcrumb } from '../../common/components/Breadcrumbs'
import PageHeader from '../../common/components/PageHeader'
import { TPageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'

import styles from './MembersDirectory.module.css'
import Scrollbar from '../../common/components/Scrollbar'
import { mockDataImagesList, mockAvatarImagesList } from './data'

const mockSold: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'sold', label: 'Sold' },
]

const mockRanking: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'ranking', label: 'Ranking' },
]

const mockFollowers: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'followers', label: 'Followers' },
]

const mockCategories: TOption[] = [
  { value: 'all', label: 'All' },
  { value: 'illustration', label: 'Illustration' },
]

const mockBreadcrumbs: TBreadcrumb[] = [
  {
    label: 'Members',
    route: '#',
  },
  {
    label: '',
  },
]

const MembersDirectory = (): JSX.Element => {
  const mockMemberStrips: TMemberStripProps[] = [
    {
      id: uuidv4(),
      memberCard: {
        avatar: mockAvatarImagesList[0],
        followers: 161,
        name: 'Sally Fadel',
        isVerified: false,
        followedByUser: false,
      },
      highestSold: 1700000000,
      totalSold: 1500000,
      images: mockDataImagesList.slice(0, 10),
    },
    {
      id: uuidv4(),
      memberCard: {
        avatar: mockAvatarImagesList[1],
        followers: 326,
        name: 'Anyia Harber',
        isVerified: true,
        followedByUser: true,
      },
      highestSold: 1700000000,
      totalSold: 1500000,
      images: mockDataImagesList.slice(10, 20),
    },
    {
      id: uuidv4(),
      memberCard: {
        avatar: mockAvatarImagesList[2],
        followers: 124,
        name: 'Edwardo Bea',
        isVerified: false,
        followedByUser: false,
      },
      highestSold: 1700000000,
      totalSold: 1500000,
      images: mockDataImagesList.slice(20, 30),
    },
    {
      id: uuidv4(),
      memberCard: {
        avatar: mockAvatarImagesList[3],
        followers: 588,
        name: 'Reymundo',
        isVerified: true,
        followedByUser: true,
      },
      highestSold: 1700000000,
      totalSold: 1500000,
      images: mockDataImagesList.slice(30, 40),
    },
  ]

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [breadcrumbs, setBreadcrumbs] = useState(mockBreadcrumbs)
  const [range, setRange] = useState<[number, number]>([400, 700])
  const formatValue = (value: number) => `${value.toFixed(0)}k`

  const filterOptions = {
    label: 'Categories',
    selected: category,
    onChange: setCategory,
    options: mockCategories,
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
      options: mockRanking,
    },
    {
      placeholder: 'Sold',
      selected: sold,
      onOptionChange: setSold,
      options: mockSold,
    },
    {
      placeholder: 'Followers',
      selected: followers,
      onOptionChange: setFollowers,
      options: mockFollowers,
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

  useEffect(() => {
    const updatedbreadcrumbs = [...breadcrumbs]
    updatedbreadcrumbs[mockBreadcrumbs.length - 1].label =
      routes.data[selectedItem].label
    setBreadcrumbs(updatedbreadcrumbs)
  }, [selectedItem])

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader
        title='Members'
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
      />
      <Scrollbar hasPageHeader={true}>
        <div
          className={`${styles.content} content with-page-header pb-5 mt-2.5 ml-[60px] mr-[27px]`}
        >
          <div className='bg-white p-5 rounded-lg mr-[30px]'>
            <div className='flex justify-between pb-25px'>
              <div className='w-244px'>
                <Select {...filterOptions} className='w-full' />
              </div>
              <div className='flex'>
                <div className='flex h-full items-center justify-end'>
                  <p className='text-h6 px-22px text-gray-2d'>Total Sales</p>

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
            <div className='space-y-5'>
              {mockMemberStrips.map(item => (
                <MemberStrip {...item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </Scrollbar>
    </div>
  )
}

export default MembersDirectory
