import React, { useState, useCallback } from 'react'
import SVG from 'react-inlinesvg'
import { toast } from 'react-toastify'

import LineEdit from './LineEdit'
import ProfileCardFrame from './ProfileCardFrame'
import ProfileCardAvatar from './ProfileCardAvatar'
import { truncateMiddle } from 'common/utils/string'
import Tooltip from 'common/components/Tooltip/Tooltip'
import { Button } from 'common/components/Buttons'
import ico_pencil from 'common/assets/icons/ico-pencil-transparent.svg'
import ChangeUsernameModal from './ChangeUsernameModal'

import { Clipboard, FacebookIcon, TwitterIcon } from 'common/components/Icons'
import Toggle from 'common/components/Toggle'
import { useCurrencyName } from 'common/hooks/appInfo'
import Select, { TOption } from 'common/components/Select'
import { TGetResponse } from 'api/walletNode/userData'
import { validFacebookUrl, validTwitterUrl } from 'common/utils/validation'
import { walletNodeApi } from 'api/walletNode/walletNode.api'
import { changeLanguage, translate } from 'features/app/translations'

export type TErrorMessageProps = {
  control: string
  message: string
}

export type TProfileCard = {
  editMode: boolean
  setEditMode(value: boolean): void
  nativeCurrencyOptions: TOption[]
  nativeCurrency: TOption | null
  onNativeCurrencyChange: (val: TOption | null) => void
  user?: TGetResponse
  userData?: TGetResponse
  handleUpdateUserData: () => void
}

