import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../common/utils/format'
import cx from 'classnames'
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
  //attachments: ? images only? any files? TODO:
}

export const ChatMessage = (props: ChatMessageProps): JSX.Element => {
  return (
    <div
      className={cx(styles.chatMessage, props.direction ? '' : styles.msgOut)}
    >
      <div className={cx(styles.userAvatar, styles.userAvatarSm)}>
        {props.showAvatar && (
          <i style={{ backgroundImage: `url(${props.sender.avatar})` }}></i>
        )}
      </div>
      <div className={styles.chatMessageContent}>
        {props.text && (
          <div className={styles.chatMessageText}>{props.text}</div>
        )}
        {/* props.attachments && (<div className='chat-message-attachments'>???</div>) */}
        <div className={styles.chatMessageTime}>
          {chatMsgDatetime(props.date)}
        </div>
      </div>
    </div>
  )
}
