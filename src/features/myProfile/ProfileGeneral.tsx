import React, { useState } from 'react'
import Rate from 'rc-rate'
import svg_plus from '../../legacy/assets/img/plus.svg'
import svg_cross from '../../legacy/assets/img/cross.svg'

export interface ProfileGeneralProps {
  editMode: boolean
}

const ProfileGeneral = ({ editMode }: ProfileGeneralProps): JSX.Element => {
  const [location, setLocation] = useState('New York, US')
  const [language, setLanguage] = useState('English')
  const [categories, setCategories] = useState([
    'motion graphics',
    'illustration',
    'abstract',
  ])
  return (
    <div className='flex-grow divide-y divide-grey-400 w-full xl:w-3/5 xl:pr-10 px-10'>
      {/* First Row Group of General */}
      <div className='w-full pb-10'>
        <div className='flex items-center'>
          <div className='w-190px text-sm text-gray-71 '>Location</div>
          {/********* View Mode **********/}
          {!editMode && (
            <div className='flex flex-grow text-gray-4a'>
              <div>{location}</div>
            </div>
          )}
          {/********* Edit Mode **********/}
          {editMode && <LineEdit value={location} onChange={setLocation} />}
        </div>
        <div className='flex pt-2 items-center'>
          <div className='w-190px text-sm text-gray-71'>Language</div>
          {/********* View Mode **********/}
          {!editMode && (
            <div className='flex flex-grow text-gray-4a'>English</div>
          )}
          {/********* Edit Mode **********/}
          {editMode && <LineEdit value={language} onChange={setLanguage} />}
        </div>
        <div className='flex pt-2'>
          <div className='w-190px min-w-190px text-sm text-gray-71'>
            Categories
          </div>
          {/********* View Mode **********/}
          {!editMode && (
            <div className='flex flex-grow text-gray-4a'>
              {categories.join(', ')}
            </div>
          )}
          {/********* Edit Mode **********/}
          {editMode && (
            <Categories value={categories} onChange={setCategories} />
          )}
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer reputation</div>
          <div className='flex flex-grow text-gray-4a flex-col xl:flex-row'>
            <Rate value={4.7} allowHalf={true} allowClear={false} />
            <div className='xl:pl-2 text-gray-500'>4.89 reputation</div>
          </div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Buyer bans</div>
          <div className='text-blue-400'>3</div>
        </div>
      </div>
      {/* Second Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Highest fee recieved
          </div>
          <div className='flex-grow text-gray-4a'>136,200,000k PSL (#632)</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total sales amount</div>
          <div className='flex-grow text-gray-4a'>560,600,00k PSL (#211)</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Total items sold</div>
          <div className='flex-grow text-gray-4a'>14</div>
        </div>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>
            Top category persentage
          </div>
          <div className='flex-grow text-gray-4a'>motion graphics 30%</div>
        </div>
      </div>
      {/* Third Row Group of General */}
      <div className='w-full py-10'>
        <div className='flex pt-2'>
          <div className='w-190px text-sm text-gray-71'>Bio</div>
        </div>
        <div className='flex pt-2'>
          <div className='flex-grow text-gray-4a'>
            I'am baby readymade mikshk tatooed actually activated charcoal
            godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper
            mug woke chia put a bird on it viral gentrify keytar synth. Twee
            chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out
            drinking vinegar pinterest mumblecore tousled occupy brunch whatever
            ugh.
          </div>
        </div>
      </div>
    </div>
  )
}

export interface LineEditProps {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

const LineEdit = ({ value, onChange }: LineEditProps): JSX.Element => {
  return (
    <div className='border rounded h-10 flex flex-grow shadow-editbox'>
      <input
        className='border-none rounded bg-transparent outline-none h-full pl-4 text-gray-4a flex-grow'
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export interface CategoriesProps {
  value: Array<string>
  onChange: React.Dispatch<React.SetStateAction<Array<string>>>
}

const Categories = ({ value, onChange }: CategoriesProps): JSX.Element => {
  return (
    <div className='border rounded flex flex-grow shadow-editbox flex-wrap p-2 items-center'>
      {value.map((category: string, index: number) => (
        <div
          className='px-2 mx-2 rounded-full text-gray-dd border border-gray-dd flex text-sm items-center mb-2'
          key={index}
        >
          <div className='h-6 text-gray-4a'>{category}</div>
          <div
            className='bg-gray-e6 ml-1 rounded-full h-4 w-4 flex justify-center items-center'
            onClick={() => onChange(value)}
          >
            <img src={svg_cross} className='cursor-pointer' />
          </div>
        </div>
      ))}
      <div className='w-3 h-3 flex items-center justify-center border rounded-full border-blue-3f mr-10px mb-2'>
        <img src={svg_plus} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default ProfileGeneral
