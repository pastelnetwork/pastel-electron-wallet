import React, { useState, ChangeEvent, useCallback } from 'react'
import cn from 'classnames'
import { toast } from 'react-toastify'

import { TGetResponse } from 'api/walletNode/userData'
import { walletNodeApi } from 'api/walletNode/walletNode.api'
import img_avatar_empty from 'common/assets/images/avatar-placeholder.svg'
import ico_camera from 'common/assets/icons/ico-camera.svg'

export type TProfileCardAvatar = {
  src?: string
  userData?: TGetResponse
  handleUpdateUserData: () => void
}

function ProfileCardAvatar({
  src,
  userData,
  handleUpdateUserData,
}: TProfileCardAvatar): JSX.Element {
  const [avatar, setAvatar] = useState<File>()
  const [isLoading, setLoading] = useState(false)

  const handleSaveUserAvatar = async (fileData: string, fileName: string) => {
    if (userData) {
      try {
        await walletNodeApi.userData.update({
          ...userData,
          categories: userData.categories.join(','),
          avatar_image: {
            filename: fileName,
            content: fileData,
          },
        })
        handleUpdateUserData()
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }
  }

  const handleUploadChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      setAvatar(file)
      if (file) {
        const reader = new FileReader()
        reader.onloadend = function () {
          const fileData = reader.result?.toString()
          if (fileData) {
            handleSaveUserAvatar(fileData, file.name)
              .then(() => {
                // noop
              })
              .catch(() => {
                // noop
              })
              .finally(() => {
                // noop
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
      <label
        className={cn(
          'flex cursor-pointer hover:flex h-1/3 absolute bottom-0 flex-grow w-full justify-center items-center bg-opacity-50 bg-gray-1f overflow-hidden z-50',
          isLoading && 'cursor-not-allowed',
        )}
      >
        <img src={ico_camera} alt='Camera' className='cursor-pointer' />
        <input
          type='file'
          accept='image/png, image/jpeg'
          className='absolute -top-48 w-1 h-1'
          onChange={handleUploadChange}
        />
      </label>
    </div>
  )
}

export default ProfileCardAvatar
