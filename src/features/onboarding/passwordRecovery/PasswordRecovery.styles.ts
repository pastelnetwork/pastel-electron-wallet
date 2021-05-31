import styled from 'styled-components'

export const Container = styled.div``
export const SwitchContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 100px;
  padding: 2px 4px;
  margin: 20px 0;
  width: 200px;
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

export const QrBackground = styled.div`
  display: flex;
  justify-content: center;
  width: 517px;
  background-color: ${({ theme }) => theme.colors.tab.hover};
  border-radius: 8px;
  padding: 35px 0;
`

export const QrContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.onboarding};
  border-radius: 12px;
  padding: 80px;
`
export const List = styled.div`
  text-align: center;
  margin-top: 12px;
  cursor: pointer;
`
