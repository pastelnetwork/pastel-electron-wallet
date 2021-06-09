import React /*, { useEffect, useState }*/ from 'react'
// import { useLocation } from 'react-router-dom'
// import ChatItem from '../../common/components/ChatItem'
import editIcon from '../../common/assets/icons/ico-edit.svg'
import chatMenuIcon from '../../common/assets/icons/ico-chat-menu.svg'
import msgEmojiIcon from '../../common/assets/icons/ico-chatmsg-emoji.svg'
import msgAttachIcon from '../../common/assets/icons/ico-chatmsg-link.svg'
import msgSendIcon from '../../common/assets/icons/ico-chatmsg-send.svg'

export type LocationState = {
  param: string
}

export default function Chat(): JSX.Element {
  /*
  const location = useLocation<LocationState>()
  const [param, setParam] = useState('')

  useEffect(() => {
    if (location.state) {
      setParam(location.state?.param)
    }
  }, [location])
  */

  return (
    <div className='page-container py-5 flex flex-col min-h-full'>
      <div className='paper chat p-5 flex flex-grow'>
        <div className='chat-left'>
          {' '}
          {/* left col */}
          <div className='chat-title flex justify-between'>
            {' '}
            {/* title + edit button */}
            <h1>Chat</h1>
            <button>
              <img src={editIcon} />
            </button>
          </div>
          {/* <p>Param: {param}</p>  DEBUG */}
          <div className='chats-list'>
            {' '}
            {/* chats list */}
            {/* for
            <ChatItem title={} lastMessage={} />
            */}
          </div>
        </div>
        <div className='chat-right flex flex-col flex-grow'>
          {' '}
          {/* right col */}
          <div className='chat-header flex'>
            <div className='user-avatar'>
              <img src='' />
              {/* avatar */}
            </div>
            <div className='chat-title flex-grow'>{/* title */}</div>
            <div className='chat-menu'>
              <img src={chatMenuIcon} />
            </div>
          </div>
          <div className='chat-messages flex-grow'>
            {' '}
            {/* messages list */}
            {/* for
            <ChatMessage text={} sender={} time={} notRead={} />
            */}
          </div>
          <div className='chat-footer flex items-center'>
            {' '}
            {/* footer */}
            {/* icon, message field, buttons */}
            <div className='user-avatar'>
              <img src='' />
              {/* avatar */}
            </div>
            <div className='chat-new-msg flex-grow'>{/* input */}</div>
            <div className='chat-msg-btn'>
              <img src={msgEmojiIcon} />
            </div>
            <div className='chat-msg-btn'>
              <img src={msgAttachIcon} />
            </div>
            <div className='chat-msg-btn-send'>
              <img src={msgSendIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
