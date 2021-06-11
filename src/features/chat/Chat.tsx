import React, { /* useEffect,*/ useState } from 'react'
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
    title: 'Amazinng Digital Arch',
    lastMessage: {
      text:
        "Hi I'm working on the final scenes and will show you the result in the next few days.",
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
    attachments: ['https://server.com/test-image.jpg'],
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
  const [newMsgPlaceholder, setNewMsgPlaceholder] = useState(true)
  const [newMsg, setNewMsg] = useState('')
  /*
  const location = useLocation<LocationState>()

  useEffect(() => {
    if (location.state) {
      setParam(location.state?.param)
    }
  }, [location])
  */

  const onNewMsgFocus = () => {
    setNewMsgPlaceholder(false)
  }

  const onNewMsgBlur = () => {
    setNewMsgPlaceholder(newMsg.length > 0 ? false : true)
  }

  const onNewMsgChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMsg(ev.currentTarget.value)
  }

  /**
   * Click by active chat menu button "..."
   */
  const onActiveChatMenu = () => {
    // TODO:
    console.log('show/hide active chat menu')
  }

  /**
   * Click by edit button (pencil icon)
   */
  const onChatEdit = () => {
    // TODO:
    console.log('edit chat')
  }

  /**
   * Click by chat in chats' list (select another chat)
   * @param idx
   */
  const onSelectChat = (id: number) => {
    // TODO:
    console.log('activate chat id', id)
  }

  const onSendMsg = () => {
    // TODO:
    console.log('send msg')
  }

  const onEmoji = () => {
    // TODO:
    console.log('show/hide emoji panel')
  }

  const onAttach = () => {
    // TODO:
    console.log('show/hide attachment panel')
  }

  const saveAttachment = (url: string) => {
    // TODO:
    console.log('save attached file', url)
  }

  return (
    <div className='page-container py-5 flex flex-col min-h-full'>
      <div className={cx(styles.chat, 'paper flex flex-grow')}>
        <div className={styles.colLeft}>
          <div className={styles.title}>
            <h1>Chat</h1>
            <i onClick={onChatEdit}>
              <img src={editIcon} />
            </i>
          </div>

          <div className={styles.chatsList}>
            {chats.map((chat, i) => (
              <ChatItem key={i} {...chat} onClick={onSelectChat} />
            ))}
          </div>
        </div>

        <div className={styles.chatRight}>
          <div className={styles.chatHeader}>
            <div className={cx(styles.userAvatar, styles.userAvatarSm)}>
              <i style={{ backgroundImage: `url(${''})` }}></i>
              {/* insert user avatar */}
            </div>

            <div className={styles.chatTitle}>{activeChatTitle}</div>

            <div className={styles.chatMenu} onClick={onActiveChatMenu}>
              <img src={chatMenuIcon} />
            </div>
          </div>

          <div className={styles.chatMessages}>
            {activeChatMessages.map((msg, i) => (
              <ChatMessage key={i} {...msg} onSaveAttachment={saveAttachment} />
            ))}
          </div>
          <div className={styles.chatFooter}>
            <div className={cx(styles.userAvatar, styles.userAvatarSm2)}>
              <i style={{ backgroundImage: `url(${''})` }}></i>
              {/* insert current user avatar */}
            </div>

            <div className={styles.chatNewMsg}>
              <label className={newMsgPlaceholder ? '' : styles.hidden}>
                Write your message here...
              </label>
              <textarea
                onFocus={onNewMsgFocus}
                onBlur={onNewMsgBlur}
                onChange={onNewMsgChange}
              ></textarea>
            </div>

            <div className={styles.chatMsgBtn} onClick={onEmoji}>
              <img src={msgEmojiIcon} />
            </div>

            <div className={styles.chatMsgBtn} onClick={onAttach}>
              <img src={msgAttachIcon} />
            </div>

            <div className={styles.chatMsgBtnSend} onClick={onSendMsg}>
              <img src={msgSendIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
