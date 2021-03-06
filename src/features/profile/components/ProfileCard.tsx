import React, { useCallback } from 'react'
import { clipboard } from 'electron'

import StarRate from './StarRate'
import ProfileCardFrame from './ProfileCardFrame'
import { translate } from 'features/app/translations'
import Tooltip from 'common/components/Tooltip/Tooltip'

import svg_avatar from 'common/assets/images/avatar.svg'
import svg_copy from 'common/assets/icons/ico-copy2.svg'
import svg_plus from 'common/assets/icons/ico-plus-white.svg'
import svg_envelope from 'common/assets/icons/ico-envelope.svg'
import svg_location from 'common/assets/icons/ico-location.svg'
import svg_flag from 'common/assets/icons/ico-flag.svg'
import svg_facebook from 'common/assets/icons/ico-facebook.svg'
import svg_twitter from 'common/assets/icons/ico-twitter.svg'

export type TProfileCard = {
  isMyProfile: boolean
  username: string
  walletId: string
  reputation: number
  name: string
  description: string
  address: string
  social: {
    facebook: string
    twitter: string
  }
}

function truncateMiddle(
  str: string,
  frontLen: number,
  backLen: number,
  truncateStr = '&hellip;',
) {
  // Setting default values
  frontLen = Math.floor(frontLen)
  backLen = Math.floor(backLen)
  if (
    (frontLen === 0 && backLen === 0) ||
    frontLen >= str.length ||
    backLen >= str.length ||
    frontLen + backLen >= str.length
  ) {
    return str
  } else if (backLen === 0) {
    return str.slice(0, frontLen) + truncateStr
  }
  return str.slice(0, frontLen) + truncateStr + str.slice(str.length - backLen)
}

function ProfileCard({
  isMyProfile,
  username,
  walletId,
  reputation,
  name,
  description,
  address,
}: TProfileCard): JSX.Element {
  const handleCopy = useCallback(() => {
    clipboard.writeText(walletId)
  }, [walletId])

  const renderStarRate = () => (
    <div className='text-xs text-gray-71 pt-5 mb-2'>
      <div className='flex items-center justify-center w-full'>
        <StarRate rate={reputation} />
        <div className='pl-1.5 text-gray-71'>
          {reputation} {translate('reputationScore')}
        </div>
      </div>
    </div>
  )

  const renderCopyButton = () => (
    <button type='button' onClick={handleCopy} className='cursor-pointer'>
      <img
        src={svg_copy}
        className='pl-2.5 filter hover:contrast-200'
        alt='Copy'
      />
    </button>
  )

  const renderPastelIDIdentifier = () => (
    <div className='px-1 pt-0.5 text-gray-71 flex text-sm'>
      <Tooltip
        type='top'
        width={140}
        content={
          <p className='mb-0 px-2 py-6px text-white text-sm'>
            {translate('pastelIDIdentifier')}
          </p>
        }
      >
        <div>{truncateMiddle(walletId, 11, 4, '...')}</div>
      </Tooltip>
      <Tooltip
        type='top'
        width={160}
        content={
          <p className='mb-0 px-2 py-6px text-white text-sm'>
            {translate('copyToClipboard')}
          </p>
        }
      >
        {renderCopyButton()}
      </Tooltip>
    </div>
  )

  const renderUserInfo = () => (
    <div className='mt-3 pl-2.5 text-center'>
      <div className='px-1 pt-1 text-gray-71'>{username}</div>
      <div className='font-bold text-26px'>{name}</div>
      {renderPastelIDIdentifier()}
      <div className='pt-15px flex justify-center'>
        <img
          src={svg_facebook}
          className='cursor-pointer mr-3 filter hover:contrast-200'
          alt='Facebook'
        />
        <img
          src={svg_twitter}
          className='cursor-pointer filter hover:contrast-200'
          alt='Twitter'
        />
      </div>
    </div>
  )

  const renderUserAvatar = () => (
    <div className='rounded-full mx-auto border-5px border-white bg-pink-200 w-110px h-110px shadow-xs'>
      <img
        src={svg_avatar}
        className='rounded-full w-full h-full'
        alt='Avatar'
      />
    </div>
  )

  return (
    <div className='flex flex-col pb-28px rounded-md shadow-sm bg-white w-315px'>
      <ProfileCardFrame />
      <div className='-mt-61px px-5 mx-auto pb-2 z-10'>
        {renderUserAvatar()}
        {renderUserInfo()}
      </div>
      {isMyProfile && (
        <div className='flex flex-col px-5'>
          {renderStarRate()}

          <div className='text-sm text-gray-71 text-center'>{description}</div>
          <div className='text-sm text-gray-4a flex pt-3 justify-center'>
            <img
              src={svg_location}
              className='cursor-pointer pr-2 filter hover:contrast-200'
              alt='Location'
            />
            {address}
          </div>

          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-30px h-10 bg-blue-3f text-white hover:bg-blue-500'>
            <img src={svg_plus} className='mr-9px' alt='Plus' />
            {translate('follow')}
          </div>
          <div className='cursor-pointer border text-center text-sm rounded-2xl flex items-center justify-center mt-2.5 h-10 text-blue-3f border-blue-3f hover:border-blue-600'>
            <img src={svg_envelope} className='mr-9px' alt='Envelope' />
            {translate('message')}
          </div>
          <div className='cursor-pointer text-sm text-blue-3f pt-8 flex items-center justify-center filter hover:contrast-200'>
            <img src={svg_flag} className='mr-2 mt-1' alt='Flag' />
            {translate('report')}
          </div>
          <div className='text-gray-400 text-sm mt-3 mb-6 text-center'>
            {translate('memberSince')} May 15, 2021
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileCard
