import React /*, { CSSProperties }*/ from 'react'
import { chatMsgDatetime } from '../../../common/utils/format'

// import * as Styles from './ChatItem.styles'

export interface ChatMessageProps {
  text?: string
  sender: {
    avatar: string
  }
  showAvatar: boolean
  time: Date
  // type: ? // incoming/outcoming TODO:
  //attachments: ? images only? any files? TODO:
}

const ChatMessage = (props: ChatMessageProps): JSX.Element => {
  return (
    <div className='chat-message'>
      <div className='user-avatar'>
        {/* avatar */}
        {props.showAvatar && <img src={props.sender.avatar} />}
      </div>
      <div className='chat-message-content'>
        {/* content */}
        <div className='chat-message-time'>{chatMsgDatetime(props.time)}</div>

        {props.text && <div className='chat-message-text'>{props.text}</div>}
        {/* props.attachments && (<div className='chat-message-attachments'>???</div>) */}
      </div>
    </div>
  )
}

export default ChatMessage
