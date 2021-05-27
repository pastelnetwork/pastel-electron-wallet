import styled from 'styled-components'

const MessageList = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MessageHeader = styled.div`
  height: 75px;
  background-color: #212326;
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const ImageMessageHeader = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`

const MessageName = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 20px;
`

const MessageListContainer = styled.div`
  padding: 10px;
  background-color: #282a2d;
  overflow: auto;
  flex: 1;
`

const WrapperNotData = styled.div`
  height: calc(100% - 156px);
`

export {
  MessageList,
  MessageHeader,
  ImageMessageHeader,
  MessageName,
  MessageListContainer,
  WrapperNotData,
}
