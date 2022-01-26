import React from 'react'
import cn from 'classnames'

import { translate } from 'features/app/translations'
import { Clock } from '../Icons'
import SearchTag from './SearchTag'

export type TRecentSearchItem = {
  tagType?: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  label: string
  className?: string
  id: string
}

export default function RecentSearchItem({
  tagType,
  label,
  className,
  id,
}: TRecentSearchItem): JSX.Element {
  return (
    <div className={cn('flex items-center mt-18px', className)}>
      <Clock className='text-gray-71 mr-2' />
      {!!tagType && tagType === 'nfts' && (
        <SearchTag type='nfts' label={translate('NFTs')} id={id} />
      )}
      {!!tagType && tagType === 'keyword' && (
        <SearchTag type='keyword' label={translate('keywords')} id={id} />
      )}
      {!!tagType && tagType === 'creators' && (
        <SearchTag type='creators' label={translate('creators')} id={id} />
      )}
      <div className='font-medium text-base'>{label}</div>
    </div>
  )
}
