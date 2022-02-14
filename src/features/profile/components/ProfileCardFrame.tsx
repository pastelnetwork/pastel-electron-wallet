import React, { useState, ChangeEvent, useCallback } from 'react'
import { toast } from 'react-toastify'
import cn from 'classnames'

import { walletNodeApi } from 'api/walletNode/walletNode.api'
import { imageDimensions } from 'common/utils/image'
import { calcFileSize } from 'common/utils/file'
import { TGetResponse } from 'api/walletNode/userData'
import { translate } from 'features/app/translations'

import ico_camera from 'common/assets/icons/ico-camera.svg'

const LIMIT_SIZE = 1
const LIMIT_WIDTH = 1200
const LIMIT_HEIGHT = 1000

export type TProfileCardFrame = {
  userData?: TGetResponse
  user?: TGetResponse
  handleUpdateUserData?: () => void
}

function ProfileCardFrame({
  userData,
  user,
  handleUpdateUserData,
}: TProfileCardFrame): JSX.Element {
  const [coverPhoto, setCoverPhoto] = useState<File>()
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const handleSaveUserCover = async (fileData: string, fileName: string) => {
    if (userData) {
      try {
        await walletNodeApi.userData.update({
          ...userData,
          categories: userData.categories.join(','),
          cover_photo: {
            filename: fileName,
            content: fileData,
          },
        })
        if (handleUpdateUserData) {
          handleUpdateUserData()
        }
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }
  }

  const handleUploadChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setError('')
      const file = e.target.files?.[0]
      if (file) {
        const dimensions = await imageDimensions(file)
        const fileSize = calcFileSize(file.size)
        if (fileSize > LIMIT_SIZE) {
          setError(translate('errorLimitFileSize', { size: LIMIT_SIZE }))
        } else if (
          dimensions.height < LIMIT_HEIGHT ||
          dimensions.width < LIMIT_WIDTH
        ) {
          setError(
            translate('errorLimitDimensions', {
              width: LIMIT_WIDTH,
              height: LIMIT_HEIGHT,
            }),
          )
        } else {
          setCoverPhoto(file)
          const reader = new FileReader()
          reader.onloadend = function () {
            const fileData = reader.result?.toString()
            if (fileData) {
              handleSaveUserCover(fileData, file.name)
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
      }
    },
    [userData],
  )

  return (
    <div className='bg-gray-21 h-139px rounded-t-lg relative overflow-hidden'>
      {user?.cover_photo?.filename || coverPhoto?.path ? (
        <img
          src={user?.cover_photo?.filename || coverPhoto?.path}
          className='rounded-t-lg w-315px'
          alt='Cover'
        />
      ) : null}
      {error ? (
        <div className='text-red-fe absolute top-1 left-2 text-sm font-normal max-w-[97%]'>
          {error}
        </div>
      ) : null}

      <label
        className={cn(
          'flex items-center justify-center w-30px h-30px absolute right-4 top-4 bg-gray-1f opacity-50 rounded-full cursor-pointer overflow-hidden z-50',
          isLoading && 'cursor-not-allowed',
        )}
      >
        <img src={ico_camera} alt='Camera' />
        <input
          type='file'
          accept='image/png, image/jpeg'
          className='absolute -top-48 w-1 h-1'
          onChange={handleUploadChange}
        />
      </label>
      {!user?.cover_photo?.filename ? (
        <div className='text-right w-88px absolute right-4 top-54px text-white text-12px'>
          {translate('max')} {LIMIT_SIZE} mb /<br />
          {translate('min')} {LIMIT_WIDTH}x{LIMIT_HEIGHT}
        </div>
      ) : null}
    </div>
  )
}

export default ProfileCardFrame
