import React from 'react';
import ReactSelect from 'react-select';
const selectStyles = {
  option: (provided, state) => ({ ...provided,
    color: state.isSelected ? '#c3921f;' : 'white',
    background: '#212124;',
    padding: 20
  }),
  menu: provided => ({ ...provided,
    background: '#212124;'
  }),
  control: () => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'flex',
    background: '#212124;'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided,
      opacity,
      transition,
      color: '#ffffff'
    };
  }
};
export default function Select({
  value,
  options,
  styles,
  onChange
}) {
  return <ReactSelect value={value} options={options} styles={{ ...selectStyles,
    ...styles
  }} // $FlowFixMe
  onChange={onChange} />;
}