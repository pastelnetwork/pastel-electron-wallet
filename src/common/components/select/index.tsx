import React from 'react'
import ReactSelect, { MenuPosition, OptionTypeBase } from 'react-select'
import { selectStyles } from './styles'

export interface SelectProps {
  options?: ReadonlyArray<OptionTypeBase>
  defaultValue?: OptionTypeBase
  menuPosition?: MenuPosition
  [x: string]: any
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultValue,
  menuPosition,
  ...otherProps
}) => {
  return (
    <ReactSelect
      styles={selectStyles}
      options={options}
      defaultValue={defaultValue}
      menuPosition={menuPosition}
      {...otherProps}
    />
  )
}

Select.defaultProps = {
  menuPosition: 'fixed',
}

export default Select
