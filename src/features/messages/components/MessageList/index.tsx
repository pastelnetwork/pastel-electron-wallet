import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { TConversation } from '../../MessagesStore'
import Compose from '../Compose'
import Message from '../Message'
import ToolbarIconButton from '../ToolbarButton'

import * as Styles from './MessageList.styles'

dayjs.extend(duration)

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
      const currentMoment = dayjs(current.timestamp)
      let prevBySameAuthor = false
      let nextBySameAuthor = false
      let startsSequence = true
      let endsSequence = true
      let showTimestamp = true

      if (previous) {
        const previousMoment = dayjs(previous.timestamp)
        const previousDuration = dayjs.duration(
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
        const nextMoment = dayjs(next.timestamp)
        const nextDuration = dayjs.duration(nextMoment.diff(currentMoment))
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
    <Styles.MessageList>
      <Styles.MessageHeader>
        <Styles.ImageMessageHeader src={thumbnail} alt='conversation' />
        <div>
          <Styles.MessageName>{name}</Styles.MessageName>
        </div>
      </Styles.MessageHeader>

      {messages.length !== 0 ? (
        <Styles.MessageListContainer id='wrapper-list-message'>
          {renderMessages()}
        </Styles.MessageListContainer>
      ) : (
        <Styles.WrapperNotData>
          <ToolbarIconButton icon='fa fa-comment-dots icon-message' />
        </Styles.WrapperNotData>
      )}

      <Compose />
    </Styles.MessageList>
  )
}

export default MessageList
