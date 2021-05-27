import React, { useEffect, useState } from 'react'

import { TConversation } from '../../MessagesStore'
import ConversationListItem from '../ConversationListItem'
import ConversationSearch from '../ConversationSearch'
import Toolbar from '../Toolbar'

import * as Styles from './ConversationList.styles'

interface IConversationListProps {
  conversations: TConversation[]
  currentConversationId: string | number
  changeConversation: (id: string | number) => void
}

export default function ConversationList(
  props: IConversationListProps,
): JSX.Element {
  const { conversations, currentConversationId, changeConversation } = props
  const [conversationsCopy, setConversationsCopy] = useState(conversations)

  useEffect(() => {
    setConversationsCopy(conversations)
  }, [conversations])

  const searchConversation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const searchStr = value.trim().toLowerCase()

    const filterData = searchStr
      ? conversations.filter(u => {
          return u.name.toLowerCase().includes(searchStr)
        })
      : conversations

    setConversationsCopy(filterData)
  }

  return (
    <Styles.ConversationList>
      <Toolbar title='Messages' />

      <ConversationSearch searchConversation={searchConversation} />

      <Styles.ConversationWrapper>
        {conversationsCopy.map((conversation: TConversation) => (
          <ConversationListItem
            key={conversation.id}
            isActive={conversation.id === currentConversationId}
            conversation={conversation}
            changeConversation={changeConversation}
          />
        ))}
      </Styles.ConversationWrapper>
    </Styles.ConversationList>
  )
}
