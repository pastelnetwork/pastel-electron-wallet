import React from 'react'
import { Clock } from '../Icons'
import SearchTag from './SearchTag'
import cn from 'classnames'

export type TRecentSearchItem = {
  tagType?: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  label: string
  className?: string
  id: string
}

const RecentSearchItem = ({
  tagType,
  label,
  className,
  id,
}: TRecentSearchItem): JSX.Element => {
  return (
    <div className={cn('flex items-center mt-18px', className)}>
      <Clock className='text-gray-71 mr-2' />
      {!!tagType && tagType === 'nfts' && (
        <SearchTag type='nfts' label='NFTs' id={id} />
      )}
      {!!tagType && tagType === 'keyword' && (
        <SearchTag type='keyword' label='Keywords' id={id} />
      )}
      {!!tagType && tagType === 'creators' && (
        <SearchTag type='creators' label='Creators' id={id} />
      )}
      <div className='font-medium text-base'>{label}</div>
    </div>
  )
}

export default RecentSearchItem
