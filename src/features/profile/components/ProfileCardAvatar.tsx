import React, { useState, ChangeEvent, useCallback } from 'react'
import cn from 'classnames'

import { TGetResponse } from 'api/walletNode/userData'

import img_avatar_empty from 'common/assets/images/avatar-placeholder.svg'
import ico_camera from 'common/assets/icons/ico-camera.svg'

export type TProfileCardAvatar = {
  src?: string
  editMode: boolean
  userData?: TGetResponse
  setUserData: (data?: TGetResponse) => void
}

function ProfileCardAvatar({
  src,
  editMode,
  userData,
  setUserData,
}: TProfileCardAvatar): JSX.Element {
  const [avatar, setAvatar] = useState<File>()

  const handleUploadChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      setAvatar(file)
      if (file) {
        const reader = new FileReader()
        reader.onloadend = function () {
          const fileData = reader.result?.toString()
          if (userData && fileData) {
            setUserData({
              ...userData,
              avatar_image: {
                filename: file.name,
                content: fileData,
              },
            })
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [userData],
  )

  return (
    <div className='rounded-full border-4 border-white bg-gray-e6 w-110px h-110px shadow-avatar flex flex-col items-center justify-center overflow-hidden relative'>
      <img
        src={avatar?.path || src || img_avatar_empty}
        className={cn(
          avatar?.path || (src && 'w-full'),
          !src && !avatar?.path && 'w-[46px]',
        )}
        alt='Profile avatar'
      />
      {!editMode && !src ? (
        <div className='flex hover:flex h-1/3 absolute bottom-0 flex-grow w-full bg-gray-21 justify-center items-center'>
          <img src={ico_camera} alt='Camera' />
        </div>
      ) : null}
      {editMode ? (
        <label className='flex cursor-pointer hover:flex h-1/3 absolute bottom-0 flex-grow w-full justify-center items-center bg-opacity-50 bg-gray-1f overflow-hidden z-50'>
          <img src={ico_camera} alt='Camera' className='cursor-pointer' />
          <input
            type='file'
            accept='image/png, image/jpeg'
            className='absolute -top-48 w-1 h-1'
            onChange={handleUploadChange}
          />
        </label>
      ) : null}
    </div>
  )
}

export default ProfileCardAvatar
