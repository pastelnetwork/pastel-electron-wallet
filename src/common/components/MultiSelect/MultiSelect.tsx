import React from 'react'
import ReactSelect from 'react-select'
import { selectStyles } from './MultiSelect.module'
import { ValueType } from 'react-select/src/types'

export type TOptionType = {
  label: string
  value: string
}

export type TIsMulti = true

export type TMultiSelect = {
  options: TOptionType[]
  placeholder?: string
  menuPosition?: 'absolute' | 'fixed'
  className?: string
  name?: string
  onChange?: (value: ValueType<TOptionType, TIsMulti>) => void
  value?: readonly TOptionType[] | null
}

const MultiSelect = ({
  options,
  menuPosition = 'fixed',
  placeholder,
  className,
  name,
  onChange,
  value,
}: TMultiSelect): JSX.Element => (
  <ReactSelect
    value={value}
    styles={selectStyles}
    options={options}
    menuPosition={menuPosition}
    placeholder={placeholder}
    className={className}
    onChange={onChange}
    name={name}
    isClearable={false}
    closeMenuOnSelect={false}
    TisMulti
  />
)

export default MultiSelect
