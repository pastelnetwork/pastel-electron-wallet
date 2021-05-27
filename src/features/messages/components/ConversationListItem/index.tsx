import React, { useEffect } from 'react'
import shave from 'shave'

import { TConversation } from '../../MessagesStore'

import * as Styles from './ConversationListItem.styles'

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
    <Styles.ConversationListItem
      className={`${isActive && 'active'}`}
      onClick={onChangeConversation}
    >
      <Styles.ConversationPhoto
        src={conversation.thumbnail}
        alt='conversation'
      />
      <div>
        <Styles.ConversationTitle>{conversation.name}</Styles.ConversationTitle>
        <Styles.ConversationSnippet className='conversation-snippet'>
          {conversation.lastMessage}
        </Styles.ConversationSnippet>
      </div>
    </Styles.ConversationListItem>
  )
}
