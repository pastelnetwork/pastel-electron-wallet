import styled from 'styled-components'

export const MySecurityContainer = styled.div`
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 30px 60px;
  background-color: ${({ theme }) => theme.colors.background.main};
`

export const CardContainer = styled.div.attrs({
  className: 'grid grid-cols-3 gap-4 min-h-672',
})``

export const Card = styled.div.attrs({
  className:
    'relative flex flex-col max-w-472 h-full rounded-8 p-30 colors.white',
})``

export const DescriptionContainer = styled.div.attrs({
  className: 'min-h-78 mt-12',
})``

export const BodyContainer = styled.div.attrs({
  className: 'flex-grow my-18',
})``
