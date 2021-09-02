import React, { useState, useEffect } from 'react'
import SVG from 'react-inlinesvg'
import cn from 'classnames'
import LineEdit from './LineEdit'
import ProfileCardFrame from './ProfileCardFrame'
import ProfileCardAvatar from './ProfileCardAvatar'
import { truncateMiddle } from 'common/utils/string'
import Tooltip from 'common/components/Tooltip/Tooltip'
import { Button } from 'common/components/Buttons'
import img_avatar from 'common/assets/images/avatar2-placeholder.png'
import ico_pencil from 'common/assets/icons/ico-pencil-transparent.svg'
import ChangeUsernameModal from './ChangeUsernameModal'

import { Clipboard, FacebookIcon, TwitterIcon } from 'common/components/Icons'
import Toggle from 'common/components/Toggle'
import { useCurrencyName } from 'common/hooks/appInfo'
import Select, { TOption } from 'common/components/Select'

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
  const currencyName = useCurrencyName()
  const data = {
    name: 'Williams Scottish',
    facebook: 'www.facebook.com/dirk_jaison',
    twitter: 'www.twitter.com/@dirk_jaison',
    walletId: '0xc4c16a645a23ffb21a',
    username: '@zndrson',
    nativeCurrency: editMode ? 'USD' : currencyName,
  }

  const [name, setName] = useState<string>(data.name)
  const [activeCurrency, setActiveCurrency] = useState<boolean>(false)
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
    <div className='flex flex-col pb-30px rounded-md shadow-44px bg-white w-315px justify-between max-h-672px'>
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
              <div className='font-extrabold text-26px leading-9 text-center text-gray-2d'>
                {name}
              </div>
              <div className='pt-2px text-gray-71 flex flex-center justify-center text-sm'>
                {truncateMiddle(data.walletId, 8, 4, '...')}
                <button className='ml-10px'>
                  <Clipboard size={12} className='text-gray-88' />
                </button>
              </div>
              <div className='py-4 flex justify-center space-x-2'>
                <button>
                  {facebook.length && (
                    <FacebookIcon size={20} className='text-gray-88' />
                  )}
                </button>
                <button>
                  {twitter.length && (
                    <TwitterIcon size={20} className='text-gray-88' />
                  )}
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
                      'ml-2.5 w-13px',
                      isEmpty ? 'fill-white' : 'fill-blue-3f',
                    )}
                  />
                </span>
              </Button>
              <div className='flex text-gray-71 text-sm mt-30px justify-center'>
                Native Currency: {nativeCurrency?.label}
              </div>
              <div className='flex justify-center mt-[184px]'>
                <Toggle
                  selected={activeCurrency}
                  toggleHandler={param => setActiveCurrency(param)}
                >
                  Active display currency: {currencyName}
                </Toggle>
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
                    <p className='mb-0 px-2 py-6px text-xs text-white text-sm'>
                      PastelID Identifier
                    </p>
                  }
                >
                  <span className='cursor-pointer text-gray-b9'>
                    {truncateMiddle(data.walletId, 8, 4, '...')}
                  </span>
                </Tooltip>
                <button className='pl-10px'>
                  <Clipboard size={12} className='text-gray-88' />
                </button>
              </div>
              <div className='space-y-6'>
                {edits.map((each, index) => (
                  <div key={index}>
                    <div className='text-gray-71 text-lg mb-2'>
                      {each.title}
                    </div>
                    <LineEdit value={each.value} onChange={each.onChange} />
                  </div>
                ))}
              </div>
              <div className='flex text-gray-71 text-sm mt-9 items-center justify-between'>
                <span className='text-lg text-gray-71'>Native Currency:</span>
                <Select
                  className='text-gray-4a flex-grow max-w-118px ml-5px'
                  selected={nativeCurrency}
                  options={nativeCurrencyOptions}
                  onChange={onNativeCurrencyChange}
                />
              </div>
            </div>
            <button
              className='filter hover:contrast-125 w-full cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-[71px] h-10 text-gray-fc bg-blue-3f border-blue-3f'
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
