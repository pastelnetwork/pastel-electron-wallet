import React /*, { CSSProperties }*/ from 'react'
import { formatTime } from '../../common/utils/format'
import cn from 'classnames'
import styles from './Chat.module.css'
import { TChatUser } from './common'
import { UserAvatar } from './components/UserAvatar'

export type TChatMessageProps = {
  id: string
  text?: string
  sender: TChatUser
  date: Date
  unread: boolean
  isCurUserMessage?: boolean
  showAvatar?: boolean
  attachments?: string[] //images only? any files?
  onSaveAttachment?: (url: string) => void
}

export function ChatMessage({
  onSaveAttachment,
  isCurUserMessage,
  sender,
  showAvatar,
  text,
  attachments,
  date,
}: TChatMessageProps): JSX.Element {
  const prepareFileThumb = (url: string) => {
    // TODO: default icons for non-images?
    return url
  }

  const saveAttachment = (url: string) => {
    if (onSaveAttachment) {
      onSaveAttachment(url)
    }
  }

  return (
    <div className={cn('flex', isCurUserMessage ? 'justify-end' : '')}>
      <UserAvatar
        extraClasses={isCurUserMessage ? 'order-3 ml-5 mr-0' : ''}
        size={9}
        user={sender}
        hideAvatar={!showAvatar}
        hideOnline
      />
      <div>
        {text && (
          <div
            className={cn(
              'text-gray-35 rounded-lg font-medium text-xs p-4',
              isCurUserMessage ? styles.msgSent : styles.msgRecv,
            )}
          >
            {text}
          </div>
        )}

        {attachments && (
          <div className='flex flex-wrap mt-3'>
            {attachments.map(att => (
              <div
                key={att}
                className={cn(
                  'inline-block bg-gray-300 rounded-2xl bg-cover bg-center cursor-pointer mr-3 mb-3 w-48 h-44',
                  styles.oneAttachment,
                )}
                style={{ backgroundImage: `url(${prepareFileThumb(att)})` }}
                onClick={() => saveAttachment(att)}
                role='button'
                aria-hidden
                tabIndex={0}
              />
            ))}
          </div>
        )}

        <div
          className={cn(
            'mt-1 font-medium text-gray-400',
            styles.chatMessageTime,
            isCurUserMessage ? 'text-right' : '',
          )}
        >
          {formatTime(date)}
        </div>
      </div>
    </div>
  )
}
