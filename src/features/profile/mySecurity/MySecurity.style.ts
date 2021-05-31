import styled from 'styled-components'

export const MySecurityContainer = styled.div.attrs({
  className:
    'w-full h-screen items-center flex justify-center py-30px px-60px bg-background-main',
})``

export const CardContainer = styled.div.attrs({
  className: 'grid grid-cols-3 gap-5 min-h-672px',
})``

export const Card = styled.div.attrs({
  className:
    'relative flex flex-col max-w-472px h-full rounded-lg p-30px colors.white rounded-xl bg-white',
})``

export const DescriptionContainer = styled.div.attrs({
  className: 'min-h-78px mt-3',
})``

export const BodyContainer = styled.div.attrs({
  className: 'flex-grow my-4',
})``
