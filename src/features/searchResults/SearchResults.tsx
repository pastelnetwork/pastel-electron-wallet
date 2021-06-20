import React, { useState } from 'react'
import cn from 'classnames'
import Modal from 'common/components/AnimatedModal'
import Radio from 'common/components/Radio/Radio'
import MemberCard, { TMemberCard } from 'features/members/MemberCard'
import NFTCard, { TNFTCard } from '../../common/components/NFTCard'
import Select, { TOption } from 'common/components/Select/Select'
import { mockTimeRanges } from './mockData'
import iconCalendar from 'common/assets/icons/ico-calendar2.svg'

enum ResultTypes {
  NFTs,
  Members,
}

export type TSearchResultsContentProps = {
  foundNFTs: TNFTCard[]
  foundMembers: TMemberCard[]
  onChangeTimeRange(val: string | null): void
}

const SearchResultsContent = (
  props: TSearchResultsContentProps,
): JSX.Element => {
  const [showResult, setShowResult] = useState<ResultTypes>(ResultTypes.NFTs)
  const [timeRange, setTimeRange] = useState<TOption | null>(mockTimeRanges[0])

  const onChangeTimeRange = (e: TOption | null) => {
    setTimeRange(e)
    props.onChangeTimeRange(e ? e.value : null)
  }

  return (
    <div className='paper px-10 py-7 h-full'>
      <div className='flex items-center'>
        <div className='text-2xl font-extrabold text-gray-900'>
          Search Results
        </div>
        <div className='flex ml-12'>
          <div>
            <Radio
              isChecked={showResult === ResultTypes.NFTs}
              clickHandler={() => setShowResult(ResultTypes.NFTs)}
            >
              <span
                className={cn(
                  'text-gray-700 font-extrabold text-sm',
                  showResult !== ResultTypes.NFTs ? 'opacity-50' : '',
                )}
              >
                NFTs
              </span>
            </Radio>
          </div>
          <div className='ml-5'>
            <Radio
              isChecked={showResult === ResultTypes.Members}
              clickHandler={() => setShowResult(ResultTypes.Members)}
            >
              <span
                className={cn(
                  'text-gray-700 font-extrabold text-sm',
                  showResult !== ResultTypes.Members ? 'opacity-50' : '',
                )}
              >
                Members
              </span>
            </Radio>
          </div>
        </div>
        <div className='ml-6 flex items-center'>
          <div className='text-sm font-medium text-gray-600 mr-3 whitespace-nowrap'>
            Time range
          </div>
          <Select
            onChange={onChangeTimeRange}
            options={mockTimeRanges}
            selected={timeRange}
            icon={iconCalendar}
          />
        </div>
      </div>

      <div className='h-4/5 overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-7 pr-3 pb-3 pt-3'>
        {showResult === ResultTypes.NFTs &&
          props.foundNFTs.map((item, i) => (
            <NFTCard
              key={i}
              hideFollow={true}
              hideLikeButton={true}
              percentage={60}
              variant={'portfolio'}
              {...item}
            />
          ))}

        {showResult === ResultTypes.Members &&
          props.foundMembers.map((item, i) => <MemberCard {...item} key={i} />)}
      </div>
    </div>
  )
}

export type TSearchResultsProps = {
  open: boolean
  onClose(): void
} & TSearchResultsContentProps

const SearchResults = ({
  open,
  ...props
}: TSearchResultsProps): JSX.Element => {
  return (
    <Modal
      className='w-11/12 h-4/5'
      open={open}
      onClose={props.onClose}
      closeButton
      render={() => <SearchResultsContent {...props} />}
    />
  )
}

export default SearchResults
