import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import MemberStrip, { TMemberStripProps } from './MemberStrip'
import Select, { Option } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'

import mockMemberImage from '../../common/assets/images/member-image-placeholder.png'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'

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
    heighestSold: '1.700,000K',
    totalSell: '1.500K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 8.082,
      name: 'Anyia Harber',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '800,000K',
    totalSell: '1.500.200K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 1.024,
      name: 'Edwardo Bea',
      isVerified: false,
      followedByUser: false,
    },
    heighestSold: '1.300K',
    totalSell: '1.110.230K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
  {
    id: uuidv4(),
    memberCard: {
      avatar: mockAvatar,
      followers: 1.024,
      name: 'Reymundo Longnamefortestinghowitlooks Smith',
      isVerified: true,
      followedByUser: true,
    },
    heighestSold: '6.240K',
    totalSell: '2.109.230K',
    images: stripMockImages,
    currencyName: 'PSL',
  },
]

const mockOptions: Option[] = [
  { value: 'All', label: 'All' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
]

const MembersDirectory: React.FC = () => {
  // Filters
  const [category, setCategory] = useState<Option | null>(mockOptions[0])

  const [range, setRange] = useState(500)
  const formatValue = (value: number) => `${value}k`

  const filterOptions = {
    label: 'Categories',
    selected: category,
    onChange: setCategory,
    options: mockOptions,
  }

  return (
    <div className='wrapper content with-page-header'>
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
  )
}

export default MembersDirectory
