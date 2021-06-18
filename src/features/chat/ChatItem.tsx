import React /*, { CSSProperties }*/ from 'react'
import cn from 'classnames'
import { formatTime } from '../../common/utils/format'
import { TChatMessageProps } from './ChatMessage'
import { UserAvatar } from './components/UserAvatar'
import styles from './Chat.module.css'

export type TChatItemProps = {
  id: number
  title: string
  messages: TChatMessageProps[]
  onClick?: (id: number) => void
  isActive?: boolean
}

export const ChatItem = (props: TChatItemProps): JSX.Element => {
  const onClickMe = () => {
    if (props.onClick) {
      props.onClick(props.id)
    }
  }

  const lastMessage = props.messages.length
    ? props.messages[props.messages.length - 1]
    : null

  return (
    <div
      className={cn(
        'bg-white rounded-lg my-3 py-2 px-4 flex cursor-pointer',
        styles.chatItem,
        props.isActive ? styles.chatActive : '',
      )}
      onClick={onClickMe}
    >
      <div className='flex items-center'>
        <UserAvatar user={lastMessage?.sender} />
      </div>
      <div className='flex-grow min-w-0'>
        <div className='text-xs text-gray-300 text-right'>
          {lastMessage ? formatTime(lastMessage.date) : ''}
        </div>
        <div className='text-base text-gray-600 font-extrabold overflow-hidden overflow-ellipsis whitespace-nowrap'>
          {props.title}
        </div>
        <div className='overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-400 font-medium'>
          {lastMessage ? lastMessage.text : ''}
        </div>
        <div className='text-right h-2 relative'>
          {lastMessage && lastMessage.unread && (
            <i className='inline-block rounded-full bg-green-500 w-1.5 h-1.5 absolute right-0 bottom-0'></i>
          )}
        </div>
      </div>
    </div>
  )
}
