import React, { ReactNode } from 'react'
import ReactSelect, { MenuPosition, OptionTypeBase } from 'react-select'
import { selectStyles } from './styles'

export interface SelectProps {
  options?: ReadonlyArray<OptionTypeBase>
  defaultValue?: OptionTypeBase
  menuPosition?: MenuPosition
  [x: string]: React.MouseEventHandler<Element> | ReactNode | string | undefined
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
