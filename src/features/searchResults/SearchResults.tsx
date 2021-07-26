import React, { useState } from 'react'

import Tabbar from './components/Tabbar'
import NFTsResult from './NFTsResult'
import KeywordResult from './KeywordResult'
import CreatorsResult from './CreatorsResult'
import ForumPost from './ForumPost'

const SearchResults = (): JSX.Element => {
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
  const searchKey = 'Bans'
  const [tab, setTab] = useState<number>(Tabs.NFTS)
  return (
    <div className='pt-[29px] px-[60px] min-h-98vh'>
      <div className='font-extrabold text-2xl'>Search result "{searchKey}"</div>
      <div className='mt-2.5'>
        <Tabbar
          data={data}
          active={tab}
          clickHandler={param => setTab(param)}
        />
      </div>
      {tab === Tabs.NFTS && <NFTsResult searchKey={searchKey} />}
      {tab === Tabs.KEYWORD && <KeywordResult searchKey={searchKey} />}
      {(tab === Tabs.CREATORS || tab === Tabs.USERS) && (
        <CreatorsResult searchKey={searchKey} />
      )}
      {tab === Tabs.FORUM_POSTS && <ForumPost />}
    </div>
  )
}

export default SearchResults
