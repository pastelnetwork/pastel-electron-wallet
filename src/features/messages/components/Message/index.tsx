import React from 'react'
import dayjs from 'dayjs'

import { TMessage } from '../../MessagesStore'

import * as Styles from './Message.styles'

interface IMessageProps {
  data: TMessage
  isMine: boolean
  startsSequence: boolean
  endsSequence: boolean
  showTimestamp: boolean
}

export default function Messages(props: IMessageProps): JSX.Element {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props
  const friendlyTimestamp = dayjs(data.timestamp).format('dddd MMMM DD, YYYY')

  return (
    <Styles.Message
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      {showTimestamp && (
        <Styles.Timestamp>{friendlyTimestamp}</Styles.Timestamp>
      )}

      <Styles.BubbleContainer className='bubble-container'>
        {data.message && (
          <Styles.Bubble className='bubble' title={friendlyTimestamp}>
            {data.message}
          </Styles.Bubble>
        )}
        {data.image.length !== 0 &&
          data.image.map((item: string, index: number) => (
            <Styles.WrapperBubbleImage key={index} title={friendlyTimestamp}>
              <Styles.ImageBubble src={item} alt='image-message' />
            </Styles.WrapperBubbleImage>
          ))}
        {data.record && (
          <Styles.WrapperBubbleAudio>
            <Styles.AudioBubble src={data.record} controls></Styles.AudioBubble>
          </Styles.WrapperBubbleAudio>
        )}
      </Styles.BubbleContainer>
    </Styles.Message>
  )
}
