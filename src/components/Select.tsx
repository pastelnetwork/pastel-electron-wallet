/* eslint-disable */

import React from 'react'
import ReactSelect from 'react-select'
const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#c3921f;' : 'white',
    background: '#212124;',
    padding: 20,
  }),
  menu: (provided: any) => ({ ...provided, background: '#212124;' }),
  control: () => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'flex',
    background: '#212124;',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    return { ...provided, opacity, transition, color: '#ffffff' }
  },
}
export default function Select({ value, options, styles, onChange }: any) {
  return (
    <ReactSelect
      value={value}
      options={options}
      styles={{ ...selectStyles, ...styles }} // $FlowFixMe
      onChange={onChange}
    />
  )
}
