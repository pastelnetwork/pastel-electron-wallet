import React /*, { CSSProperties }*/ from 'react'
import { TChatUser } from '../common'

export interface ChatUserAvatarProps {
  user?: TChatUser
  size?: number
  hideAvatar?: boolean
  hideOnline?: boolean
  extraClasses?: string
}

export const UserAvatar = (props: ChatUserAvatarProps): JSX.Element => {
  const size = props.size ? props.size : 12

  return (
    <div
      className={`relative mr-5 flex-shrink-0 h-${size} w-${size} ${props.extraClasses}`}
    >
      {props.user && (
        <i
          className='inline-block rounded-full overflow-hidden w-full h-full border border-gray-200 bg-cover bg-center'
          style={{ backgroundImage: `url(${props.user.avatar})` }}
        ></i>
      )}
      {props.user && props.user.isOnline && !props.hideOnline && (
        <span className='inline-block rounded-full bg-green-500 w-1.5 h-1.5 absolute z-10 right-1 bottom-1'></span>
      )}
    </div>
  )
}
