import styled from 'styled-components'

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fonts.h1};
  line-height: 40px;
  margin: 0;
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: ${({ theme }) => theme.fonts.small};
  line-height: 24px;
  max-width: 350px;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
`

export const Container = styled.div`
  margin-top: 28px;
  display: flex;
`

export const StepsContainer = styled.div`
  width: 45%;
  min-width: 405px;
`

export const FormContainer = styled.div`
  width: 48%;
  min-width: 400px;
  padding: 0 20px 0 40px;
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
    $active && theme.colors.grayLight};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fonts.big};
  font-weight: ${({ $active }) => $active && '700'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textDark : '#A0AEC0'};

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
    border: 1px dashed ${({ theme }) => theme.colors.grayLight};
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
  width: 65px;
  height: 64px;
  margin: 0 25px;

  .CircularProgressbar-path {
    stroke: ${({ theme }) => theme.colors.green};
    stroke-width: 8px;
    transition: stroke-dashoffset 0.5s;
  }
  .CircularProgressbar-trail {
    stroke: #e7e8eb;
    stroke-width: 8px;
  }
  .CircularProgressbar-text {
    fill: #11142d;
    font-size: ${({ theme }) => theme.fonts.h2};
    font-weight: 700;
  }
`
