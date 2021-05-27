import styled from 'styled-components'

const ConversationSearch = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: #282a2d;
`

const ConversationSearchInput = styled.input`
  background: #282a2d;
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  color: #fff;
  &::placeholder {
    text-align: center;
  }

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    text-align: left;
  }
`

export { ConversationSearch, ConversationSearchInput }
