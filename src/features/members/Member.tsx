import React, { useState } from 'react'

import { Option } from '../../common/components/Select/Select'
import PageHeader from '../../common/components/PageHeader'
import { PageHeaderSortByOptions } from '../../common/components/PageHeader/PageHeader'
import MembersDirectory from './MembersDirectory'

const mockOptions: Option[] = [
  { value: 'All', label: 'All' },
  { value: 'option_2', label: 'Option 2' },
  { value: 'option_3', label: 'Option 3' },
]

const Member: React.FC = () => {
  // Page Header
  const [ranking, setRanking] = useState<Option | null>(null)
  const [sold, setSold] = useState<Option | null>(null)
  const [followers, setFollowers] = useState<Option | null>(null)
  const [selectedItem, setSelectedItem] = useState(0)

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

  const data = [
    { label: 'Creators', component: <div className='h-screen' /> },
    { label: 'Sellers', component: <MembersDirectory /> },
    { label: 'Buyers', component: <div className='h-screen' /> },
  ]

  const routes = {
    data,
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  return (
    <div className=''>
      <PageHeader
        title='Members'
        routes={routes}
        sortByOptions={pageHeaderSortByOptions}
      />
      {data[selectedItem]?.component}
    </div>
  )
}

export default Member
