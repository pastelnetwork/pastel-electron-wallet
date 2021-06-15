import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import LineEdit from './LineEdit'
import ProfileCardFrame from './ProfileCardFrame'
import ProfileCardAvatar from './ProfileCardAvatar'
import PastelUtils from 'common/utils/utils'
import Toggle from 'common/components/Toggle/Toggle'
import img_avatar from 'common/assets/images/avatar2-placeholder.png'
import ico_copy from 'common/assets/icons/ico-copy2.svg'
import ico_facebook from 'common/assets/icons/ico-facebook.svg'
import ico_twitter from 'common/assets/icons/ico-twitter.svg'
import ico_pencil from 'common/assets/icons/ico-pencil.svg'

export type TProfileCard = {
  editMode: boolean
  setEditMode(value: boolean): void
  isEmpty: boolean
  setEmpty(value: boolean): void
}

const ProfileCard = ({
  editMode,
  setEditMode,
  isEmpty,
  setEmpty,
}: TProfileCard): JSX.Element => {
  const data = {
    name: 'Williams Scottish',
    facebook: 'www.facebook.com/dirk_jaison',
    twitter: 'www.twitter.com/@dirk_jaison',
    walletId: '0xc4c16a645a23ffb21a',
    username: '@zndrson',
  }

  const [name, setName] = useState<string>(data.name)
  const [facebook, setFacebook] = useState<string>(data.facebook)
  const [twitter, setTwitter] = useState<string>(data.twitter)

  useEffect(() => {
    setFacebook(isEmpty ? '' : data.facebook)
    setTwitter(isEmpty ? '' : data.twitter)
  }, [isEmpty])

  const edits = [
    {
      title: 'Name',
      value: name,
      onChange: setName,
    },
    {
      title: 'Facebook',
      value: facebook,
      onChange: setFacebook,
    },
    {
      title: 'Twitter',
      value: twitter,
      onChange: setTwitter,
    },
  ]

  return (
    <div className='flex flex-col pb-4 rounded-md shadow-sm bg-white w-315px h-full justify-between max-h-750px'>
      <div className='flex flex-col flex-grow'>
        <ProfileCardFrame isEmpty={isEmpty} editMode={isEmpty || editMode} />
        <div className='-mt-61px px-4 flex relative justify-center'>
          <ProfileCardAvatar isEmpty={isEmpty} src={img_avatar} />
        </div>
        {!editMode && (
          <div className='flex flex-col px-5 pt-4 flex-grow justify-between'>
            <div>
              <div className='px-1 text-gray-71 text-center'>
                {data.username}
              </div>
              <div className='font-bold text-2xl py-2 text-center'>{name}</div>
              <div className='pt-2 text-gray-71 flex flex-center'>
                {PastelUtils.truncateMiddle(data.walletId, 8, 4, '...')}
                <button className='ml-10px'>
                  <img src={ico_copy} className='cursor-pointer' />
                </button>
              </div>
              <div className='py-4 flex justify-center space-x-3'>
                <button>
                  <img
                    src={ico_facebook}
                    hidden={!facebook.length}
                    className='cursor-pointer'
                  />
                </button>
                <button>
                  <img
                    src={ico_twitter}
                    hidden={!twitter.length}
                    className='cursor-pointer'
                  />
                </button>
              </div>
              <button
                className={cx(
                  'filter hover:contrast-125 w-full border text-center rounded-2xl flex items-center justify-center mt-2 h-10 w-120px',
                  isEmpty
                    ? 'text-white bg-blue-3f'
                    : 'text-blue-3f border-blue-3f',
                )}
                onClick={() => {
                  setEditMode(true)
                }}
              >
                Edit Profile
                <img src={ico_pencil} className='ml-1 w-13px cursor-pointer' />
              </button>
            </div>
            <div className='flex flex-center pb-4 text-gray-71'>
              <Toggle
                selected={!isEmpty}
                toggleHandler={() => setEmpty(!isEmpty)}
                selectedClass='bg-blue-3f'
              >
                Active display currency: PSL
              </Toggle>
            </div>
          </div>
        )}
        {editMode && (
          <div className='flex flex-grow flex-col px-5 mt-5 justify-between'>
            <div className='flex flex-col'>
              <div className='px-1 text-gray-71 text-center'>
                {data.username}
              </div>
              <div className='pt-2 pb-4 text-gray-71 flex flex-center'>
                {PastelUtils.truncateMiddle(data.walletId, 8, 4, '...')}
                <button className='pl-10px'>
                  <img src={ico_copy} className='cursor-pointer' />
                </button>
              </div>
              <div className='space-y-4'>
                {edits.map((each, index) => (
                  <div key={index}>
                    <div className='text-gray-71 mb-2'>{each.title}</div>
                    <LineEdit value={each.value} onChange={each.onChange} />
                  </div>
                ))}
              </div>
            </div>
            <button
              className='filter hover:contrast-125 w-full cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 h-10 w-120px text-gray-fc bg-blue-3f border-blue-3f'
              onClick={() => {
                setEditMode(false)
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