function ProfileCard({
  editMode,
  setEditMode,
  nativeCurrencyOptions,
  nativeCurrency,
  onNativeCurrencyChange,
  handleUpdateUserData,
  user,
  userData,
}: TProfileCard): JSX.Element {
  const currencyName = useCurrencyName()
  const username: string = user?.username || ''

  const data = {
    name: user?.realname || '',
    facebook: user?.facebook_link || '',
    twitter: user?.twitter_link || '',
    walletId: user?.artist_pastelid || '',
    username: username ? `@${username}` : '',
    nativeCurrency: user?.native_currency || currencyName,
  }

  const [name, setName] = useState<string>(data.name)
  const [activeCurrency, setActiveCurrency] = useState<boolean>(false)
  const [facebook, setFacebook] = useState<string>(data.facebook)
  const [twitter, setTwitter] = useState<string>(data.twitter)
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(
    false,
  )
  const [errorMsg, setErrorMsg] = useState<TErrorMessageProps[]>([])
  const [isLoading, setLoading] = useState(false)

  const edits = [
    {
      title: translate('name'),
      value: 'name',
      onChange: setName,
    },
    {
      title: translate('facebook'),
      value: 'facebook',
      onChange: setFacebook,
    },
    {
      title: translate('twitter'),
      value: 'twitter',
      onChange: setTwitter,
    },
  ]

  const handleToggleHandler = useCallback(
    (param: boolean) => {
      setActiveCurrency(param)
    },
    [activeCurrency],
  )

  const handleSaveChanges = useCallback(async () => {
    setErrorMsg([])
    if (userData) {
      const errors = []
      if (facebook) {
        if (!validFacebookUrl(facebook)) {
          errors.push({
            control: 'facebook',
            message: translate('notAValidURLFormat'),
          })
        }
      }

      if (twitter) {
        if (!validTwitterUrl(twitter)) {
          errors.push({
            control: 'twitter',
            message: translate('notAValidURLFormat'),
          })
        }
      }
      if (errors.length) {
        setErrorMsg(errors)
        return
      }

      setLoading(true)
      delete userData['username']
      try {
        if (userData?.primary_language) {
          changeLanguage(userData.primary_language)
          setEditMode(false)
        }
        await walletNodeApi.userData.update({
          ...userData,
          categories: userData.categories.join(','),
          realname: name,
          twitter_link: twitter,
          facebook_link: facebook,
        })
        handleUpdateUserData()
        setLoading(false)
        setEditMode(false)
        if (userData?.primary_language) {
          changeLanguage(userData.primary_language)
        }
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    }
  }, [editMode, userData, facebook, twitter, name])

  const handleOpenEditUsernameModal = useCallback(() => {
    setOpenEditUsernameModal(true)
  }, [openEditUsernameModal])

  const handleEditMode = useCallback(() => {
    setEditMode(true)
  }, [editMode])

  const onCloseChangeUsernameModal = useCallback(() => {
    setOpenEditUsernameModal(false)
  }, [])

  const renderPastelIDIdentifierAndCopyButton = () => (
    <div className='pt-2 pb-4 text-gray-71 flex flex-center'>
      <Tooltip
        type='top'
        width={140}
        content={
          <p className='mb-0 px-2 py-6px text-white text-sm'>
            {translate('pastelIDIdentifier')}
          </p>
        }
      >
        <span className='cursor-pointer text-gray-b9'>
          {truncateMiddle(data.walletId, 8, 4, '...')}
        </span>
      </Tooltip>
      <button className='pl-10px' type='button'>
        <Clipboard size={12} className='text-gray-88' />
      </button>
    </div>
  )

  const renderEditForm = () => (
    <div className='flex flex-col'>
      <div className='px-1 text-gray-71 text-center flex items-center justify-center'>
        {data.username}{' '}
        <SVG
          onClick={handleOpenEditUsernameModal}
          src={ico_pencil}
          className='ml-7px w-13px fill-blue-3f cursor-pointer'
        />
      </div>
      {renderPastelIDIdentifierAndCopyButton()}
      <div className='space-y-6'>
        {edits.map(({ value, title, onChange }) => (
          <div key={`${value}${title}`}>
            <div className='text-gray-71 text-lg mb-2'>{title}</div>
            <LineEdit
              onChange={onChange}
              error={errorMsg.find(e => e.control === value)}
            />
          </div>
        ))}
      </div>
      <div className='flex text-gray-71 text-sm mt-9 items-center justify-between'>
        <span className='text-lg text-gray-71'>
          {translate('nativeCurrency')}:
        </span>
        <Select
          className='text-gray-4a flex-grow max-w-118px ml-5px'
          selected={nativeCurrency}
          options={nativeCurrencyOptions}
          onChange={onNativeCurrencyChange}
        />
      </div>
    </div>
  )

  const renderEditProfileButton = () => (
    <Button
      variant='secondary'
      className='w-full font-medium mt-10px  text-sm leading-4'
      onClick={handleEditMode}
      disabled={!user}
    >
      <span className='flex items-center justify-center'>
        {translate('editProfile')}
        <SVG src={ico_pencil} className='ml-2.5 w-13px fill-blue-3f' />
      </span>
    </Button>
  )

  const renderCopyButton = () => (
    <button className='ml-10px' type='button'>
      <Clipboard size={12} className='text-gray-88' />
    </button>
  )

  const renderInfo = () => (
    <div>
      <div className='px-1 text-gray-71 text-center flex items-center justify-center'>
        {data.username}
      </div>
      <div className='font-extrabold text-26px leading-9 text-center text-gray-2d'>
        {name}
      </div>
      <Tooltip
        type='top'
        width={140}
        content={
          <p className='mb-0 px-2 py-6px text-white text-sm'>
            {translate('pastelIDIdentifier')}
          </p>
        }
      >
        <div className='pt-2px text-gray-71 flex flex-center justify-center text-sm'>
          {truncateMiddle(data.walletId, 8, 4, '...')}
          {renderCopyButton()}
        </div>
      </Tooltip>
      <div className='py-4 flex justify-center space-x-2'>
        <button type='button'>
          {facebook.length ? (
            <FacebookIcon size={20} className='text-gray-88' />
          ) : null}
        </button>
        <button type='button'>
          {twitter.length ? (
            <TwitterIcon size={20} className='text-gray-88' />
          ) : null}
        </button>
      </div>
      {renderEditProfileButton()}
      <div className='flex text-gray-71 text-sm mt-30px justify-center'>
        {translate('nativeCurrency')}: {nativeCurrency?.label}
      </div>
      <div className='flex justify-center mt-[184px]'>
        <Toggle selected={activeCurrency} toggleHandler={handleToggleHandler}>
          {translate('activeDisplayCurrency')}: {currencyName}
        </Toggle>
      </div>
    </div>
  )

  const renderProfileAvatar = () => (
    <div className='-mt-61px px-4 flex relative justify-center'>
      <ProfileCardAvatar
        src={user?.avatar_image?.content}
        userData={userData}
        handleUpdateUserData={handleUpdateUserData}
      />
    </div>
  )

  return (
    <div className='flex flex-col pb-30px rounded-md shadow-44px bg-white w-315px justify-between max-h-672px'>
      <div className='flex flex-col flex-grow'>
        <ProfileCardFrame
          userData={userData}
          user={user}
          handleUpdateUserData={handleUpdateUserData}
        />
        {renderProfileAvatar()}
        {!editMode && (
          <div className='flex flex-col px-5 pt-3 flex-grow justify-between'>
            {renderInfo()}
          </div>
        )}
        {editMode && (
          <div className='flex flex-grow flex-col px-5 mt-5 justify-between'>
            {renderEditForm()}
            <button
              className='filter hover:contrast-125 w-full cursor-pointer border text-center rounded-2xl flex items-center justify-center mt-[71px] h-10 text-gray-fc bg-blue-3f border-blue-3f'
              onClick={handleSaveChanges}
              type='button'
              disabled={isLoading}
            >
              {translate('saveChanges')}
            </button>
          </div>
        )}
      </div>
      <ChangeUsernameModal
        isOpen={openEditUsernameModal}
        handleClose={onCloseChangeUsernameModal}
      />
    </div>
  )
}

export default ProfileCard
