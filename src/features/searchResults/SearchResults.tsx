import React, { useState } from 'react'
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
    <div className='paper pl-[60px] pr-[30px] py-7 pb-9 flex flex-col h-full'>
      <div className='flex items-center pr-7'>
        <div className='text-2xl font-extrabold text-gray-900'>
          Search Results
        </div>
        <div className='flex ml-12'>
          <div>
            <Radio
              className='w-4 h-4'
              checked={showResult === ResultTypes.NFTs}
              onChange={() => setShowResult(ResultTypes.NFTs)}
              labelClassName='text-sm ml-2.5'
            >
              NFTs
            </Radio>
          </div>
          <div className='ml-5'>
            <Radio
              className='w-4 h-4'
              checked={showResult === ResultTypes.Members}
              onChange={() => setShowResult(ResultTypes.Members)}
              labelClassName='text-sm ml-2.5'
            >
              Members
            </Radio>
          </div>
        </div>
        <div className='ml-6 flex items-center'>
          <div className='text-sm text-gray-42 mr-3 whitespace-nowrap font-medium'>
            Time range
          </div>
          <Select
            selectClassName='w-[121px] h-[30px]'
            onChange={onChangeTimeRange}
            options={mockTimeRanges}
            selected={timeRange}
            icon={iconCalendar}
          />
        </div>
      </div>

      <div className='flex-grow overflow-y-auto overflow-x-hidden grid auto-rows-max grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 pr-[26px] pb-3'>
        {showResult === ResultTypes.NFTs &&
          props.foundNFTs.map((item, i) => (
            <NFTCard
              className='w-[250px]'
              key={i}
              hideFollow={true}
              hideLikeButton={true}
              percentage={60}
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
      className='w-1215px max-w-9/10 h-645px max-h-9/10'
      open={open}
      onClose={props.onClose}
      closeButton
      render={() => <SearchResultsContent {...props} />}
    />
  )
}

export default SearchResults
