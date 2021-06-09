import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../../common/utils/format'

// import * as Styles from './ChatItem.styles'

export interface ChatItemProps {
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
}

const ChatItem = (props: ChatItemProps): JSX.Element => {
  return (
    <div className='chat-item'>
      <div className='user-avatar'>
        <img src={props.lastMessage.sender.avatar} />
      </div>
      <div className='chat-item-content'>
        {/* content */}
        <div className='chat-item-time'>
          {chatMsgDatetime(props.lastMessage.date)}
        </div>
        <div className='chat-item-title'>{props.title}</div>
        <div className='chat-item-text'>{props.lastMessage.text}</div>
        <div className='chat-item-unread'>
          {props.lastMessage.notRead && <i className=''></i>}
        </div>
      </div>
    </div>
  )
}

export default ChatItem
