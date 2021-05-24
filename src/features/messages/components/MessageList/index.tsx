import './MessageList.css'

import moment from 'moment'
import React, { useEffect } from 'react'

import { TConversation } from '../../MessagesStore'
import Compose from '../Compose'
import Message from '../Message'
import ToolbarIconButton from '../ToolbarButton'

const MY_USER_ID = 'apple'

interface IProps {
  conversation: TConversation
}

function MessageList(props: IProps): JSX.Element {
  const { conversation } = props
  const { messages, thumbnail, name } = conversation

  const scrollToBottom = () => {
    const msgList = document.getElementById('wrapper-list-message')
    if (msgList) {
      msgList.scrollTo({
        left: 0,
        top: msgList.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  const renderMessages = () => {
    let i = 0
    const messageCount = messages.length
    const tempMessages = []

    while (i < messageCount) {
      const previous = messages[i - 1]
      const current = messages[i]
      const next = messages[i + 1]
      const isMine = current.author === MY_USER_ID
      const currentMoment = moment(current.timestamp)
      let prevBySameAuthor = false
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        const previousMoment = moment(previous.timestamp)
        const previousDuration = moment.duration(
          currentMoment.diff(previousMoment),
        )
        prevBySameAuthor = previous.author === current.author

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false
        }
      }

      if (next) {
        const nextMoment = moment(next.timestamp)
        const nextDuration = moment.duration(nextMoment.diff(currentMoment))
        nextBySameAuthor = next.author === current.author

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />,
      )

      // Proceed to the next message.
      i += 1
    }

    return tempMessages
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  return (
    <div className='message-list'>
      <div className='message__header'>
        <img
          className='conversation-photo'
          src={thumbnail}
          alt='conversation'
        />
        <div className='message__header-name'>
          <h1 className='message-name'>{name}</h1>
        </div>
      </div>

      {messages.length !== 0 ? (
        <div id='wrapper-list-message' className='message-list-container'>
          {renderMessages()}
        </div>
      ) : (
        <div className='wrapper-not-data'>
          <ToolbarIconButton icon='fa fa-comment-dots icon-message' />
        </div>
      )}

      <Compose />
    </div>
  )
}

export default MessageList
