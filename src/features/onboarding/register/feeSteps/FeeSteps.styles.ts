import styled from 'styled-components'

export const Container = styled.div`
  flex: 1;
`

export const RadioContainer = styled.div`
  margin-top: 25px;
`

export const DownloadContainer = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 4px;
  padding: 9px 16px;
  margin: 30px 0 8px;
`

export const Image = styled.img`
  margin: 0 10px;
  cursor: pointer;
`
