import React, { /* useEffect,*/ useState } from 'react'
// import { useHistory } from 'react-router'
import cn from 'classnames'
import routes from '../../common/constants/routes.json'
import { useHistory } from 'react-router-dom'
import { ChatItem, ChatItemProps } from './ChatItem'
import { ChatMessage, ChatMessageProps } from './ChatMessage'
import editIcon from '../../common/assets/icons/ico-edit.svg'
import chatMenuIcon from '../../common/assets/icons/ico-chat-menu.svg'
import msgEmojiIcon from '../../common/assets/icons/ico-chatmsg-emoji.svg'
import msgAttachIcon from '../../common/assets/icons/ico-chatmsg-link.svg'
import msgSendIcon from '../../common/assets/icons/ico-chatmsg-send.svg'
import chatCloseIcon from '../../common/assets/icons/ico-close2.svg'
import styles from './Chat.module.css'

export type LocationState = {
  param: string
}

const mockAv1 =
  'data:image/jpeg;base64,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'

const chats: ChatItemProps[] = [
  {
    id: 1,
    title: 'Galactic Arch',
    lastMessage: {
      text: 'Hi! How are things with the illumination of office?',
      date: new Date(),
      unread: true,
      sender: {
        name: 'User1 Name',
        avatar: mockAv1,
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
      unread: true,
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
      unread: true,
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
      unread: true,
      sender: {
        name: 'User1 Name',
        avatar:
          'data:image/jpeg;base64,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',
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
      avatar:
        'data:image/jpeg;base64,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',
    },
  },
]

export default function Chat(): JSX.Element {
  const [newMsgPlaceholder, setNewMsgPlaceholder] = useState(true)
  const [newMsg, setNewMsg] = useState('')
  const [activeChatId, setActiveChatId] = useState(0)
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
    // console.log('activate chat id', id)
    setActiveChatId(id)
    const i = chats.findIndex(item => item.id === id)
    if (i !== -1) {
      chats[i].lastMessage.unread = false
    }
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

  const history = useHistory()

  const onCloseChat = () => {
    history.push(routes.DASHBOARD)
  }

  return (
    <div
      className='page-container py-5 flex flex-col min-h-full'
      onClick={onCloseChat}
    >
      <div
        className={cn(styles.chat, 'paper flex flex-grow')}
        onClick={ev => ev.stopPropagation()}
      >
        <div className={styles.colLeft}>
          <div className={styles.title}>
            <h1>Chat</h1>
            <i onClick={onChatEdit}>
              <img src={editIcon} />
            </i>
          </div>
          <div className={styles.chatsList}>
            {chats.map((chat, i) => (
              <ChatItem
                key={i}
                {...chat}
                onClick={onSelectChat}
                isActive={activeChatId === chat.id}
              />
            ))}
          </div>
        </div>

        <div className={styles.chatRight}>
          <div className={styles.chatHeader}>
            <div className={cn(styles.userAvatar, styles.userAvatarSm)}>
              <i style={{ backgroundImage: `url(${mockAv1})` }}></i>
              {/* insert user avatar */}
            </div>

            <div className={styles.chatTitle}>{activeChatTitle}</div>

            <div className={styles.chatMenu} onClick={onActiveChatMenu}>
              <img src={chatMenuIcon} />
            </div>

            <div className={styles.chatClose} onClick={onCloseChat}>
              <img src={chatCloseIcon} />
            </div>
          </div>

          <div className={styles.chatMessages}>
            {activeChatMessages.map((msg, i) => (
              <ChatMessage key={i} {...msg} onSaveAttachment={saveAttachment} />
            ))}
          </div>
          <div className={styles.chatFooter}>
            <div className={cn(styles.userAvatar, styles.userAvatarSm2)}>
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
