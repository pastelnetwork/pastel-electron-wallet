import './Message.css'

import moment from 'moment'
import React from 'react'

import { TMessage } from '../../MessagesStore'

interface IMessageProps {
  data: TMessage
  isMine: boolean
  startsSequence: boolean
  endsSequence: boolean
  showTimestamp: boolean
}

export default function Messages(props: IMessageProps): JSX.Element {
  const { data, isMine, startsSequence, endsSequence, showTimestamp } = props
  const friendlyTimestamp = moment(data.timestamp).format('LLLL')

  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      {showTimestamp && <div className='timestamp'>{friendlyTimestamp}</div>}

      <div className='bubble-container'>
        {data.message && (
          <div className='bubble' title={friendlyTimestamp}>
            {data.message}
          </div>
        )}
        {data.image.length !== 0 &&
          data.image.map((item: string) => (
            <div className='bubble bubble-image' title={friendlyTimestamp}>
              <img src={item} alt='image-message' />
            </div>
          ))}
        {data.record && (
          <div className='bubble bubble-audio'>
            <audio src={data.record} controls></audio>
          </div>
        )}
      </div>
    </div>
  )
}
