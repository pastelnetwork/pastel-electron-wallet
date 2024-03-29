import React, { useState, KeyboardEvent, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { CloseButton } from '../../components/Buttons'
import { Search } from '../Icons'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import SearchTag, { TSearchTagProps } from './SearchTag'
import RecentSearchItem, { TRecentSearchItem } from './RecentSearchItem'
import Banksy82 from '../../assets/images/banksy82_avatar.png'
import Banksyyyy from '../../assets/images/banksyyyy_avatar.png'
import ResultSearchRow from './ResultSearchRow'
import * as ROUTES from 'common/utils/constants/routes'
import { translate } from 'features/app/translations'

export default function SearchBar(): JSX.Element {
  const history = useHistory()
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<
    'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined
  >(undefined)
  const [inputText, setInputText] = useState<string>('')
  const onKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (['Enter', 'NumpadEnter'].includes(e.key)) {
        if (inputText) {
          setSelectedCategory(undefined)
          setInputFocused(false)
          history.push(ROUTES.SEARCH_RESULT, {
            keyword: inputText,
            selectedCategory,
          })
        }
      }
    },
    [inputText, selectedCategory],
  )

  const categories: Array<TSearchTagProps> = [
    {
      id: uuidv4(),
      label: translate('NFTs'),
      type: 'nfts',
    },
    {
      id: uuidv4(),
      label: translate('keywords'),
      type: 'keyword',
    },
    {
      id: uuidv4(),
      label: translate('creators'),
      type: 'creators',
    },
    {
      id: uuidv4(),
      label: translate('users'),
      type: 'users',
    },
    {
      id: uuidv4(),
      label: translate('forumPost'),
      type: 'forum',
    },
  ]

  const recent_searchs: Array<TRecentSearchItem> = [
    {
      id: uuidv4(),
      tagType: 'creators',
      label: 'Bansky',
    },
    {
      id: uuidv4(),
      label: 'End of an Era',
    },
    {
      id: uuidv4(),
      tagType: 'nfts',
      label: 'End of an Era',
    },
  ]

  const search_results = [
    {
      id: uuidv4(),
      name: 'Banksy82',
      img: Banksy82,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'theRealBanksy',
      img: Banksyyyy,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'Banksyyyy',
      img: Banksy82,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'IheartBanksy',
      img: Banksyyyy,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
    {
      id: uuidv4(),
      name: 'banksySuchlol',
      img: Banksyyyy,
      followers: 161,
    },
  ]

  const handleCloseButtonClick = useCallback(() => {
    setInputFocused(false)
    setSelectedCategory(undefined)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value)
    },
    [],
  )

  const handleInputFocus = useCallback(() => {
    setInputFocused(true)
  }, [])

  const clickedCategory = useCallback(
    (
      param: 'nfts' | 'keyword' | 'creators' | 'users' | 'forum' | undefined,
    ) => {
      setSelectedCategory(param)
    },
    [],
  )

  const handleResultSearchRowClick = useCallback((param: string) => {
    setInputText(param)
    setInputFocused(false)
    setSelectedCategory(undefined)
  }, [])

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
              ? translate('searchNFTCreatorUser')
              : translate('searchCreatorOrNFT')
          }
          onFocus={handleInputFocus}
          value={inputText}
          onChange={handleInputChange}
        />
        {selectedCategory &&
          categories
            .filter(item => item.type === selectedCategory)
            .map(category => (
              <div key={category.id} className='absolute top-2.5 left-[50px]'>
                <SearchTag
                  type={category.type}
                  label={category.label}
                  id={category.id}
                />
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
            onClick={handleCloseButtonClick}
            className='absolute md:right-5 right-3 top-[6px] w-7 h-7'
          />
        )}
        {inputFocused && (
          <div className='z-50 bg-white border border-line rounded-b-10px shadow-xl'>
            {selectedCategory === undefined ? (
              <div className='px-6 pt-4 pb-[46px]'>
                <div className='text-base'>{translate('imLookingFor')}</div>
                <div className='flex text-gray-4a text-medium mt-2'>
                  {categories.map(category => {
                    const label: string = category.label || ''
                    const type: string = category.type || ''
                    const id: string = category.id || ''
                    return (
                      <SearchTag
                        key={`${label}${type}${id}`}
                        type={category.type}
                        label={category.label}
                        clickHandle={clickedCategory}
                        id={category.id}
                      />
                    )
                  })}
                </div>
                <div className='mt-6'>
                  <div className='text-gray-71 text-base'>
                    {translate('recentSearches')}
                  </div>
                  <div className='mt-3'>
                    {recent_searchs.map(item => (
                      <RecentSearchItem
                        key={item.id}
                        tagType={item.tagType}
                        label={item.label}
                        id={item.id}
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
                    Bans — {translate('searchCreators')}
                  </div>
                </div>
                <div className='px-6 pt-[13px] pb-[29px] h-[292px] overflow-y-auto'>
                  {search_results
                    .filter(item => item.name.includes(inputText))
                    .map(item => (
                      <ResultSearchRow
                        key={item.id}
                        name={item.name}
                        image={item.img}
                        followers={item.followers}
                        handleClick={handleResultSearchRowClick}
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
