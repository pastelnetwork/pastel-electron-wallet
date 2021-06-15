import React from 'react'
import img_card from 'common/assets/images/profile-card-placeholder.svg'
import ico_camera from 'common/assets/icons/ico-camera.svg'

export type TProfileCardFrame = {
  isEmpty?: boolean
  editMode?: boolean
}

const ProfileCardFrame = ({
  isEmpty,
  editMode,
}: TProfileCardFrame): JSX.Element => {
  return (
    <div className='bg-blue-3f h-139px rounded-t-lg relative'>
      {!isEmpty && <img src={img_card} className='rounded-t-lg w-315px' />}
      {editMode && (
        <div className='flex items-center justify-center w-30px h-30px absolute right-4 top-4 bg-gray-1f opacity-50 rounded-full cursor-pointer'>
          <img src={ico_camera} />
        </div>
      )}
      {editMode && (
        <div className='text-right w-88px absolute right-4 top-54px text-white text-12px'>
          max 5 mb / min 1200x1000
        </div>
      )}
    </div>
  )
}

export default ProfileCardFrame
