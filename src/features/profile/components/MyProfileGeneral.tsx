import React, { useState, useEffect } from 'react'
import StarRate from './StarRate'
import Categories from './Categories'
import ProfileGeneralRow from './ProfileGeneralRow'
import Tooltip from 'common/components/Tooltip/Tooltip'
import Select, { TOption } from './Select/Select'

export type TProfileGeneral = {
  editMode: boolean
  isEmpty: boolean
}

const ProfileGeneral = ({
  editMode,
  isEmpty,
}: TProfileGeneral): JSX.Element => {
  const data = {
    location: 'New York, US',
    language: 'English',
    categories: ['Motion Graphics', 'Illustration', 'Abstract'],
    reputation: 4.89,
    highestFeeRecieved: { value: '136,200', comment: 632 },
    totalSalesAmount: { value: '560,600', comment: 211 },
    totalNFTsSold: '124 Copies across 5 NFTs',
    bio:
      'I am a digital artist based in Paris, France. My work has been featured in various galleries in Paris and New York City. I love playing with the characteristics of light in all its forms, and I like to challenge the way color is normally perceived in nature. I use various tools to create my work, including Rhino for 3D modeling and and Maxwell for rendering, with other work done in Photoshop and Illustrator.',
  }

  if (isEmpty) {
    Object.assign(data, {
      categories: [],
      reputation: 0,
      buyerBans: 0,
      highestFeeRecieved: { value: 0 },
      totalSalesAmount: { value: 0 },
      totalNFTsSold: '0 Copies across 0 NFTs',
      topCategoryPercentage: '0%',
    })
  }

  useEffect(() => {
    setCategories(data.categories)
  }, [isEmpty])

  const [categories, setCategories] = useState<Array<string>>(data.categories)
  const [bio, setBio] = useState<string>(data.bio)
  const [location, setLocation] = useState<TOption | null>(locations[1])
  const [language, setLanguage] = useState<TOption | null>(languages[0])

  useEffect(() => {
    setLocation(locations[isEmpty ? 0 : 1])
    setLanguage(languages[0])
    setBio(isEmpty ? 'None' : data.bio)
  }, [isEmpty])

  return (
    <div className='flex-grow w-full 1200px:w-3/5 1200px:pr-10 px-10 space-y-24'>
      <div className='w-full space-y-4'>
        <ProfileGeneralRow title='Location'>
          {editMode ? (
            <Select
              className='text-gray-4a flex-grow'
              selected={location}
              options={locations}
              onChange={setLocation}
              autocomplete={true}
            />
          ) : (
            <div className='flex flex-grow text-gray-4a'>{location?.label}</div>
          )}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Language'>
          {editMode ? (
            <Select
              className='text-gray-4a flex-grow'
              selected={language}
              options={languages}
              onChange={setLanguage}
              autocomplete={true}
            />
          ) : (
            <div className='flex flex-grow text-gray-4a'>English</div>
          )}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Categories'>
          {editMode ? (
            <Categories value={categories} onChange={setCategories} />
          ) : (
            <div className='flex whitespace-pre-wrap text-gray-4a'>
              {categories.length == 0 ? 'None' : categories.join(', ')}
            </div>
          )}
        </ProfileGeneralRow>

        <ProfileGeneralRow title='Buyer reputation'>
          <StarRate rate={data.reputation} />
          <div className='1200px:pl-2 text-gray-500 text-sm flex items-center'>
            {data.reputation.toFixed(2)}
          </div>
        </ProfileGeneralRow>
      </div>
      <div className='w-full space-y-4'>
        <ProfileGeneralRow title='Highest fee recieved'>
          <div className='flex'>
            <Tooltip
              content='-$681 based on current PSL price'
              classnames='text-12px'
              type='top'
              width={200}
            >
              <div className='cursor-pointer'>
                {data.highestFeeRecieved.value} PSL
              </div>
            </Tooltip>
            {data.highestFeeRecieved.comment && (
              <span className='ml-2 bg-gray-e6 rounded px-1 font-medium py-2px'>
                Top #{data.highestFeeRecieved.comment}
              </span>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total sales amount'>
          <div className='flex'>
            <Tooltip
              content='-$681 based on current PSL price'
              classnames='text-12px'
              type='top'
              width={200}
            >
              <div className='cursor-pointer'>
                {data.totalSalesAmount.value} PSL
              </div>
            </Tooltip>
            {data.totalSalesAmount.comment && (
              <span className='ml-2 bg-gray-e6 rounded px-1 font-medium py-2px'>
                Top #{data.totalSalesAmount.comment}
              </span>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total NFTs Sold'>
          {data.totalNFTsSold}
        </ProfileGeneralRow>
      </div>
      <div className='w-full'>
        <div className='flex pt-2'>
          <div className='w-190px text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-2'>
          <div className='flex-grow text-gray-4a '>
            {editMode ? (
              <div className='shadow-xs rounded bg-white p-4 pb-2'>
                <textarea
                  className='w-full rounded outline-none h-220px'
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                />
              </div>
            ) : (
              <div className='h-220px'>{bio}</div>
            )}
          </div>
        </div>
      </div>
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
    value: 'English',
  },
  {
    label: 'Spanish',
    value: 'English',
  },
]

export default ProfileGeneral
