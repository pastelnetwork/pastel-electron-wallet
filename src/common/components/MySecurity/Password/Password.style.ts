import styled from 'styled-components'

export const InputContainer = styled.div.attrs({
  className: 'relative',
})``

export const Input = styled.input.attrs(props => ({
  className: `relative w-full shadow-input h-10 mt-2.5 rounded border 
  border-solid border-input-border outline-none focus:border-blue-450 box-border px-4 ${
    props.color ? props.color : 'pr-10'
  }`,
}))``

export const IconButton = styled.img.attrs({
  className: 'absolute top-5 right-3  hover: cursor-pointer w-5 h-5',
})``

export const IconRefreshButton = styled.img.attrs({
  className: 'absolute top-5 right-12  hover: cursor-pointer w-5 h-5',
})``

export const LoadContainer = styled.div.attrs({
  className: 'grid grid-cols-4 gap-1 mt-4 mb-6',
})``

export const Spacer = styled.div.attrs({
  className: 'h-4',
})``
