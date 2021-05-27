import styled from 'styled-components'

const BtnWrapperIcon = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  &:focus {
    outline: none;
  }
`

const ToolbarButton = styled.i`
  color: #bbbbbf;
  margin-left: 15px;
  font-size: 28px;
  transition: all 0.1s;
  &:hover {
    color: #99999c;
    cursor: pointer;
  }
  &.icon-delete-image {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 12px;
    color: rgb(1, 1, 1);
  }
  &.icon-audio {
    font-size: 20px;
  }
`

export { BtnWrapperIcon, ToolbarButton }
