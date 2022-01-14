import React, { useState, ChangeEvent } from 'react'

import { imageDimensions } from 'common/utils/image'
import { calcFileSize } from 'common/utils/file'
import { TGetResponse } from 'api/walletNode/userData'

import ico_camera from 'common/assets/icons/ico-camera.svg'

const LIMIT_SIZE = 5
const LIMIT_WIDTH = 1200
const LIMIT_HEIGHT = 1000

export type TProfileCardFrame = {
  editMode?: boolean
  userData?: TGetResponse
  user?: TGetResponse
  setUserData: (data?: TGetResponse) => void
}

function ProfileCardFrame({
  editMode,
  userData,
  user,
  setUserData,
}: TProfileCardFrame): JSX.Element {
  const [coverPhoto, setCoverPhoto] = useState<File>()
  const [error, setError] = useState('')

  const handleUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError('')
    const file = e.target.files?.[0]
    if (file) {
      const dimensions = await imageDimensions(file)
      const fileSize = calcFileSize(file.size)
      if (fileSize > LIMIT_SIZE) {
        setError(`File size exceeds ${LIMIT_SIZE} mb`)
      } else if (
        dimensions.height < LIMIT_HEIGHT ||
        dimensions.width < LIMIT_WIDTH
      ) {
        setError(
          `At least you can upload a ${LIMIT_WIDTH}x${LIMIT_HEIGHT} photo size`,
        )
      } else {
        setCoverPhoto(file)
        const reader = new FileReader()
        reader.onloadend = function () {
          const fileData = reader.result?.toString()
          if (userData && fileData) {
            setUserData({
              ...userData,
              cover_photo: {
                filename: file.name,
                content: fileData,
              },
            })
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className='bg-gray-21 h-139px rounded-t-lg relative'>
      {user?.cover_photo?.filename || coverPhoto?.path ? (
        <img
          src={user?.cover_photo?.filename || coverPhoto?.path}
          className='rounded-t-lg w-315px'
          alt='Cover photo'
        />
      ) : null}
      {error ? (
        <div className='text-red-fe absolute top-1 left-2 text-sm font-normal max-w-[97%]'>
          {error}
        </div>
      ) : null}
      {!editMode ? (
        <div className='flex items-center justify-center w-30px h-30px absolute right-4 top-4 bg-gray-1f opacity-50 rounded-full overflow-hidden z-50'>
          <img src={ico_camera} alt='Camera' />
        </div>
      ) : null}

      {editMode ? (
        <label className='flex items-center justify-center w-30px h-30px absolute right-4 top-4 bg-gray-1f opacity-50 rounded-full cursor-pointer overflow-hidden z-50'>
          <img src={ico_camera} alt='Camera' />
          <input
            type='file'
            accept='image/png, image/jpeg'
            className='absolute -top-48 w-1 h-1'
            onChange={handleUploadChange}
          />
        </label>
      ) : null}
      {!user?.cover_photo?.filename ? (
        <div className='text-right w-88px absolute right-4 top-54px text-white text-12px'>
          max {LIMIT_SIZE} mb /<br />
          min {LIMIT_WIDTH}x{LIMIT_HEIGHT}
        </div>
      ) : null}
    </div>
  )
}

export default ProfileCardFrame
