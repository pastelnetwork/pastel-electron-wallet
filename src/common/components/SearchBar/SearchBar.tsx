import React, { useState, KeyboardEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { CloseButton } from '../../components/Buttons'
import { Search } from '../Icons'
import cn from 'classnames'
import SearchTag, { TSearchTagProps } from './SearchTag'
import RecentSearchItem, { TRecentSearchItem } from './RecentSearchItem'
import Banksy82 from '../../assets/images/banksy82_avatar.png'
import Banksyyyy from '../../assets/images/banksyyyy_avatar.png'
import ResultSearchRow from './ResultSearchRow'
import * as ROUTES from 'common/utils/constants/routes'

const SearchBar = (): JSX.Element => {
  const history = useHistory()
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<
    'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  >(undefined)
  const [inputText, setInputText] = useState<string>('')
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'NumpadEnter'].includes(e.key)) {
      setSelectedCategory(undefined)
      setInputFocused(false)
      history.push(ROUTES.SEARCH_RESULT)
    }
  }

  const categories: Array<TSearchTagProps> = [
    {
      label: 'NFTs',
      type: 'nfts',
    },
    {
      label: 'Keywords',
      type: 'keyword',
    },
    {
      label: 'Creators',
      type: 'creators',
    },
    {
      label: 'Users',
      type: 'users',
    },
    {
      label: 'Forum Post',
      type: 'forum',
    },
  ]

  const recent_searchs: Array<TRecentSearchItem> = [
    {
      tagType: 'creators',
      label: 'Bansky',
    },
    {
      label: 'End of an Era',
    },
    {
      tagType: 'nfts',
      label: 'End of an Era',
    },
  ]

  const search_results = [
    {
      name: 'Banksy82',
      img: Banksy82,
      followers: 161,
    },
    {
      name: 'theRealBanksy',
      img: Banksyyyy,
      followers: 161,
    },
    {
      name: 'Banksyyyy',
      img: Banksy82,
      followers: 161,
    },
    {
      name: 'IheartBanksy',
      img: Banksyyyy,
      followers: 161,
    },
    {
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
    {
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
    {
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
  ]

  const clickedCategory = (
    param: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined,
  ) => {
    setSelectedCategory(param)
  }

  return (
    <div
      className={cn(
        'flex-center md:flex-grow md:max-w-sm xl:max-w-lg',
        inputFocused
          ? 'ml-6 1200px:ml-10 xl:ml-68px'
          : 'ml-4 md:ml-6 1200px:ml-10 xl:ml-68px w-[44%]',
      )}
    >
      <div
        className={cn(
          'relative custom-div z-10',
          inputFocused
            ? 'fixed top-4 left-[300px] md:left-[422px]'
            : 'w-full mr-2 md:mr-0',
        )}
      >
        <input
          className={cn(
            selectedCategory ? 'pl-[170px]' : 'px-3 md:pl-46px md:pr-5',
            'placeholder-gray-b0 h-41px',
            inputFocused
              ? 'w-[560px] lg:w-[701px] bg-white bg-opacity-100 z-100 border-gray-f2 border rounded-t-10px h-[50px]'
              : 'w-full md:w-300px lg:w-300px xl:w-352px bg-opacity-50 rounded-full bg-gray-f2',
          )}
          onKeyDown={onKey}
          placeholder={
            inputFocused
              ? 'Search NFT, Creator, User, etc'
              : 'Search creator or NFT'
          }
          onFocus={() => {
            setInputFocused(true)
          }}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
        {selectedCategory &&
          categories
            .filter(item => item.type === selectedCategory)
            .map((category, index) => (
              <div key={index} className='absolute top-2.5 left-[50px]'>
                <SearchTag type={category.type} label={category.label} />
              </div>
            ))}

        <Search
          className={cn(
            'w-4 absolute left-5 hidden md:block',
            inputFocused ? 'top-4' : 'top-3',
          )}
        />
        {inputFocused && (
          <CloseButton
            onClick={() => {
              setInputFocused(false)
              setSelectedCategory(undefined)
            }}
            className='absolute md:right-5 right-3 top-3 w-7 h-7'
          />
        )}
        {inputFocused && (
          <div className='z-50 bg-white border border-line rounded-b-10px shadow-xl'>
            {selectedCategory === undefined ? (
              <div className='px-6 pt-4 pb-[46px]'>
                <div className='text-base'>I'm looking for</div>
                <div className='flex text-gray-4a text-medium mt-2'>
                  {categories.map((category, index) => (
                    <SearchTag
                      key={index}
                      type={category.type}
                      label={category.label}
                      clickHandle={param => clickedCategory(param)}
                    />
                  ))}
                </div>
                <div className='mt-6'>
                  <div className='text-gray-71 text-base'>Recent searches</div>
                  <div className='mt-3'>
                    {recent_searchs.map((item, index) => (
                      <RecentSearchItem
                        key={index}
                        tagType={item.tagType}
                        label={item.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className='flex py-[9px] bg-gray-33 rounded px-6 items-center'>
                  <Search className='text-white mr-2.5' size={16} />
                  <div className='text-base font-medium text-gray-f8'>
                    Bans — Search Creators
                  </div>
                </div>
                <div className='px-6 pt-[13px] pb-[29px] h-[292px] overflow-y-auto'>
                  {search_results
                    .filter(item => item.name.includes(inputText))
                    .map((item, index) => (
                      <ResultSearchRow
                        key={index}
                        name={item.name}
                        image={item.img}
                        followers={item.followers}
                        handleClick={param => {
                          setInputText(param)
                          setInputFocused(false)
                          setSelectedCategory(undefined)
                        }}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
