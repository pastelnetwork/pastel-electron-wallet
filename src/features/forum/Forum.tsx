import React, { useState } from 'react'

import MultiToggleSwitch from '../../common/components/MultiToggleSwitch'
import Scrollbar from '../../common/components/Scrollbar'
import Select, { TOption } from '../../common/components/Select/Select'
import Table from '../../common/components/Table'
import StarRate from '../profile/components/StarRate'
import { data } from './forumData'
import ForumMembers, { TForumMember } from './ForumMembers'
import ForumUpdatedNumber, {
  TForumUpdatedNumberProps,
} from './ForumUpdatedNumber'
import { translate } from 'features/app/translations'

export function Forum(): JSX.Element {
  const mockCategories: TOption[] = [
    { value: '', label: translate('all') },
    { value: 'bitcoinTalks', label: translate('bitcoinTalks') },
    { value: 'ethereum', label: translate('ethereum') },
    { value: 'xrpRipple', label: translate('xrpRipple') },
  ]

  const mockTags: TOption[] = [
    { value: '', label: translate('all') },
    { value: 'coinbase', label: translate('coinbase') },
    { value: 'cryptocurrency', label: translate('cryptocurrency') },
    { value: 'instablockchain', label: translate('instablockchain') },
  ]

  // Filters
  const [category, setCategory] = useState<TOption | null>(mockCategories[0])
  const [tag, setTag] = useState<TOption | null>(mockTags[0])
  const [selectedItem, setSelectedItem] = useState(0)

  const filterOptions = [
    {
      label: translate('categories'),
      selected: category,
      onChange: setCategory,
      options: mockCategories,
    },
    {
      label: translate('tags'),
      selected: tag,
      onChange: setTag,
      options: mockTags,
    },
  ]

  const routeData = [
    { label: translate('latest') },
    { label: translate('top') },
    { label: translate('categories') },
  ]

  const routes = {
    data: routeData,
    activeIndex: selectedItem,
    onToggle: setSelectedItem,
  }

  const columns = [
    {
      key: 'topic',
      name: translate('topic'),
    },
    {
      key: 'favorite',
      name: '',
      custom: (value: string | number) => (
        <StarRate rate={+value || 0} maxRate={1} />
      ),
    },
    {
      key: 'members',
      name: '',
      custom: (members: TForumMember[]) => <ForumMembers members={members} />,
    },
    {
      key: 'replies',
      name: translate('replies'),
      custom: (replies: TForumUpdatedNumberProps) => (
        <ForumUpdatedNumber {...replies} />
      ),
    },
    {
      key: 'views',
      name: translate('views'),
      custom: (views: TForumUpdatedNumberProps) => (
        <ForumUpdatedNumber {...views} />
      ),
    },
    {
      key: 'activity',
      name: translate('activity'),
      custom: (activity: string) => (
        <span className='text-gray-600'>{activity}</span>
      ),
    },
  ]

  const table = {
    columns: columns,
    data: data,
    headerTrClasses: 'h-12 text-gray-700 font-extrabold',
    headerTdClasses:
      'first:pl-6 last:pr-6 border-b-1px border-line-default border-gray-100 z-10',
    bodyTrClasses: 'h-12 hover:bg-line-default text-gray-2d',
    bodyTdClasses:
      'first:rounded-l first:pl-6 last:pr-6 last:rounded-r border-b-1px border-line-default border-gray-100',
    bodyClasses: 'overflow-y-scroll',
  }

  const renderForumContent = () => (
    <Scrollbar hasPageHeader>
      <div className='bg-white px-7 py-5 rounded-lg'>
        <Table {...table} />
      </div>
    </Scrollbar>
  )

  const renderMultiToggleSwitch = () => (
    <div className='flex h-full items-center justify-end'>
      <MultiToggleSwitch
        containerClassName='rounded-none border-none'
        {...routes}
      />
    </div>
  )

  const renderForumHeader = () => (
    <div className='flex justify-between pt-5'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3.5'>
        {filterOptions.map(option => (
          <Select {...option} key={option.label} />
        ))}
      </div>
      <div className='flex'>{renderMultiToggleSwitch()}</div>
    </div>
  )

  return (
    <div className='wrapper content with-page-header pb-5 w-screen'>
      {renderForumHeader()}
      {renderForumContent()}
    </div>
  )
}
