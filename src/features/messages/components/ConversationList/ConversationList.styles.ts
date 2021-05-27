import styled from 'styled-components'

const ConversationList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #212326;
`

const ConversationWrapper = styled.div`
  overflow: auto;
  max-height: calc(100vh - 128px);
  margin: 10px 0;
`

export { ConversationList, ConversationWrapper }
