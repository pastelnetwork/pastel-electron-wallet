import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../common/utils/format'
import cn from 'classnames'
import styles from './Chat.module.css'

export interface ChatMessageProps {
  text?: string
  sender: {
    avatar: string
  }
  showAvatar: boolean
  date: Date
  // unread: boolean
  direction: number // incoming (1) / outcoming (0)
  attachments?: string[] //images only? any files?
  onSaveAttachment?: (url: string) => void
}

export const ChatMessage = (props: ChatMessageProps): JSX.Element => {
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
    <div
      className={cn(styles.chatMessage, props.direction ? '' : styles.msgOut)}
    >
      <div className={cn(styles.userAvatar, styles.userAvatarSm)}>
        {props.showAvatar && (
          <i style={{ backgroundImage: `url(${props.sender.avatar})` }}></i>
        )}
      </div>
      <div className={styles.chatMessageContent}>
        {props.text && (
          <div className={styles.chatMessageText}>{props.text}</div>
        )}

        {props.attachments && (
          <div className={styles.chatMessageAttachments}>
            {props.attachments.map((att, i) => (
              <div
                key={i}
                className={styles.oneAttachment}
                onClick={() => saveAttachment(att)}
              >
                <i
                  style={{ backgroundImage: `url(${prepareFileThumb(att)})` }}
                ></i>
              </div>
            ))}
          </div>
        )}

        <div className={styles.chatMessageTime}>
          {chatMsgDatetime(props.date)}
        </div>
      </div>
    </div>
  )
}
