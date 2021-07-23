import React, { useEffect, useState, useRef, KeyboardEvent } from 'react'
import cn from 'classnames'

import * as ROUTES from 'common/utils/constants/routes'
import { useHistory } from 'react-router-dom'
import { CloseButton } from 'common/components/Buttons'
import { ChatItem, TChatItemProps } from './ChatItem'
import { ChatMessage } from './ChatMessage'
import { UserAvatar } from './components/UserAvatar'
import editIcon from 'common/assets/icons/ico-edit.svg'
import chatMenuIcon from 'common/assets/icons/ico-chat-menu.svg'
import msgEmojiIcon from 'common/assets/icons/ico-chatmsg-emoji.svg'
import msgAttachIcon from 'common/assets/icons/ico-chatmsg-link.svg'
import msgSendIcon from 'common/assets/icons/ico-chatmsg-send.svg'
import styles from './Chat.module.css'
import { mockChats, curUser } from './mock-data'
import { TChatUser } from './common'

const Chat = (): JSX.Element => {
  const [newMsgPlaceholder, setNewMsgPlaceholder] = useState(true)
  const [newMsg, setNewMsg] = useState('')
  const [activeChatId, setActiveChatId] = useState<number>(mockChats[0].id)
  const [activeChat, setActiveChat] = useState<TChatItemProps>(mockChats[0])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chats, setChats] = useState<TChatItemProps[]>(mockChats) // DEBUG: init state

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
    //
  }

  const onChatEdit = () => {
    //
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
    history.push(ROUTES.DASHBOARD)
  }

  const TChatUser = (chat: TChatItemProps): TChatUser | undefined => {
    const recv = chat.messages.filter(item => item.sender.id !== curUser.id)
    if (recv.length > 0) {
      return recv[recv.length - 1].sender
    }

    return undefined
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
        className='paper flex flex-grow bg-gray-fc overflow-hidden'
        onClick={ev => ev.stopPropagation()}
      >
        <div className='mr-2 flex flex-col py-5 min-w-20rem w-1/3'>
          <div className='px-5 flex justify-between'>
            <h1>Chat</h1>
            <i
              onClick={onChatEdit}
              className='w-8 h-8 inline-flex justify-center bg-white rounded-full cursor-pointer m-0.5 mr-1.5 shadow'
            >
              <img className='w-5 cursor-pointer' src={editIcon} />
            </i>
          </div>
          <div className='px-5 flex-grow overflow-auto'>
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

        <div className='flex flex-grow flex-col'>
          <div
            className={cn(
              styles.chatHeader,
              'bg-white flex items-center px-4 h-14',
            )}
          >
            {activeChat && (
              <UserAvatar
                user={TChatUser(activeChat)}
                size={9}
                hideOnline={true}
              />
            )}

            <div className='flex-grow font-extrabold text-lg text-gray-600'>
              {activeChat ? activeChat.title : ''}
            </div>

            <div
              className='cursor-pointer flex items-center h-4'
              onClick={toggleActiveChatMenu}
            >
              <img className='cursor-pointer' src={chatMenuIcon} />
            </div>

            <div className='flex items-center ml-4 h-4'>
              <CloseButton onClick={onCloseChat} />
            </div>
          </div>

          <div className='flex-grow px-5 overflow-auto'>
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
          <div className='flex items-center mx-5 my-4 box-border rounded-lg px-4 py-2 border border-gray-300'>
            <UserAvatar user={curUser} size={10} hideOnline={true} />

            <div className='flex-grow mr-4 h-full relative'>
              {newMsgPlaceholder && (
                <label className='absolute top-0 left-0 right-0 bottom-0 flex items-center z-0 font-medium text-base text-gray-300'>
                  Write your message here...
                </label>
              )}
              <textarea
                className='w-full h-full border-0 font-medium text-base text-gray-400 relative z-10 resize-none bg-transparent outline-none focus:outline-none'
                onFocus={onNewMsgFocus}
                onBlur={onNewMsgBlur}
                onChange={onNewMsgChange}
                onKeyPress={onKeypress}
                value={newMsg}
              ></textarea>
            </div>

            <div className='cursor-pointer mr-4' onClick={onEmoji}>
              <img className='cursor-pointer' src={msgEmojiIcon} />
            </div>

            <div className='cursor-pointer mr-4' onClick={onAttach}>
              <img className='cursor-pointer' src={msgAttachIcon} />
            </div>

            <div className='cursor-pointer w-10 h-10' onClick={onSendMsg}>
              <img className='cursor-pointer w-full h-full' src={msgSendIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
