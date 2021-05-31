import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  flex: 1;
`

export const ContentContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 8px;
  margin-top: 20px;
  padding: 18px 25px;
`
export const PdfContainer = styled.div`
  flex: 1;
  display: flex;
`

export const PdfDetails = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`
export const SwitcherContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 100px;
  padding: 2px 4px;
  position: absolute;
  top: -85px;
`
export const SwitchElement = styled.div<{ active: boolean }>`
  font-family: Avenir;
  padding: 6px 12px;
  border-radius: 100px;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.tab.active : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme.colors.text.tertiary : theme.colors.text.secondary};
  cursor: pointer;
`
export const QRContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  width: 100%;
`
export const PdfDownload = styled.img`
  cursor: pointer;
`
