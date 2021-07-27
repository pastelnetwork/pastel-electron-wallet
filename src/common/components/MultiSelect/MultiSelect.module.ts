import { StylesConfig } from 'react-select'
import { TOptionType, TIsMulti } from './MultiSelect'

export const selectStyles: StylesConfig<TOptionType, TIsMulti> = {
  container: styles => ({
    ...styles,
    boxShadow:
      '0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)',
    borderRadius: '0.25rem',
    width: '100%',
    padding: '0',
  }),
  placeholder: styles => ({
    ...styles,
    color: '#A0AEC0',
    fontWeight: 500,
    fontSize: '1rem',
    padding: 0,
  }),
  control: (styles, { isFocused, menuIsOpen }) => {
    const borderColor = menuIsOpen
      ? '#3f9af7'
      : isFocused
      ? '#718096'
      : 'transparent'
    return {
      ...styles,
      backgroundColor: 'transparent',
      borderColor,
      borderWidth: '1px',
      boxShadow: 'none',
      borderRadius: 'inherit',
      padding: '1px 3px 1px 3px',
      cursor: 'pointer',
      '&:hover': {
        borderColor,
      },
    }
  },
  singleValue: styles => ({
    ...styles,
    fontWeight: 500,
    fontSize: '1rem',
    color: '#2D3748',
  }),
  dropdownIndicator: (styles, { selectProps: { menuIsOpen } }) => ({
    ...styles,
    color: '#A0AEC0',
    transition: '0.2s',
    transform: menuIsOpen ? 'rotate(180deg)' : 'none',
    '&:hover': {
      color: '#A0AEC0',
    },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: styles => ({
    ...styles,
    backgroundColor: '#ffffff',
    marginTop: '3px',
    overflow: 'hidden',
    borderRadius: '0.25rem',
    boxShadow:
      '0px 0px 1px rgba(10, 22, 70, 0.06), 0px 16px 16px rgba(10, 22, 70, 0.1)',
    zIndex: 9999,
  }),
  menuList: styles => ({
    ...styles,
    padding: '0',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected ? '#ffffff' : '#353941',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '10px 17px',
    backgroundColor: isSelected ? '#3f9af7' : isFocused ? '#F7F8F9' : '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isSelected ? '#3f9af7' : '#F7F8F9',
    },
  }),
  multiValue: styles => ({
    ...styles,
    background: 'transparent',
    border: '1px solid #DDE0E3',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px 0',
  }),
  multiValueLabel: styles => ({
    ...styles,
    fontSize: '16px',
    padding: '0 4px 0 0',
  }),
  multiValueRemove: styles => ({
    ...styles,
    borderRadius: '100%',
    backgroundColor: '#e6e8ec',
    width: '16px',
    height: '16px',
    color: '#8e98a3',
    padding: '2px',
    transition: '0.2s',
    '&:hover': {
      backgroundColor: '#DDE0E3',
      color: '#8e98a3',
    },
  }),
}
