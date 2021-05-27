import React from 'react'

import * as Styled from './ConversationSearch.styles'

interface IConversationSearch {
  searchConversation?(e: React.ChangeEvent<HTMLInputElement>): void
}

export default function ConversationSearch(
  props: IConversationSearch,
): JSX.Element {
  const { searchConversation } = props

  return (
    <Styled.ConversationSearch>
      <Styled.ConversationSearchInput
        type='search'
        name='conversation'
        placeholder='Search Messages'
        onChange={searchConversation}
      />
    </Styled.ConversationSearch>
  )
}
