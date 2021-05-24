import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { RootState } from '../../redux/store'
import ConversationList from './components/ConversationList'
import MessageList from './components/MessageList'
import Skeleton from './components/skeletons'
import style from './Messages.module.css'
import {
  changeConversation,
  fetchConversations,
  IConversationsState,
} from './MessagesStore'
import Toolbar from './components/Toolbar'
import ConversationSearch from './components/ConversationSearch'
import Compose from './components/Compose'
import './components/MessageList/MessageList.css'

interface IProps extends IConversationsState {
  fetchConversations: () => void
  changeConversation: (id: string | number) => void
}

const index = [1, 2, 3, 4, 5]

function Messages(props: IProps): JSX.Element {
  const {
    fetchConversations,
    isLoading,
    conversations,
    currentConversationId,
    changeConversation,
  } = props

  useEffect(() => {
    fetchConversations()
  }, [])

  const conversation = conversations.find(c => c.id === currentConversationId)

  return (
    <div className={style.container}>
      <div className={style.messenger}>
        <div className={`${style.scrollAble} ${style.sidebar}`}>
          {isLoading ? (
            <>
              <Toolbar title='Messages' />

              <ConversationSearch />

              <div className='wrapper-not-data wrapper-loading-conversations'>
                {index.map(n => (
                  <div key={n} className='wrapper-skeleton-left'>
                    <Skeleton type='avatar' />
                    <div className='skeleton-right'>
                      <Skeleton type='text name-skeleton' />
                      <Skeleton type='text description-skeleton' />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <ConversationList
              conversations={conversations}
              currentConversationId={currentConversationId}
              changeConversation={changeConversation}
            />
          )}
        </div>
        <div className={`${style.scrollAble} ${style.content}`}>
          {isLoading ? (
            <div className='wrapper-not-data wrapper-not-data-2'>
              <div className='skeleton-top'>
                <Skeleton type='avatar' />
                <Skeleton type='title' />
              </div>
              <div className='skeleton-bottom'>
                <Skeleton type='title skeleton-msg-1' />
                <Skeleton type='title skeleton-msg-2' />
                <Skeleton type='title skeleton-msg-3' />
                <Skeleton type='title skeleton-msg-4' />
              </div>
              <Compose isLoading={isLoading} />
            </div>
          ) : conversation ? (
            <MessageList conversation={conversation} />
          ) : (
            <div className='wrapper-not-data wrapper-not-data-2'>
              <p>Select one to message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ pastelMessage }: RootState) => ({
  ...pastelMessage,
})

export default connect(mapStateToProps, {
  fetchConversations,
  changeConversation,
})(Messages)
