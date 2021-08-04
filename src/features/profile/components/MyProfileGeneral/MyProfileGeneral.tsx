import React, { useState, useEffect } from 'react'
import { Convert } from 'easy-currencies'
import getSymbolFromCurrency from 'currency-symbol-map'

import StarRate from '../StarRate'
import Categories from '../Categories'
import ProfileGeneralRow from '../ProfileGeneralRow'
import Tooltip from 'common/components/Tooltip/Tooltip'
import Select, { TOption } from '../Select/Select'

import NumberFormat from 'react-number-format'
import NSFWControls from './NSFWControls'

export type TCurrency = 'EUR' | 'CNY' | 'JPY' | 'GBP' | 'AUD' | 'NGN' | 'IDR'

export type TProfileGeneral = {
  editMode: boolean
  isEmpty: boolean
  nativeCurrency: TCurrency
}

const ProfileGeneral = ({
  editMode,
  isEmpty,
  nativeCurrency,
}: TProfileGeneral): JSX.Element => {
  const data = {
    location: 'New York, US',
    language: 'English',
    categories: ['Motion Graphics', 'Illustration', 'Abstract'],
    reputation: 4.89,
    highestFeeRecieved: { value: '136200', comment: 632 },
    totalSalesAmount: { value: '560600', comment: 211 },
    totalItemsSold: '124 Copies across 5 NFTs',
    bio:
      'I am a digital artist based in Paris, France. My work has been featured in various galleries in Paris and New York City. I love playing with the characteristics of light in all its forms, and I like to challenge the way color is normally perceived in nature. I use various tools to create my work, including Rhino for 3D modeling and and Maxwell for rendering, with other work done in Photoshop and Illustrator.',
  }

  if (isEmpty) {
    Object.assign(data, {
      categories: [],
      reputation: 0,
      highestFeeRecieved: { value: 0 },
      totalSalesAmount: { value: 0 },
      totalItemsSold: 0,
    })
  }

  const price = 15
  const [categories, setCategories] = useState<Array<string>>(data.categories)
  const [bio, setBio] = useState<string>(data.bio)
  const [location, setLocation] = useState<TOption | null>(locations[1])
  const [language, setLanguage] = useState<TOption | null>(languages[0])
  const [currentPSLPrice, setCurrentPSLPrice] = useState('0')

  useEffect(() => {
    setLocation(locations[isEmpty ? 0 : 1])
    setLanguage(languages[0])
    setBio(isEmpty ? 'None' : data.bio)
  }, [isEmpty])

  useEffect(() => {
    const getNativeCurrency = async (): Promise<void> => {
      if (!nativeCurrency) {
        return
      }

      const result = await Convert(price).from('USD').to(nativeCurrency)
      setCurrentPSLPrice(result.toFixed(2))
    }
    getNativeCurrency()
  }, [nativeCurrency])

  return (
    <div className='flex-grow w-full lg:w-3/5 pr-60px'>
      <div className='w-full space-y-4'>
        <ProfileGeneralRow title='Location'>
          {editMode ? (
            <Select
              className='text-gray-4a flex-grow shadow-4px'
              selected={location}
              options={locations}
              onChange={setLocation}
              autocomplete
            />
          ) : (
            <div className='flex flex-grow text-gray-4a'>{location?.label}</div>
          )}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Language'>
          {editMode ? (
            <Select
              className='text-gray-4a flex-grow shadow-4px'
              selected={language}
              options={languages}
              onChange={setLanguage}
            />
          ) : (
            <div className='flex flex-grow text-gray-4a'>English</div>
          )}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Categories'>
          {isEmpty ? (
            <span className='text-gray-4a font-medium text-base leading-5'>
              None
            </span>
          ) : (
            <>
              {editMode ? (
                <Categories value={categories} onChange={setCategories} />
              ) : (
                <div className='flex whitespace-pre-wrap text-gray-4a'>
                  {categories.join(', ')}
                </div>
              )}
            </>
          )}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Pastel Reputation Score'>
          <StarRate rate={data.reputation} />
          <div className='pl-2 text-gray-500'>{data.reputation.toFixed(2)}</div>
        </ProfileGeneralRow>
      </div>
      <div className='w-full mt-98px space-y-4'>
        <ProfileGeneralRow title='Highest Sale Price Received'>
          <div className='flex items-center'>
            {isEmpty ? (
              <span className='cursor-pointer text-gray-4a text-base leading-5'>
                0 PSL
              </span>
            ) : (
              <>
                <Tooltip
                  type='top'
                  width={220}
                  content={
                    <p className='mb-0 px-2 py-1 text-xs leading-5 text-gray-fc'>
                      ~{nativeCurrency && getSymbolFromCurrency(nativeCurrency)}
                      {currentPSLPrice}{' '}
                      <span className='italic font-normal'>
                        based on current PSL price
                      </span>
                    </p>
                  }
                >
                  <span className='cursor-pointer font-medium text-gray-4a text-base leading-5'>
                    <NumberFormat
                      value={data.highestFeeRecieved.value}
                      displayType='text'
                      thousandSeparator={true}
                    />{' '}
                    PSL
                  </span>
                </Tooltip>
                {data.highestFeeRecieved.comment && (
                  <span className='ml-15px bg-gray-e6 text-gray-4a rounded px-5px font-black text-sm leading-6'>
                    Top #{data.highestFeeRecieved.comment}
                  </span>
                )}
              </>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total Combined Sales'>
          <div className='flex items-center'>
            {isEmpty ? (
              <span className='cursor-pointer text-gray-4a text-base leading-5'>
                0 PSL
              </span>
            ) : (
              <>
                <Tooltip
                  type='top'
                  width={220}
                  content={
                    <p className='mb-0 px-2 py-1 text-xs leading-5 text-gray-fc'>
                      ~{nativeCurrency && getSymbolFromCurrency(nativeCurrency)}
                      {currentPSLPrice}{' '}
                      <span className='italic font-normal'>
                        based on current PSL price
                      </span>
                    </p>
                  }
                >
                  <span className='cursor-pointer text-gray-4a text-base leading-5'>
                    <NumberFormat
                      value={data.totalSalesAmount.value}
                      displayType='text'
                      thousandSeparator={true}
                    />{' '}
                    PSL
                  </span>
                </Tooltip>
                {data.totalSalesAmount.comment && (
                  <span className='ml-15px bg-gray-e6 text-gray-4a rounded px-5px font-black text-sm leading-6'>
                    Top #{data.totalSalesAmount.comment}
                  </span>
                )}
              </>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total NFTs Sold'>
          {isEmpty ? (
            <span className='text-base leading-5'>0 Copies across 0 NFTs</span>
          ) : (
            <span className='text-base leading-5'>{data.totalItemsSold}</span>
          )}
        </ProfileGeneralRow>
      </div>
      <div className='w-full mt-20 1200px:mb-0'>
        <div className='flex'>
          <div className='w-190px text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-3'>
          <div className='flex-grow text-gray-4a font-medium text-base leading-5'>
            {editMode ? (
              <div className='rounded bg-white py-6 px-4 shadow-4px h-216px'>
                <textarea
                  className='w-full rounded outline-none h-full resize-none text-base text-gray-4a font-normal leading-6'
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            ) : (
              bio
            )}
          </div>
        </div>
      </div>
      <NSFWControls />
    </div>
  )
}

const locations: Array<TOption> = [
  {
    label: 'None',
    value: 'None',
  },
  {
    label: 'New York, US',
    value: 'New York, US',
  },
  {
    label: 'California, US',
    value: 'California, US',
  },
]
const languages: Array<TOption> = [
  {
    label: 'English',
    value: '0',
  },
  {
    label: 'Spanish',
    value: '1',
  },
]

export default ProfileGeneral
