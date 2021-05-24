import React from 'react'
import './ConversationSearch.css'

interface IConversationSearch {
  searchConversation?(e: React.ChangeEvent<HTMLInputElement>): void
}
export default function ConversationSearch(
  props: IConversationSearch,
): JSX.Element {
  const { searchConversation } = props
  return (
    <div className='conversation-search'>
      <input
        type='search'
        name='conversation'
        className='conversation-search-input'
        placeholder='Search Messages'
        onChange={searchConversation}
      />
    </div>
  )
}
