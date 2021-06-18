import React /*, { CSSProperties }*/ from 'react'
import { formatTime } from '../../common/utils/format'
import cn from 'classnames'
import styles from './Chat.module.css'
import { TChatUser } from './common'
import { UserAvatar } from './components/UserAvatar'

export type TChatMessageProps = {
  text?: string
  sender: TChatUser
  date: Date
  unread: boolean
  isCurUserMessage?: boolean
  showAvatar?: boolean
  attachments?: string[] //images only? any files?
  onSaveAttachment?: (url: string) => void
}

export const ChatMessage = (props: TChatMessageProps): JSX.Element => {
  const prepareFileThumb = (url: string) => {
    // TODO: default icons for non-images?
    return url
  }

  const saveAttachment = (url: string) => {
    if (props.onSaveAttachment) {
      props.onSaveAttachment(url)
    }
  }

  return (
    <div className={cn('flex', props.isCurUserMessage ? 'justify-end' : '')}>
      <UserAvatar
        extraClasses={props.isCurUserMessage ? 'order-3 ml-5 mr-0' : ''}
        size={9}
        user={props.sender}
        hideAvatar={!props.showAvatar}
        hideOnline={true}
      />
      <div>
        {props.text && (
          <div
            className={cn(
              'text-gray-35 rounded-lg font-medium text-xs p-4',
              props.isCurUserMessage ? styles.msgSent : styles.msgRecv,
            )}
          >
            {props.text}
          </div>
        )}

        {props.attachments && (
          <div className='flex flex-wrap mt-3'>
            {props.attachments.map((att, i) => (
              <div
                key={i}
                className={cn(
                  'inline-block bg-gray-300 rounded-2xl bg-cover bg-center cursor-pointer mr-3 mb-3 w-48 h-44',
                  styles.oneAttachment,
                )}
                style={{ backgroundImage: `url(${prepareFileThumb(att)})` }}
                onClick={() => saveAttachment(att)}
              ></div>
            ))}
          </div>
        )}

        <div
          className={cn(
            'mt-1 font-medium text-gray-400',
            styles.chatMessageTime,
            props.isCurUserMessage ? 'text-right' : '',
          )}
        >
          {formatTime(props.date)}
        </div>
      </div>
    </div>
  )
}
