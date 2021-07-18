import React, { useState } from 'react'
import { mockNFTs, typesData, rarenessesData } from './mockData'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard from 'common/components/NFTCard'

export type TKeywordResultProps = {
  searchKey: string
}

const KeywordResult = ({ searchKey }: TKeywordResultProps): JSX.Element => {
  const keywords = [
    'Banksy82',
    'Banksy_art',
    'Banksy_mood',
    'theRealBanksy',
    'theRealBanksy',
    'theRealBanksy',
    'theRealBanksy',
    'theRealBanksy',
    'theRealBanksy',
  ]

  const [types, setTypes] = useState<TOption | null>(typesData[0])
  const [rareness, setRareness] = useState<TOption | null>(rarenessesData[0])

  return (
    <div>
      <div className='bg-white 1200px:flex py-[17px] pl-[25px] flex-none justify-between items-center'>
        <div className='flex flex-none'>
          {keywords.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className='py-0.5 px-2 bg-gray-71 rounded-full mr-2 text-white font-medium cursor-pointer'
            >
              #{item}
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
            selectClassName='bg-white w-[171px] mr-4'
            onChange={setTypes}
          />
          <Select
            options={rarenessesData}
            selected={rareness}
            label='Rareness:'
            selectClassName='bg-white w-[171px] mr-[19px]'
            onChange={setRareness}
          />
        </div>
      </div>
      <div className='flex-grow overflow-y-auto overflow-x-hidden grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 pb-3'>
        {mockNFTs.map((item, i) => (
          <NFTCard
            className='w-[250px]'
            key={i}
            hideFollow={true}
            hideLikeButton={true}
            {...item}
            exauthorClassName='text-sm text-gray-4a'
            avatarClassName='w-6 h-6'
            searchText={searchKey}
          />
        ))}
      </div>
    </div>
  )
}

export default KeywordResult
