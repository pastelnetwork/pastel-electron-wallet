import React /*, { CSSProperties }*/ from 'react'
import { TChatUser } from '../common'

export interface ChatUserAvatarProps {
  user?: TChatUser
  size?: number
  hideAvatar?: boolean
  hideOnline?: boolean
  extraClasses?: string
}

export function UserAvatar({
  size,
  extraClasses,
  user,
  hideOnline,
}: ChatUserAvatarProps): JSX.Element {
  const vSize = size ? size : 12
  const vExtraClasses = extraClasses || ''
  const avatarSize: string = vSize.toString() || ''
  return (
    <div
      className={`relative mr-5 flex-shrink-0 h-${avatarSize} w-${avatarSize} ${vExtraClasses}`}
    >
      {user && (
        <i
          className='inline-block rounded-full overflow-hidden w-full h-full border border-gray-200 bg-cover bg-center'
          style={{ backgroundImage: `url(${user.avatar})` }}
        ></i>
      )}
      {user && user.isOnline && !hideOnline && (
        <span className='inline-block rounded-full bg-green-500 w-1.5 h-1.5 absolute z-10 right-1 bottom-1'></span>
      )}
    </div>
  )
}
