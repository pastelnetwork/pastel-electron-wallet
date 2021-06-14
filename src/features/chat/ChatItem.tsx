import React /*, { CSSProperties }*/ from 'react'
import cn from 'classnames'
import { chatMsgDatetime } from '../../common/utils/format'
import { ChatMessageProps } from './ChatMessage'
import styles from './Chat.module.css'

export interface ChatItemProps {
  id: number
  title: string
  messages: ChatMessageProps[]
  onClick?: (id: number) => void
  isActive?: boolean
}

export const ChatItem = (props: ChatItemProps): JSX.Element => {
  const onClickMe = () => {
    if (props.onClick) {
      props.onClick(props.id)
    }
  }

  const lastMessage = props ? props.messages[props.messages.length - 1] : null

  return (
    <div
      className={cn(styles.chatItem, props.isActive ? styles.chatActive : '')}
      onClick={onClickMe}
    >
      <div className={styles.chatItemAvatar}>
        <div className={styles.userAvatar}>
          {lastMessage && (
            <i
              style={{
                backgroundImage: `url(${lastMessage.sender.avatar})`,
              }}
            ></i>
          )}
          {lastMessage && lastMessage.sender.isOnline && (
            <span className={styles.unread}></span>
          )}
        </div>
      </div>
      <div className={styles.chatItemContent}>
        <div className={styles.chatItemTime}>
          {lastMessage ? chatMsgDatetime(lastMessage.date) : ''}
        </div>
        <div className={styles.chatItemTitle}>{props.title}</div>
        <div className={styles.chatItemText}>
          {lastMessage ? lastMessage.text : ''}
        </div>
        <div className={styles.chatItemUnread}>
          {lastMessage && lastMessage.unread && (
            <i className={styles.unread}></i>
          )}
        </div>
      </div>
    </div>
  )
}
