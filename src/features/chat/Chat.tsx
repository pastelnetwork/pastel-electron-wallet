import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
// import { useHistory } from 'react-router'
import cn from 'classnames'
import routes from '../../common/constants/routes.json'
import { useHistory } from 'react-router-dom'
import { ChatItem, ChatItemProps } from './ChatItem'
import { ChatMessage } from './ChatMessage'
import editIcon from '../../common/assets/icons/ico-edit.svg'
import chatMenuIcon from '../../common/assets/icons/ico-chat-menu.svg'
import msgEmojiIcon from '../../common/assets/icons/ico-chatmsg-emoji.svg'
import msgAttachIcon from '../../common/assets/icons/ico-chatmsg-link.svg'
import msgSendIcon from '../../common/assets/icons/ico-chatmsg-send.svg'
import chatCloseIcon from '../../common/assets/icons/ico-close2.svg'
import styles from './Chat.module.css'
import { mockChats, curUser } from './mock-data'

export default function Chat(): JSX.Element {
  const [newMsgPlaceholder, setNewMsgPlaceholder] = useState(true)
  const [newMsg, setNewMsg] = useState('')
  const [activeChatId, setActiveChatId] = useState<number>(mockChats[0].id)
  const [activeChat, setActiveChat] = useState<ChatItemProps>(mockChats[0])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chats, setChats] = useState<ChatItemProps[]>(mockChats) // DEBUG: init state

  const endRef = useRef<HTMLDivElement>(null)
  const scroll2End = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const onNewMsgFocus = () => {
    setNewMsgPlaceholder(false)
  }

  const onNewMsgBlur = () => {
    setNewMsgPlaceholder(newMsg.length > 0 ? false : true)
  }

  const onNewMsgChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMsg(ev.currentTarget.value)
  }

  const toggleActiveChatMenu = () => {
    console.log('show/hide active chat menu')
  }

  const onChatEdit = () => {
    console.log('edit chat')
  }

  const onSelectChat = (id: number) => {
    const active = chats.find(item => item.id === id)
    if (active) {
      setActiveChatId(id)
      setActiveChat(active)
    }
  }

  const onSendMsg = () => {
    const val = newMsg.replace(/\s{1,}$/, '') // strip ending whitespaces
    if (val.length === 0) {
      // don't send empty messages
      setNewMsg('')
      return
    }

    // send message code here

    setNewMsg('')
  }

  const onEmoji = () => {
    console.log('show/hide emoji panel')
  }

  const onAttach = () => {
    console.log('show/hide attachment panel')
  }

  const saveAttachment = (url: string) => {
    console.log('save attached file', url)
  }

  const history = useHistory()

  const onCloseChat = () => {
    history.push(routes.DASHBOARD)
  }

  const chatAvatar = (chat: ChatItemProps): string => {
    const recv = chat.messages.filter(item => item.sender.id !== curUser.id)
    if (recv.length > 0) {
      return recv[recv.length - 1].sender.avatar
    }

    return ''
  }

  const onKeypress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (['Enter', 'NumpadEnter'].includes(e.code) && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()

      onSendMsg()
    }
  }

  useEffect(() => {
    scroll2End()
  }, [chats, activeChat, activeChat.messages.length])

  return (
    <div
      className='page-container py-5 flex flex-col h-full'
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
              {activeChat && (
                <i
                  style={{ backgroundImage: `url(${chatAvatar(activeChat)})` }}
                ></i>
              )}
              {/* insert user avatar */}
            </div>

            <div className={styles.chatTitle}>
              {activeChat ? activeChat.title : ''}
            </div>

            <div className={styles.chatMenu} onClick={toggleActiveChatMenu}>
              <img src={chatMenuIcon} />
            </div>

            <div className={styles.chatClose} onClick={onCloseChat}>
              <img src={chatCloseIcon} />
            </div>
          </div>

          <div className={styles.chatMessages}>
            {activeChat &&
              activeChat.messages.map((msg, i) => {
                const props = {
                  ...msg,
                  isCurUserMessage: msg.sender.id === curUser.id,
                  showAvatar:
                    !i ||
                    activeChat.messages[i - 1].sender.id !== msg.sender.id,
                }
                return (
                  <ChatMessage
                    key={i}
                    {...props}
                    onSaveAttachment={saveAttachment}
                  />
                )
              })}
            <div ref={endRef}></div>
          </div>
          <div className={styles.chatFooter}>
            <div className={cn(styles.userAvatar, styles.userAvatarSm2)}>
              <i style={{ backgroundImage: `url(${curUser.avatar})` }}></i>
              {/* insert current user avatar */}
            </div>

            <div className={styles.chatNewMsg}>
              {newMsgPlaceholder && <label>Write your message here...</label>}
              <textarea
                onFocus={onNewMsgFocus}
                onBlur={onNewMsgBlur}
                onChange={onNewMsgChange}
                onKeyPress={onKeypress}
                value={newMsg}
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
