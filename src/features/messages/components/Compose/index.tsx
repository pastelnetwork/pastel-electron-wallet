import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { ReactMic } from 'react-mic'

import { createMessage } from '../../MessagesStore'
import ToolbarIconButton from '../ToolbarButton'

import * as Styles from './Compose.styles'

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

  const onChangeShowEmoji = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setShowEmoji(!showEmoji)
  }

  const onChangeShowImage = () => {
    const element = document.getElementById('input-compose-image')
    element?.click()
  }

  const onChangeImageCompose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files?.length) {
      Array.from(files).forEach((file: File) => {
        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        if (['jpg', 'png', 'jpeg'].includes(ext)) {
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

  const handleRecording = (isStart: boolean) => () => {
    setRecord(isStart)
  }

  const deleteRecording = () => {
    setAudio('')
  }

  const onChangeShowRecord = () => {
    setShowRecord(!showRecord)
    setAudio('')
    setTimeout(() => {
      setRecord(true)
    }, 300)
    setTimeout(scrollToBottom, 100)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const pickerWrap = document.getElementById(
        'wrapperEmoji',
      ) as HTMLDivElement
      if (pickerWrap && !pickerWrap.contains(e.target as Node)) {
        if (showEmoji) {
          setShowEmoji(!showEmoji)
        }
      }
    }
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [showEmoji])

  return (
    <Styles.Compose>
      <>
        {messageImage.length !== 0 && (
          <Styles.WrapperListImageCompose>
            {messageImage.map((item, index) => (
              <Styles.WrapperImageCompose key={index}>
                <Styles.ImageCompose src={item} alt='image compose' />
                <ToolbarIconButton
                  key='close'
                  icon='fa fa-times-circle icon-delete-image'
                  onClick={onDeleteImage(item)}
                />
              </Styles.WrapperImageCompose>
            ))}
          </Styles.WrapperListImageCompose>
        )}
      </>
      <>
        {showRecord && (
          <Styles.WrapperRecordCompose>
            <Styles.RecordBottomCompose>
              <ToolbarIconButton
                icon='fa fa-play icon-audio'
                onClick={handleRecording(true)}
              />
              <ToolbarIconButton
                icon='fa fa-stop icon-audio'
                onClick={handleRecording(false)}
              />
              <ToolbarIconButton
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
                <Styles.AudioCompose src={audio} controls />
              )}
            </Styles.RecordBottomCompose>
          </Styles.WrapperRecordCompose>
        )}
      </>

      <Styles.WrapperCompose>
        <Styles.WrapperIconCompose>
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
        </Styles.WrapperIconCompose>
        <Styles.WrapperEmoji
          className={`${showEmoji && 'active'}`}
          id='wrapperEmoji'
        >
          <Picker onSelect={onChangeEmoji} set='facebook' theme='dark' />
        </Styles.WrapperEmoji>
        <Styles.WrapperInputCompose>
          <Styles.ComposeInput
            type='text'
            placeholder='Type a message, @name'
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
            name='message'
            value={messageTyping}
            id='message-input'
          />
        </Styles.WrapperInputCompose>
        <Styles.ButtonClickSend onClick={handleSendMsg} />
        <Styles.InputComposeImage
          type='file'
          id='input-compose-image'
          onChange={onChangeImageCompose}
          accept='image/*'
          multiple
        />
      </Styles.WrapperCompose>
    </Styles.Compose>
  )
}

export default connect(null, { createMessage })(InputCompose)
