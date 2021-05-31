import React, { useState } from 'react'
import svg_card from '../../legacy/assets/img/card.svg'
import svg_avatar from '../../legacy/assets/img/avatars/oval-2.svg'
import svg_camera from '../../legacy/assets/img/camera.svg'
import svg_radio from '../../legacy/assets/img/radio.svg'
import svg_copy from '../../legacy/assets/img/copy.svg'
import svg_plus from '../../legacy/assets/img/plus.svg'
import svg_facebook from '../../legacy/assets/img/facebook.svg'
import svg_twitter from '../../legacy/assets/img/twitter.svg'

export interface ProfileCardProps {
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileCard = ({
  editMode,
  setEditMode,
}: ProfileCardProps): JSX.Element => {
  const [name, setName] = useState('Dark Jaison')
  const [facebook, setFacebook] = useState('www.facebook.com/dirk_jaison')
  const [twitter, setTwitter] = useState('www.twitter.com/@dirk_jaison')

  return (
    <div className='flex flex-col pb-4 rounded-md shadow-sm bg-white w-315px h-full justify-between'>
      <div>
        <div className='bg-blue-300 h-32 rounded-t-lg relative'>
          <img src={svg_card} className='rounded-t-lg w-315px' />
          <div className='flex items-center justify-center w-30px h-30px absolute right-4 top-4 bg-gray-1f opacity-50 rounded-full cursor-pointer'>
            <img src={svg_camera} />
          </div>
          <div className='text-right w-82px absolute right-4 top-54px text-white text-12'>
            max 5 mb / min 1200x1000
          </div>
        </div>
        <div className='-mt-8 px-4 flex relative'>
          <div className='rounded-full border-4 border-white bg-pink-200 w-24 h-24'>
            <img src={svg_avatar} className='w-full' />
          </div>
          <div className='mt-12 pl-3 text-sm'>
            <div className='px-1 text-gray-71'>@zndrson</div>
            <div className='pt-2 text-blue-3f flex'>
              {truncateMiddle('0xc4c16a645a23ffb21a', 8, 4, '...')}
              <img src={svg_copy} className='pl-10px cursor-pointer' />
            </div>
          </div>
        </div>
        {/********* View Mode **********/}
        {!editMode && (
          <div className='flex flex-col px-5'>
            <div className='font-bold text-2xl py-2'>{name}</div>
            <div className='py-4 flex'>
              <img src={svg_facebook} className='cursor-pointer mr-3' />
              <img src={svg_twitter} className='cursor-pointer' />
            </div>
            <div
              className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 h-10 w-120px text-gray-b0 border-gray-b0'
              onClick={() => {
                setEditMode(true)
              }}
            >
              <i className='mr-2 fas fa-pencil'></i>
              Edit Profile
            </div>
          </div>
        )}
        {/********* Edit Mode ***********/}
        {editMode && (
          <div className='flex flex-col px-5 mt-5'>
            <LineEdit title='Name' value={name} onChange={setName} />
            <LineEdit
              title='Facebook'
              value={facebook}
              onChange={setFacebook}
            />
            <LineEdit title='Twitter' value={twitter} onChange={setTwitter} />
            <div className='text-blue-3f flex items-center'>
              <div className='w-3 h-3 flex items-center justify-center border rounded-full border-blue-3f mr-10px'>
                <img src={svg_plus} className='cursor-pointer' />
              </div>
              Add a website
            </div>
            <div
              className='cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 h-10 w-120px text-gray-fc bg-blue-3f border-blue-3f'
              onClick={() => {
                setEditMode(false)
              }}
            >
              Save Changes
            </div>
          </div>
        )}
      </div>
      <div className='text-gray-33 flex justify-center opacity-50 items-center'>
        <img src={svg_radio} className='mr-3' />
        Active display currency: PSL
      </div>
    </div>
  )
}

export interface LineEditProps {
  title: string
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

const LineEdit = ({ title, value, onChange }: LineEditProps): JSX.Element => {
  return (
    <div className='flex flex-col'>
      <div className='text-gray-71'>{title}</div>
      <div className='border rounded h-10 mt-2 mb-4 flex'>
        <input
          className='border-none rounded transparent outline-none h-full pl-4 text-gray-2d flex-grow'
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

function truncateMiddle(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr: string,
) {
  if (str === null) {
    return ''
  }
  const strLen = str.length
  // Setting default values
  frontLen = ~~frontLen // will cast to integer
  backLen = ~~backLen
  truncateStr = truncateStr || '&hellip;'
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= strLen ||
    backLen >= strLen ||
    frontLen + backLen >= strLen
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  }
  return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
}

export default ProfileCard
