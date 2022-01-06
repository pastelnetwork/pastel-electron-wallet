import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mockNFTs, typesData, rarenessesData } from './mockData'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard, { NFTCardVariantSize } from 'common/components/NFTCard'

export type TKeywordResultProps = {
  searchKey: string
}

export default function KeywordResult({
  searchKey,
}: TKeywordResultProps): JSX.Element {
  const keywords = [
    {
      id: uuidv4(),
      label: 'Banksy82',
    },
    {
      id: uuidv4(),
      label: 'Banksy_art',
    },
    {
      id: uuidv4(),
      label: 'Banksy_mood',
    },
    {
      id: uuidv4(),
      label: 'theRealBanksy',
    },
    {
      id: uuidv4(),
      label: 'theRealBanksy',
    },
    {
      id: uuidv4(),
      label: 'theRealBanksy',
    },
    {
      id: uuidv4(),
      label: 'theRealBanksy',
    },
    {
      id: uuidv4(),
      label: 'theRealBanksy',
    },
  ]

  const [types, setTypes] = useState<TOption | null>(typesData[0])
  const [rareness, setRareness] = useState<TOption | null>(rarenessesData[0])

  const renderResultHeader = () => (
    <div className='bg-white 1200px:flex py-[17px] pl-[25px] flex-none justify-between items-center'>
      <div className='flex flex-none'>
        {keywords.slice(0, 5).map(item => (
          <div
            key={item.id}
            className='py-0.5 px-2 bg-gray-71 rounded-full mr-2 text-white font-medium cursor-pointer'
          >
            #{item.label}
          </div>
        ))}
        {keywords.length > 5 && (
          <div className='py-0.5 px-2 bg-gray-71 rounded-full mr-2 text-white font-medium bg-opacity-50 cursor-pointer'>
            +{keywords.length - 5}
          </div>
        )}
      </div>
      <div className='flex mt-2 1200px:mt-0 items-center flex-none'>
        <Select
          options={typesData}
          selected={types}
          label='Type:'
          className='bg-white w-[171px] mr-4'
          onChange={setTypes}
        />
        <Select
          options={rarenessesData}
          selected={rareness}
          label='Rareness:'
          className='bg-white w-[171px] mr-[19px]'
          onChange={setRareness}
        />
      </div>
    </div>
  )

  return (
    <div>
      {renderResultHeader()}
      <div className='flex-grow overflow-y-auto overflow-x-hidden grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mt-10 pb-3 gap-y-[30px] gap-x-[18px]'>
        {mockNFTs.map((item, i) => (
          <NFTCard
            key={item.id}
            hideFollow
            hideLikeButton
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
