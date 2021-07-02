import React, { useState, useEffect } from 'react'
import SVG from 'react-inlinesvg'
import cn from 'classnames'
import LineEdit from './LineEdit'
import ProfileCardFrame from './ProfileCardFrame'
import ProfileCardAvatar from './ProfileCardAvatar'
import Select, { TOption } from './Select/Select'
import PastelUtils from 'common/utils/utils'
import Tooltip from 'common/components/Tooltip/Tooltip'
import { Button } from 'common/components/Buttons'
import img_avatar from 'common/assets/images/avatar2-placeholder.png'
import ico_copy from 'common/assets/icons/ico-copy2.svg'
import ico_facebook from 'common/assets/icons/ico-facebook.svg'
import ico_twitter from 'common/assets/icons/ico-twitter.svg'
import ico_pencil from 'common/assets/icons/ico-pencil-transparent.svg'
import ChangeUsernameModal from './ChangeUsernameModal'

export type TProfileCard = {
  editMode: boolean
  setEditMode(value: boolean): void
  isEmpty: boolean
  nativeCurrencyOptions: TOption[]
  nativeCurrency: TOption | null
  onNativeCurrencyChange: (val: TOption | null) => void
}

const ProfileCard = ({
  editMode,
  setEditMode,
  isEmpty,
  nativeCurrencyOptions,
  nativeCurrency,
  onNativeCurrencyChange,
}: TProfileCard): JSX.Element => {
  const data = {
    name: 'Williams Scottish',
    facebook: 'www.facebook.com/dirk_jaison',
    twitter: 'www.twitter.com/@dirk_jaison',
    walletId: '0xc4c16a645a23ffb21a',
    username: '@zndrson',
    nativeCurrency: editMode ? 'USD' : 'PSL',
  }

  const [name, setName] = useState<string>(data.name)
  const [facebook, setFacebook] = useState<string>(data.facebook)
  const [twitter, setTwitter] = useState<string>(data.twitter)
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(
    false,
  )

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
    <div className='flex flex-col pb-4 rounded-md shadow-44px bg-white w-315px h-full justify-between max-h-750px'>
      <div className='flex flex-col flex-grow'>
        <ProfileCardFrame isEmpty={isEmpty} editMode={isEmpty || editMode} />
        <div className='-mt-61px px-4 flex relative justify-center'>
          <ProfileCardAvatar
            isEmpty={isEmpty}
            editMode={editMode}
            src={img_avatar}
          />
        </div>
        {!editMode && (
          <div className='flex flex-col px-5 pt-3 flex-grow justify-between'>
            <div>
              <div className='px-1 text-gray-71 text-center flex items-center justify-center'>
                {data.username}
              </div>
              <div className='font-bold text-26px leading-9 text-center'>
                {name}
              </div>
              <div className='pt-2px text-gray-71 flex flex-center justify-center'>
                {PastelUtils.truncateMiddle(data.walletId, 8, 4, '...')}
                <button className='ml-10px'>
                  <img src={ico_copy} className='cursor-pointer' />
                </button>
              </div>
              <div className='py-4 flex justify-center space-x-2'>
                <button>
                  <img
                    src={ico_facebook}
                    hidden={!facebook.length}
                    className='cursor-pointer w-20px h-20px'
                  />
                </button>
                <button>
                  <img
                    src={ico_twitter}
                    hidden={!twitter.length}
                    className='cursor-pointer w-20px h-20px ml-2px'
                  />
                </button>
              </div>
              <Button
                variant={`${!isEmpty ? 'secondary' : 'default'}`}
                className={cn(
                  'w-full font-medium mt-10px',
                  isEmpty && 'text-white text-sm leading-4 bg-blue-3f',
                )}
                onClick={() => setEditMode(true)}
              >
                <span className='flex items-center justify-center'>
                  Edit Profile
                  <SVG
                    src={ico_pencil}
                    className={cn(
                      'ml-6px w-13px',
                      isEmpty ? 'fill-white' : 'fill-blue-3f',
                    )}
                  />
                </span>
              </Button>
              <div className='flex text-gray-71 text-sm mt-30px'>
                Native Currency: {nativeCurrency?.label}
              </div>
            </div>
          </div>
        )}
        {editMode && (
          <div className='flex flex-grow flex-col px-5 mt-5 justify-between'>
            <div className='flex flex-col'>
              <div className='px-1 text-gray-71 text-center flex items-center justify-center'>
                {data.username}{' '}
                <SVG
                  onClick={() => setOpenEditUsernameModal(true)}
                  src={ico_pencil}
                  className='ml-7px w-13px fill-blue-3f cursor-pointer'
                />
              </div>
              <div className='pt-2 pb-4 text-gray-71 flex flex-center'>
                <Tooltip
                  type='top'
                  width={114}
                  content={
                    <p className='mb-0 px-2 py-6px text-xs text-white'>
                      PastelID Identifier
                    </p>
                  }
                >
                  <span className='cursor-pointer'>
                    {PastelUtils.truncateMiddle(data.walletId, 8, 4, '...')}
                  </span>
                </Tooltip>
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
              <div className='flex text-gray-71 text-sm mt-28px items-center'>
                Native Currency:
                <Select
                  className='text-gray-4a flex-grow max-w-84px ml-5px'
                  selected={nativeCurrency}
                  options={nativeCurrencyOptions}
                  onChange={onNativeCurrencyChange}
                />
              </div>
            </div>
            <button
              className='filter hover:contrast-125 w-full cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-2 h-10 text-gray-fc bg-blue-3f border-blue-3f'
              onClick={() => {
                setEditMode(false)
              }}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
      <ChangeUsernameModal
        isOpen={openEditUsernameModal}
        handleClose={() => setOpenEditUsernameModal(false)}
      />
    </div>
  )
}

export default ProfileCard
