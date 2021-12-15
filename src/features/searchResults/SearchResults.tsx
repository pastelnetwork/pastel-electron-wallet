import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { artworkSearch } from 'api/walletNode/artwork-api/artwork'
import { TArtworksDetailProps } from 'api/walletNode/artwork-api/interfaces'
import Tabbar from './components/Tabbar'
import NFTsResult from './NFTsResult'
import KeywordResult from './KeywordResult'
import CreatorsResult from './CreatorsResult'
import ForumPost from './ForumPost'

type TSearchOptionsProps = {
  keyword: string
  selectedCategory?: string
}

const LIMIT = 20

export default function SearchResults(): JSX.Element {
  const history = useHistory()
  const [searchOptions, setSearchOptions] = useState<TSearchOptionsProps>({
    keyword: '',
    selectedCategory: '',
  })
  const [artworks, setArtworks] = useState<TArtworksDetailProps[]>([])
  const data = [
    {
      label: 'NFTs',
      no_search: 5,
    },
    {
      label: 'Keyword',
      no_search: 23,
    },
    {
      label: 'Creators',
      no_search: 5,
    },
    {
      label: 'Users',
      no_search: 2,
    },
    {
      label: 'Forum Posts',
      no_search: 5,
    },
  ]

  enum Tabs {
    NFTS,
    KEYWORD,
    CREATORS,
    USERS,
    FORUM_POSTS,
  }
  const [tab, setTab] = useState<number>(Tabs.NFTS)

  useEffect(() => {
    if (history.location.state) {
      const state = history.location.state as TSearchOptionsProps
      const fetchData = async () => {
        const artworks = await artworkSearch({
          query: state.keyword,
          artist_name: true,
          art_title: true,
          series: true,
          descr: true,
          keyword: true,
          min_nsfw_score: 0,
          limit: LIMIT,
        })
        if (artworks) {
          setArtworks(artworks)
        }
      }
      setSearchOptions({
        keyword: state.keyword,
        selectedCategory: state?.selectedCategory,
      })
      fetchData()
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }
  }, [history.location.state])

  return (
    <div className='pt-[29px] px-[60px] min-h-98vh'>
      <div className='font-extrabold text-2xl'>
        Search result {'"'}
        {searchOptions.keyword}
        {'"'}
      </div>
      <div className='mt-2.5'>
        <Tabbar
          data={data}
          active={tab}
          clickHandler={param => setTab(param)}
        />
      </div>
      {tab === Tabs.NFTS && (
        <NFTsResult searchKey={searchOptions.keyword} artworks={artworks} />
      )}
      {tab === Tabs.KEYWORD && (
        <KeywordResult searchKey={searchOptions.keyword} />
      )}
      {(tab === Tabs.CREATORS || tab === Tabs.USERS) && (
        <CreatorsResult searchKey={searchOptions.keyword} />
      )}
      {tab === Tabs.FORUM_POSTS && <ForumPost />}
    </div>
  )
}
