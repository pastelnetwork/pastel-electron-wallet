import React, { useState } from 'react'
import Select, { TOption } from 'common/components/Select/Select'
import NFTCard, { NFTCardVariantSize } from 'common/components/NFTCard'
import { TArtworksDetailProps } from 'api/walletNode/artwork-api/interfaces'
import { translate } from 'features/app/translations'
import { mockCardProps } from './mockData'

export type TNFTResultProps = {
  searchKey: string
  artworks: TArtworksDetailProps[]
}

export default function NFTsResult({
  searchKey,
  artworks,
}: TNFTResultProps): JSX.Element {
  const categoriesData = [
    { value: 'ALL', label: translate('all') },
    { value: 'AI', label: translate('AI') },
  ]

  const timesData = [
    { value: 'ALL', label: translate('all') },
    { value: 'Future', label: translate('future') },
  ]

  const typesData = [
    { value: 'ALL', label: translate('all') },
    { value: 'Auctions', label: translate('auction') },
  ]

  const rarenessesData = [
    { value: 'ALL', label: translate('all') },
    { value: 'High', label: translate('high') },
  ]

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
          label={`${translate('categories')}:`}
          className='bg-white w-[171px] mr-6'
          onChange={setCategories}
        />
        <Select
          options={typesData}
          selected={types}
          label={`${translate('type')}:`}
          className='bg-white w-[171px] mr-6'
          onChange={setTypes}
        />
        <Select
          options={timesData}
          selected={times}
          label={`${translate('time')}:`}
          className='bg-white w-[171px] mr-6'
          onChange={setTimes}
        />
        <Select
          options={rarenessesData}
          selected={rareness}
          label={`${translate('rareness')}:`}
          className='bg-white w-[171px] mr-6'
          onChange={setRareness}
        />
      </div>
      <div className='flex-grow overflow-y-auto overflow-x-hidden grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mt-10 pb-3 gap-y-[30px] gap-x-[18px]'>
        {artworks.map((artwork, i) => {
          const item = {
            ...mockCardProps,
            id: artwork.txid,
            title: artwork.title,
            nsfw: {
              porn: artwork.porn_nsfw_score,
              hentai: artwork.hentai_nsfw_score,
            },
            copies: translate('copiesValue', {
              number: artwork.copies,
              total: '1,000',
            }),
            royalty: artwork.royalty,
            imageSrc: artwork.thumbnail_1 || artwork.thumbnail_2 || '',
            hideGreenNF: !artwork.green_address,
            isAuctionBid: (i + 1) % 2 === 0,
            isFixedPrice: (i + 1) % 3 === 0 && (i + 1) % 2 !== 0,
            isNotForSale: (i + 1) % 2 !== 0 && (i + 1) % 3 !== 0,
          }
          return (
            <NFTCard
              key={artwork.txid}
              hideFollow
              hideLikeButton
              {...item}
              searchText={searchKey}
              variant={NFTCardVariantSize.M}
            />
          )
        })}
      </div>
    </div>
  )
}
