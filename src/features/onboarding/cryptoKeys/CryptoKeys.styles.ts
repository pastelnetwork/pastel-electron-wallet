import styled from 'styled-components'

export const Container = styled.div``

export const KeyContainer = styled.div`
  width: 100%;
  margin-top: 25px;
`

export const KeyHeader = styled.div`
  width: 100%;
  display: flex;
`

export const InfoContainer = styled.div`
  margin-left: 13px;
`

export const InfoIcon = styled.img``

export const KeyContent = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 4px;
  padding: 9px 16px;
  margin-top: 10px;
`
export const BackLink = styled.div`
  text-align: center;
  margin-top: 22px;
  cursor: pointer;
`
