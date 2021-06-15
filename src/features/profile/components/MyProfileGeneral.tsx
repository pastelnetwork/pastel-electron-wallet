import React, { useState, useEffect } from 'react'
import StarRate from './StarRate'
import Categories from './Categories'
import ProfileGeneralRow from './ProfileGeneralRow'
import Tooltip from '../../../common/components/Tooltip/Tooltip'
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
    categories: ['motion graphics', 'illustration', 'abstract'],
    reputation: 3.89,
    buyerBans: 3,
    highestFeeRecieved: { value: '136,200,000', comment: 632 },
    totalSalesAmount: { value: '560,600,00', comment: 211 },
    totalItemsSold: 14,
    topCategoryPercentage: 'motion graphics 30%',
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
      totalItemsSold: 0,
      topCategoryPercentage: '0%',
    })
  }

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
    <div className='flex-grow w-full 1200px:w-3/5 1200px:pr-10 px-10'>
      <div className='w-full pb-4 space-y-4'>
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
              {categories.join(', ')}
            </div>
          )}
        </ProfileGeneralRow>

        <ProfileGeneralRow title='Buyer reputation'>
          <StarRate rate={data.reputation} />
          <div className='1200px:pl-2 text-gray-500'>
            {data.reputation} reputation
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Buyer bans'>
          <Tooltip content='Text placeholder' type='top' width={140}>
            <div className='text-blue-400 cursor-pointer'>3</div>
          </Tooltip>
        </ProfileGeneralRow>
      </div>
      <div className='w-full pb-4 pt-4 space-y-4'>
        <ProfileGeneralRow title='Highest fee recieved'>
          <div>
            {data.highestFeeRecieved.value}k PSL
            {data.highestFeeRecieved.comment && (
              <span className='ml-2 bg-gray-e6 rounded px-1 font-medium py-2px'>
                Top #{data.highestFeeRecieved.comment}
              </span>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total sales amount'>
          <div>
            {data.totalSalesAmount.value}k PSL
            {data.totalSalesAmount.comment && (
              <span className='ml-2 bg-gray-e6 rounded px-1 font-medium py-2px'>
                Top #{data.totalSalesAmount.comment}
              </span>
            )}
          </div>
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Total items sold'>
          {data.totalItemsSold}
        </ProfileGeneralRow>
        <ProfileGeneralRow title='Top category persentage'>
          {data.topCategoryPercentage}
        </ProfileGeneralRow>
      </div>
      <div className='w-full pt-6'>
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
    value: '0',
  },
  {
    label: 'Spanish',
    value: '1',
  },
]

export default ProfileGeneral
