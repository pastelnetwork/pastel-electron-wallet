import React from 'react'
import cx from 'classnames'
import img_avatar_empty from 'common/assets/images/avatar-placeholder.svg'
import ico_camera from 'common/assets/icons/ico-camera.svg'

export type TProfileCardAvatar = {
  src: string
  isEmpty: boolean
}

const ProfileCardAvatar = ({
  src,
  isEmpty,
}: TProfileCardAvatar): JSX.Element => {
  return (
    <div className='rounded-full border-4 border-white bg-gray-e6 w-110px h-110px shadow-xs flex flex-col items-center justify-center overflow-hidden relative'>
      {!isEmpty && <img src={src} className='w-full' />}
      {isEmpty && <img src={img_avatar_empty} className='w-9' />}
      <div
        className={cx(
          isEmpty ? 'flex' : 'hidden',
          'hover:flex h-1/3 absolute bottom-0 flex-grow w-full bg-gray-71 justify-center items-center',
        )}
      >
        <img src={ico_camera} />
      </div>
    </div>
  )
}

export default ProfileCardAvatar
