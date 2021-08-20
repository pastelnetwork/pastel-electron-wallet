import React, { useState } from 'react'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard, { NFTCardVariantSize } from 'common/components/NFTCard'
import {
  mockNFTs,
  categoriesData,
  timesData,
  typesData,
  rarenessesData,
} from './mockData'

export type TNFTResultProps = {
  searchKey: string
}

const NFTsResult = ({ searchKey }: TNFTResultProps): JSX.Element => {
  const [categories, setCategories] = useState<TOption | null>(
    categoriesData[0],
  )
  const [times, setTimes] = useState<TOption | null>(timesData[0])
  const [types, setTypes] = useState<TOption | null>(typesData[0])
  const [rareness, setRareness] = useState<TOption | null>(rarenessesData[0])

  return (
    <div>
      <div className='bg-white flex py-[17px] px-[18px]'>
        <Select
          options={categoriesData}
          selected={categories}
          label='Categories:'
          selectClassName='bg-white w-[171px] mr-6'
          onChange={setCategories}
        />
        <Select
          options={typesData}
          selected={types}
          label='Type:'
          selectClassName='bg-white w-[171px] mr-6'
          onChange={setTypes}
        />
        <Select
          options={timesData}
          selected={times}
          label='Time:'
          selectClassName='bg-white w-[171px] mr-6'
          onChange={setTimes}
        />
        <Select
          options={rarenessesData}
          selected={rareness}
          label='Rareness:'
          selectClassName='bg-white w-[171px] mr-6'
          onChange={setRareness}
        />
      </div>
      <div className='flex-grow overflow-y-auto overflow-x-hidden grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mt-10 pb-3 gap-y-[30px] gap-x-[18px]'>
        {mockNFTs.map((item, i) => (
          <NFTCard
            key={i}
            hideFollow={true}
            hideLikeButton={true}
            {...item}
            searchText={searchKey}
            isAuctionBid={(i + 1) % 2 === 0}
            isFixedPrice={(i + 1) % 3 === 0 && (i + 1) % 2 !== 0}
            isNotForSale={(i + 1) % 2 !== 0 && (i + 1) % 3 !== 0}
            variant={NFTCardVariantSize.M}
          />
        ))}
      </div>
    </div>
  )
}

export default NFTsResult
