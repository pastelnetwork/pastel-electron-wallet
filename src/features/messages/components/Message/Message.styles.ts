import styled from 'styled-components'

const Message = styled.div`
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  &.mine .bubble-container {
    align-items: flex-end;
  }
  &.start .bubble-container .bubble {
    border-top-left-radius: 20px;
  }
  &.end .bubble-container .bubble {
    border-bottom-left-radius: 20px;
  }
  &.mine.start .bubble-container .bubble {
    margin-top: 10px;
    border-top-right-radius: 20px;
  }
  &.mine.end .bubble-container .bubble {
    border-bottom-right-radius: 20px;
  }
  &.mine .bubble-container .bubble {
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`

const Timestamp = styled.div`
  display: flex;
  justify-content: center;
  color: #999;
  font-weight: 600;
  font-size: 12px;
  margin: 10px 0px;
  text-transform: uppercase;
`

const BubbleContainer = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Bubble = styled.div`
  margin: 1px 0px;
  background: hsla(0, 0%, 100%, 0.05);
  color: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 75%;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`

const WrapperBubbleImage = styled.div`
  width: 100px;
  height: 100px;
  margin: 1px 0px;
  background: hsla(0, 0%, 100%, 0.05);
  color: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 75%;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-radius: 10px !important;
  margin-top: 0 !important;
`

const ImageBubble = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const WrapperBubbleAudio = styled.div`
  margin: 1px 0px;
  background: hsla(0, 0%, 100%, 0.05);
  color: #fff;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 75%;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-radius: 10px !important;
  margin-top: 0 !important;
`

const AudioBubble = styled.audio`
  height: 30px;
  &:focus {
    outline: none;
  }
`

export {
  Message,
  Timestamp,
  BubbleContainer,
  Bubble,
  WrapperBubbleImage,
  ImageBubble,
  WrapperBubbleAudio,
  AudioBubble,
}
