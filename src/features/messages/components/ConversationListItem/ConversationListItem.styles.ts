import styled from 'styled-components'

const ConversationListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 20px 10px 20px;
  background-color: #2c2c30;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  &.active {
    border: 1px solid #c3921f;
  }
`

const ConversationPhoto = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`

const ConversationTitle = styled.h1`
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  margin: 0;
  color: #fff;
`

const ConversationSnippet = styled.p`
  font-size: 14px;
  color: #888;
  margin: 0;
  margin-top: 5px;
`

export {
  ConversationListItem,
  ConversationPhoto,
  ConversationTitle,
  ConversationSnippet,
}
