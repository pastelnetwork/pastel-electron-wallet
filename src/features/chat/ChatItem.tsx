import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../common/utils/format'
import styles from './Chat.module.css'

export interface ChatItemProps {
  id: number
  title: string
  lastMessage: {
    text: string
    date: Date
    notRead: boolean
    sender: {
      name: string
      avatar: string
      isOnline: boolean
    }
  }
  onClick?: (id: number) => void
}

export const ChatItem = (props: ChatItemProps): JSX.Element => {
  const onClickMe = () => {
    if (props.onClick) {
      props.onClick(props.id)
    }
  }

  return (
    <div className={styles.chatItem} onClick={onClickMe}>
      <div className={styles.chatItemAvatar}>
        <div className={styles.userAvatar}>
          <i
            style={{
              backgroundImage: `url(${props.lastMessage.sender.avatar})`,
            }}
          ></i>
          {props.lastMessage.sender.isOnline && (
            <span className={styles.unread}></span>
          )}
        </div>
      </div>
      <div className={styles.chatItemContent}>
        <div className={styles.chatItemTime}>
          {chatMsgDatetime(props.lastMessage.date)}
        </div>
        <div className={styles.chatItemTitle}>{props.title}</div>
        <div className={styles.chatItemText}>{props.lastMessage.text}</div>
        <div className={styles.chatItemUnread}>
          {props.lastMessage.notRead && <i className={styles.unread}></i>}
        </div>
      </div>
    </div>
  )
}
