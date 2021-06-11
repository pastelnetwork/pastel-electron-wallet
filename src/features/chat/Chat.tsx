import React /*, { useEffect, useState }*/ from 'react'
import cx from 'classnames'
// import { useLocation } from 'react-router-dom'
import { ChatItem, ChatItemProps } from './ChatItem'
import { ChatMessage, ChatMessageProps } from './ChatMessage'
import editIcon from '../../common/assets/icons/ico-edit.svg'
import chatMenuIcon from '../../common/assets/icons/ico-chat-menu.svg'
import msgEmojiIcon from '../../common/assets/icons/ico-chatmsg-emoji.svg'
import msgAttachIcon from '../../common/assets/icons/ico-chatmsg-link.svg'
import msgSendIcon from '../../common/assets/icons/ico-chatmsg-send.svg'
import styles from './Chat.module.css'

export type LocationState = {
  param: string
}

const chats: ChatItemProps[] = [
  {
    title: 'Galactic Arch',
    lastMessage: {
      text: 'Hi! How are things with the illumination of office?',
      date: new Date(),
      notRead: true,
      sender: {
        name: 'User1 Name',
        avatar: '',
        isOnline: true,
      },
    },
  },
  {
    title: 'Amazinng Digital Arch',
    lastMessage: {
      text: 'I would think about the pink color for that shape?',
      date: new Date(),
      notRead: true,
      sender: {
        name: 'User1 Name',
        avatar: '',
        isOnline: false,
      },
    },
  },
  {
    title: 'Amazinng Digital Arch',
    lastMessage: {
      text: 'I would think about the pink color for that shape?',
      date: new Date(),
      notRead: true,
      sender: {
        name: 'User1 Name',
        avatar: '',
        isOnline: false,
      },
    },
  },
  {
    title: 'Amazinng Digital Arch',
    lastMessage: {
      text: 'I would think about the pink color for that shape?',
      date: new Date(),
      notRead: true,
      sender: {
        name: 'User1 Name',
        avatar: '',
        isOnline: false,
      },
    },
  },
]

const activeChatTitle = 'Amazinng Digital Arch'
const activeChatMessages: ChatMessageProps[] = [
  {
    text: 'I would think about the pink color for that shape?',
    date: new Date(),
    showAvatar: true,
    direction: 1,
    sender: {
      avatar: '',
    },
  },
  {
    text: 'I would think about the pink color for that shape?',
    date: new Date(),
    showAvatar: false,
    direction: 1,
    sender: {
      avatar: '',
    },
  },
  {
    text: 'I would think about the pink color for that shape?',
    date: new Date(),
    showAvatar: true,
    direction: 0,
    sender: {
      avatar: '',
    },
  },
]

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
      <div className={cx(styles.chat, 'paper flex flex-grow')}>
        <div className={styles.colLeft}>
          <div className={styles.title}>
            <h1>Chat</h1>
            <button>
              <img src={editIcon} />
            </button>
          </div>
          {/* <p>Param: {param}</p>  DEBUG */}
          <div className={styles.chatsList}>
            {chats.map((chat, i) => (
              <ChatItem key={i} {...chat} />
            ))}
          </div>
        </div>
        <div className={styles.chatRight}>
          <div className={styles.chatHeader}>
            <div className={cx(styles.userAvatar, styles.userAvatarSm)}>
              <i style={{ backgroundImage: `url(${''})` }}></i>
            </div>
            <div className={styles.chatTitle}>{activeChatTitle}</div>
            <div className={styles.chatMenu}>
              <img src={chatMenuIcon} />
            </div>
          </div>
          <div className={styles.chatMessages}>
            {activeChatMessages.map((msg, i) => (
              <ChatMessage key={i} {...msg} />
            ))}
          </div>
          <div className={styles.chatFooter}>
            <div className={styles.userAvatar}>
              <i style={{ backgroundImage: `url(${''})` }}></i>
            </div>
            <div className={styles.chatNewMsg}>{/* input */}</div>
            <div className={styles.chatMsgBtn}>
              <img src={msgEmojiIcon} />
            </div>
            <div className={styles.chatMsgBtn}>
              <img src={msgAttachIcon} />
            </div>
            <div className={styles.chatMsgBtnSend}>
              <img src={msgSendIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
