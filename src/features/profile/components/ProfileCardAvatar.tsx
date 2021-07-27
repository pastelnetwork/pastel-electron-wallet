import React from 'react'
import cn from 'classnames'
import img_avatar_empty from 'common/assets/images/avatar-placeholder.svg'
import ico_camera from 'common/assets/icons/ico-camera.svg'

export type TProfileCardAvatar = {
  src: string
  isEmpty: boolean
  editMode: boolean
}

const ProfileCardAvatar = ({
  src,
  isEmpty,
  editMode,
}: TProfileCardAvatar): JSX.Element => {
  return (
    <div className='rounded-full border-4 border-white bg-gray-e6 w-110px h-110px shadow-avatar flex flex-col items-center justify-center overflow-hidden relative'>
      {!isEmpty && <img src={src} className='w-full' />}
      {isEmpty && <img src={img_avatar_empty} className='w-9' />}
      <div
        className={cn(
          isEmpty || editMode ? 'flex' : 'hidden',
          'hover:flex h-1/3 absolute bottom-0 flex-grow w-full bg-gray-71 justify-center items-center',
          editMode && 'bg-opacity-50 bg-gray-1f',
        )}
      >
        <img src={ico_camera} />
      </div>
    </div>
  )
}

export default ProfileCardAvatar
