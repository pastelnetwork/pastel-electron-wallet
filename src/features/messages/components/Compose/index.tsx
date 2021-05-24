import React, { useState } from 'react'
import { connect } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { ReactMic } from 'react-mic'

import { createMessage } from '../../MessagesStore'
import ToolbarIconButton from '../ToolbarButton'
import './Compose.css'

interface IComposeProps {
  createMessage: (msg: string, image: string[], audio: string) => void
  isLoading?: boolean
}

interface IEmoji {
  colons: string
  emoticons: []
  id: string
  name: string
  native: string
  short_names: []
  skin: null
  unified: string
}

interface IAudio {
  blob: Blob
  startTime: number
  stopTime: number
  option: {
    audioBitsPerSecond: number
    mimeType: string
  }
  blobURL: string
}

function InputCompose(props: IComposeProps): JSX.Element {
  const { createMessage, isLoading } = props
  const [messageTyping, setMessage] = useState('')
  const [messageImage, setMessageImage] = useState<string[]>([])
  const [showEmoji, setShowEmoji] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const [record, setRecord] = useState(false)
  const [audio, setAudio] = useState('')

  const onSend = () => {
    createMessage(messageTyping, messageImage, audio)
    setTimeout(scrollToBottom, 100)
  }

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

  const handleSendMsg = () => {
    if (messageTyping || messageImage || audio) {
      onSend()
      setMessage('')
      setMessageImage([])
      setAudio('')
      setShowRecord(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMsg()
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onChangeEmoji = (emoji: IEmoji) => {
    setMessage(_message => {
      return _message + emoji.native
    })
  }

  const onChangeShowEmoji = () => {
    setShowEmoji(!showEmoji)
  }

  const onChangeShowImage = () => {
    const element = document.getElementById('input-compose-image')
    element?.click()
  }

  const onChangeImageCompose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        if (!['jpg', 'png', 'jpeg'].includes(ext)) {
          console.log('File invalid')
        } else {
          onReadFile(file)
        }
      })
      e.target.value = ''
    }
  }

  const onReadFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = e => {
      const { result } = e.target as { result: string }
      setMessageImage(preImage => [...preImage, result])
      setTimeout(scrollToBottom, 100)
    }
    reader.readAsDataURL(file)
  }

  const onDeleteImage = (item: string) => () => {
    const newData = messageImage.filter(key => {
      return !key.includes(item)
    })
    setMessageImage(newData)
  }

  const onStop = (recordedBlob: IAudio) => {
    setAudio(recordedBlob.blobURL)
  }

  const startRecording = () => {
    setRecord(true)
  }

  const stopRecording = () => {
    setRecord(false)
  }

  const deleteRecording = () => {
    setAudio('')
  }

  const onChangeShowRecord = () => {
    setShowRecord(!showRecord)
    setAudio('')
    setTimeout(scrollToBottom, 100)
  }

  return (
    <div className='compose'>
      <>
        {messageImage.length !== 0 && (
          <div className='wrapper-list-image__compose'>
            {messageImage.map(item => (
              <div className='wrapper-image__compose'>
                <img src={item} alt='image compose' />
                <ToolbarIconButton
                  key='close'
                  icon='fa fa-times-circle icon-delete-image'
                  onClick={onDeleteImage(item)}
                />
              </div>
            ))}
          </div>
        )}
      </>
      <>
        {showRecord && (
          <div className='wrapper-record__compose'>
            <div className='record-bottom__compose'>
              <ToolbarIconButton
                key='start'
                icon='fa fa-play icon-audio'
                onClick={startRecording}
              />
              <ToolbarIconButton
                key='start'
                icon='fa fa-stop icon-audio'
                onClick={stopRecording}
              />
              <ToolbarIconButton
                key='start'
                icon='fa fa-trash icon-audio'
                onClick={deleteRecording}
              />
              {!audio ? (
                <ReactMic
                  record={record}
                  onStop={onStop}
                  strokeColor='#bbbbbf'
                  backgroundColor='#fff'
                  className='sound-wave'
                />
              ) : (
                <audio className='audio-compose' src={audio} controls />
              )}
            </div>
          </div>
        )}
      </>

      <div className='wrapper-compose'>
        <div className='wrapper-icon__compose'>
          <ToolbarIconButton
            isLoading={isLoading}
            key='image'
            icon='fa fa-image icon-bottom'
            onClick={onChangeShowImage}
          />
          <ToolbarIconButton
            isLoading={isLoading}
            key='audio'
            icon='fa fa-microphone icon-bottom'
            onClick={onChangeShowRecord}
          />
          <ToolbarIconButton
            isLoading={isLoading}
            key='emoji'
            icon='fa fa-smile icon-bottom'
            onClick={onChangeShowEmoji}
          />
        </div>
        <div className={`wrapper-emoji ${showEmoji && 'active'}`}>
          <Picker onSelect={onChangeEmoji} set='facebook' theme='dark' />
        </div>
        <div className='wrapper-input-compose'>
          <input
            type='text'
            className='compose-input'
            placeholder='Type a message, @name'
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            name='message'
            value={messageTyping}
            id='message-input'
          />
        </div>
        <div
          id='message-send'
          className='button__click-send'
          onClick={handleSendMsg}
        />
        <input
          type='file'
          className='input-compose-image'
          id='input-compose-image'
          onChange={onChangeImageCompose}
          accept='image/*'
          multiple
        />
      </div>
    </div>
  )
}

export default connect(null, { createMessage })(InputCompose)
