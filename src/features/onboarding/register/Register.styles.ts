import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  display: flex;
`

export const RegisterContainer = styled.div`
  height: 600px;
`

export const Container = styled.div`
  margin-top: 28px;
  display: flex;
  height: 425px;
`

export const StepsContainer = styled.div`
  width: 45%;
  min-width: 405px;
`

export const FormContainer = styled.div`
  width: 48%;
  min-width: 400px;
  padding: 0 20px 0 40px;
  display: flex;
  flex-direction: column;
`

export const Steps = styled.div`
  display: flex;
  flex-direction: column;
`

export const Step = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ $active }) => ($active ? '13px' : '0')} 30px;
  background-color: ${({ $active, theme }) =>
    $active && theme.colors.background.main};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.body1.size}px;
  font-weight: ${({ $active }) => $active && '700'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.primary : '#A0AEC0'};
  margin: 24px 0;
  position: relative;
  &:first-of-type {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 0;
    &:after {
      display: none;
    }
  }
  &:after {
    content: '';
    position: absolute;
    height: 32px;
    border: 1px dashed ${({ theme }) => theme.colors.text.secondary};
    bottom: -40px;
    left: 51px;
  }
`

export const StepLabel = styled.span`
  margin: 0 13px 0 32px;
`

export const StepInfoIcon = styled.img`
  cursor: pointer;
  margin-right: 20px;
`

export const StepActiveArrow = styled.img`
  margin-left: auto;
`

export const ProgressBar = styled.div`
  width: 64px;
  margin-left: 175px;

  .CircularProgressbar {
    position: relative;
  }

  .CircularProgressbar-path {
    stroke: ${({ theme }) => theme.colors.success.default};
    stroke-width: 8px;
    transition: stroke-dashoffset 0.5s;
  }

  .CircularProgressbar-trail {
    stroke: #e7e8eb;
    stroke-width: 8px;
  }
`

export const ProgressBarText = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.body2.size}px;
  font-weight: 700;
  margin-bottom: 12px;
`
export const StepsButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
`

export const TextContainer = styled.div``
