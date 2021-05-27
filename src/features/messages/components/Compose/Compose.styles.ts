import styled from 'styled-components'

const Compose = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: white;
  border-top: 1px solid #eeeef1;
  margin-bottom: 16px;
  width: calc(100% - 20px);
  bottom: 16px;
  background-color: #2e3033;
  border-top: 1px solid rgba(0, 0, 0, 0.16);
`

const WrapperListImageCompose = styled.div`
  display: flex;
  margin-bottom: 10px;
  overflow: auto;
  max-width: 500px;
`

const WrapperImageCompose = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 10px 5px;
  position: relative;
`

const ImageCompose = styled.img`
  object-fit: cover;
  width: 85%;
  height: 85%;
`

const WrapperRecordCompose = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RecordBottomCompose = styled.div`
  display: flex;
  align-items: center;
  & .sound-wave {
    height: 50px;
    width: 300px;
    border-radius: 25px;
    margin-left: 15px;
  }
`

const WrapperCompose = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WrapperIconCompose = styled.div`
  margin-right: 15px;
`

const WrapperEmoji = styled.div`
  display: none;
  position: absolute;
  top: -326px;
  left: 85px;
  &.active {
    display: block;
  }
  & .emoji-mart-bar {
    display: none;
  }
`

const WrapperInputCompose = styled.div`
  flex: 1;
`

const ComposeInput = styled.input`
  flex: 1;
  font-size: 14px;
  height: 40px;
  background: none;
  margin-right: 10px;
  color: #fff;
  border-radius: 20px;
  border: 1px solid #bbbbbf;
  padding: 0 10px;
  width: calc(100% - 25px);
  &::placeholder {
    opacity: 0.3;
  }
  &:focus {
    outline: none;
  }
`

const ButtonClickSend = styled.div`
  width: 0;
  height: 0;
`

const InputComposeImage = styled.input`
  width: 0;
  height: 0;
`

const AudioCompose = styled.audio`
  height: 50px;
  margin-left: 15px;
`

export {
  Compose,
  WrapperListImageCompose,
  WrapperImageCompose,
  ImageCompose,
  WrapperRecordCompose,
  RecordBottomCompose,
  WrapperCompose,
  WrapperIconCompose,
  WrapperEmoji,
  WrapperInputCompose,
  ComposeInput,
  ButtonClickSend,
  InputComposeImage,
  AudioCompose,
}
