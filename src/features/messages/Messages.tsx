import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { RootState } from '../../redux/store'
import ConversationList from './components/ConversationList'
import MessageList from './components/MessageList'
import Skeleton from './components/skeletons'
// import style from './Messages.module.css'
import {
  changeConversation,
  fetchConversations,
  IConversationsState,
} from './MessagesStore'
import Toolbar from './components/Toolbar'
import ConversationSearch from './components/ConversationSearch'
import Compose from './components/Compose'
// import './components/MessageList/MessageList.css'

import * as Styles from './Messages.styles'

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
    <Styles.Container>
      <Styles.Message>
        <Styles.Sidebar>
          {isLoading ? (
            <>
              <Toolbar title='Messages' />

              <ConversationSearch />

              <Styles.WrapperLoading>
                {index.map(n => (
                  <Styles.WrapperSkeletonLeft key={n}>
                    <Skeleton type='avatar' />
                    <Styles.SkeletonRight>
                      <Skeleton type='text name-skeleton' />
                      <Skeleton type='text description-skeleton' />
                    </Styles.SkeletonRight>
                  </Styles.WrapperSkeletonLeft>
                ))}
              </Styles.WrapperLoading>
            </>
          ) : (
            <ConversationList
              conversations={conversations}
              currentConversationId={currentConversationId}
              changeConversation={changeConversation}
            />
          )}
        </Styles.Sidebar>
        <Styles.Content>
          {isLoading ? (
            <Styles.WrapperNotData2>
              <Styles.SkeletonTop>
                <Skeleton type='avatar' />
                <Skeleton type='title' />
              </Styles.SkeletonTop>
              <Styles.SkeletonBottom>
                <Skeleton type='title skeleton-msg-1' />
                <Skeleton type='title skeleton-msg-2' />
                <Skeleton type='title skeleton-msg-3' />
                <Skeleton type='title skeleton-msg-4' />
              </Styles.SkeletonBottom>
              <Compose isLoading={isLoading} />
            </Styles.WrapperNotData2>
          ) : conversation ? (
            <MessageList conversation={conversation} />
          ) : (
            <Styles.WrapperNotData2>
              <p>Select one to message</p>
            </Styles.WrapperNotData2>
          )}
        </Styles.Content>
      </Styles.Message>
    </Styles.Container>
  )
}

const mapStateToProps = ({ pastelMessage }: RootState) => ({
  ...pastelMessage,
})

export default connect(mapStateToProps, {
  fetchConversations,
  changeConversation,
})(Messages)
