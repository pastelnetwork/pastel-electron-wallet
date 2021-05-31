import React, { useState } from 'react'

import NFTCard, { NFTCardProps } from '../../common/components/NFTCard'

import avatar from '../../common/assets/images/avatar-placeholder.png'
import image from '../../common/assets/images/nft-card-placeholder.png'
import Select, { Option } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'
import UpperSection from '../../common/components/UpperSection'
import { UpperSectionSortByOptions } from '../../common/components/UpperSection/UpperSection'

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

  const mockOptions: Option[] = [
    { value: 'option_1', label: 'Option 1' },
    { value: 'option_2', label: 'Option 2' },
    { value: 'option_3', label: 'Option 3' },
  ]

  const upperSectionSortByOptions: UpperSectionSortByOptions[] = [
    {
      placeholder: 'Price Sold',
      selected: priceSold,
      onOptionChange: setPriceSold,
      options: mockOptions,
    },
    {
      placeholder: 'Bid Price',
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
  const [category, setCategory] = useState<Option | null>(mockOptions[0])
  const [status, setStatus] = useState<Option | null>(mockOptions[0])
  const [time, setTime] = useState<Option | null>(mockOptions[0])
  const [rareness, setRareness] = useState<Option | null>(mockOptions[0])

  const [range, setRange] = useState(500)
  const formatValue = (value: number) => `${value}K`

  return (
    <div className=''>
      <UpperSection
        title='Market'
        routes={[{ label: 'Feed', isSelected: true }, { label: 'Statistic' }]}
        sortByOptions={upperSectionSortByOptions}
      />
      <div className='wrapper bg-background-main h-full '>
        {/* Filters */}
        <div className='flex justify-between pb-50px'>
          <div className='flex space-x-6'>
            <Select
              label='Categories'
              options={mockOptions}
              selected={category}
              onChange={setCategory}
            />
            <Select
              label='Status'
              options={mockOptions}
              selected={status}
              onChange={setStatus}
            />
            <Select
              label='Time'
              options={mockOptions}
              selected={time}
              onChange={setTime}
            />
            <Select
              label='Rareness'
              options={mockOptions}
              selected={rareness}
              onChange={setRareness}
            />
          </div>
          <div className='flex'>
            <div className='flex h-full items-center justify-end'>
              <p className='text-h6 pl-5.5 pr-2 text-text-gray800'>
                Price range:
              </p>

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
        <div className='grid grid-cols-3 lg:grid-cols-4 gap-10 text-text-gray900'>
          {Array.from({ length: 6 }).map(() => (
            <NFTCard {...mockCardProps} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NFTMarketFeed
