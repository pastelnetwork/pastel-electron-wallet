import React, { useState } from 'react'
import MemberStrip, { MemberStripProps } from './MemberStrip'
import mockAvatar from '../../common/assets/images/avatar2-placeholder.png'
import image from '../../common/assets/images/member-image-placeholder.png'
import Select, { Option } from '../../common/components/Select/Select'
import Slider from '../../common/components/Slider/Slider'
import PageHeader from '../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'

const mockMemberStrips: MemberStripProps = {
  memberCard: {
    avatar: mockAvatar,
    followers: 161,
    name: 'Sally Fadel',
  },
  heighestSold: '1.700,000k',
  totalSell: '1.500K',
  images: [image, image, image, image],
}

const mockOptions: Option[] = [
  { value: 'All', label: 'All' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
]

const MembersDirectory: React.FC = () => {
  // Filters
  const [category, setCategory] = useState<Option | null>(mockOptions[0])

  const [range, setRange] = useState(500)
  const formatValue = (value: number) => `${value}K`

  const filterOptions = {
    label: 'Categories',
    selected: category,
    onChange: setCategory,
    options: mockOptions,
  }

  // Upper Section
  const [ranking, setRanking] = useState<Option | null>(null)
  const [sold, setSold] = useState<Option | null>(null)
  const [followers, setFollowers] = useState<Option | null>(null)
  const pageHeaderSortByOptions: PageHeaderSortByOptions[] = [
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

  return (
    <div className=''>
      <PageHeader
        title='Members'
        routes={[
          { label: 'Creators' },
          { label: 'Sellers', isSelected: true },
          { label: 'Buyers' },
        ]}
        sortByOptions={pageHeaderSortByOptions}
      />
      <div className='wrapper'>
        <div className='bg-white p-5 rounded-lg'>
          <div className='flex justify-between pb-25px'>
            <div className='w-244px'>
              <Select {...filterOptions} className='w-full' />
            </div>
            <div className='flex'>
              <div className='flex h-full items-center justify-end'>
                <p className='text-h6 pl-22px pr-2 text-gray-2d'>
                  Sales turover:
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
          <div className='space-y-5'>
            {Array.from({ length: 5 }).map(() => (
              <MemberStrip {...mockMemberStrips} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MembersDirectory
