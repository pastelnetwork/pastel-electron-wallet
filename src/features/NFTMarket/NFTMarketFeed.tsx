import React, { useState } from 'react'

import NFTCard, { NFTCardProps } from '../../common/components/NFTCard'

import avatar from '../../common/assets/images/avatar-placeholder.png'
import image from '../../common/assets/images/nft-card-placeholder.png'
import Select, { Option } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'
import PageHeader from '../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'

const mockCardProps: NFTCardProps = {
  author: 'zndrson',
  avatarSrc: avatar,
  imageSrc: image,
  likes: 23,
  onSale: true,
  price: '222K',
  title: 'Cosmic Perspective',
}

const NFTMarketFeed: React.FC = () => {
  // Upper Section
  const [priceSold, setPriceSold] = useState<Option | null>(null)
  const [bidPrice, setBidPrice] = useState<Option | null>(null)
  const [likes, setLikes] = useState<Option | null>(null)

  const mockCategories: Option[] = [
    { value: 'AI', label: 'AI' },
    { value: 'option_2', label: 'Option 2' },
    { value: 'option_3', label: 'Option 3' },
  ]

  const mockStatus: Option[] = [
    { value: 'Auctions', label: 'Auctions' },
    { value: 'option_2', label: 'Option 2' },
    { value: 'option_3', label: 'Option 3' },
  ]

  const mockTime: Option[] = [
    { value: 'Future', label: 'Future' },
    { value: 'Present', label: 'Present' },
    { value: 'Past', label: 'Past' },
  ]

  const mockRareness: Option[] = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ]

  const mockOptions: Option[] = [
    { value: 'option_1', label: 'Option 1' },
    { value: 'option_2', label: 'Option 2' },
    { value: 'option_3', label: 'Option 3' },
  ]

  const pageHeaderSortByOptions: PageHeaderSortByOptions[] = [
    {
      placeholder: 'Price sold',
      selected: priceSold,
      onOptionChange: setPriceSold,
      options: mockOptions,
    },
    {
      placeholder: 'Bid price',
      selected: bidPrice,
      onOptionChange: setBidPrice,
      options: mockOptions,
    },
    {
      placeholder: 'Likes',
      selected: likes,
      onOptionChange: setLikes,
      options: mockOptions,
    },
  ]

  // Filters
  const [category, setCategory] = useState<Option | null>(mockCategories[0])
  const [status, setStatus] = useState<Option | null>(mockStatus[0])
  const [time, setTime] = useState<Option | null>(mockTime[0])
  const [rareness, setRareness] = useState<Option | null>(mockRareness[0])

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

  const [range, setRange] = useState(500)
  const formatValue = (value: number) => `${value}k`

  return (
    <div className=''>
      <PageHeader
        title='Market'
        routes={[{ label: 'Feed', isSelected: true }, { label: 'Statistics' }]}
        sortByOptions={pageHeaderSortByOptions}
      />
      <div className='wrapper content with-page-header bg-background-main h-full '>
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
        <div className='grid grid-cols-3 lg:grid-cols-4 gap-10 text-gray-1a'>
          {Array.from({ length: 6 }).map((_, i) => (
            <NFTCard {...mockCardProps} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NFTMarketFeed
