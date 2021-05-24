import './ConversationListItem.css'

import clx from 'classnames'
import React, { useEffect } from 'react'
import shave from 'shave'

import { TConversation } from '../../MessagesStore'

interface IConversationItemProps {
  conversation: TConversation
  isActive: boolean
  changeConversation: (id: string | number) => void
}

export default function ConversationListItem(
  props: IConversationItemProps,
): JSX.Element {
  const { conversation, isActive, changeConversation } = props

  const onChangeConversation = () => {
    if (!isActive) {
      changeConversation(conversation.id)
    }
  }

  useEffect(() => {
    shave('.conversation-snippet', 20)
  })

  return (
    <div
      className={clx('conversation-list-item', { active: isActive })}
      onClick={onChangeConversation}
    >
      <img
        className='conversation-photo'
        src={conversation.thumbnail}
        alt='conversation'
      />
      <div className='conversation-info'>
        <h1 className='conversation-title'>{conversation.name}</h1>
        <p className='conversation-snippet'>{conversation.lastMessage}</p>
      </div>
    </div>
  )
}
