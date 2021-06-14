import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../common/utils/format'
import cn from 'classnames'
import styles from './Chat.module.css'

export const DIR_SENT = 0
export const DIR_RECV = 1

export interface ChatMessageProps {
  text?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sender: any
  date: Date
  unread: boolean
  direction: number // incoming (1) / outcoming (0)
  showAvatar?: boolean
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
                style={{ backgroundImage: `url(${prepareFileThumb(att)})` }}
                onClick={() => saveAttachment(att)}
              ></div>
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
