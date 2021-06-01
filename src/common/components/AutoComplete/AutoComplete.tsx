import React, { useEffect, useState } from 'react'
import { useCombobox } from 'downshift'
import caretDownIcon from '../../../common/assets/icons/ico-caret-down.svg'
import NumberFormat from 'react-number-format'
import cn from 'classnames'

export type AutoCompleteProps = {
  onChange?: (option: string | null) => void
  selected: string
  startNumber: number
  endNumber: number
  diffNumber: number
}

export default function AutoComplete({
  onChange,
  selected,
  startNumber,
  endNumber,
  diffNumber,
}: AutoCompleteProps): JSX.Element {
  const options: Array<string> = []
  options.push('0')
  useEffect(() => {
    for (let i = startNumber; i <= endNumber; i += diffNumber) {
      options.push(i.toString())
    }
  })

  const [inputItems, setInputItems] = useState(options)
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    selectedItem: selected,
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        onChange && onChange(inputValue)
        setInputItems(
          options.filter(item =>
            item
              .replace(/,/g, '')
              .toLowerCase()
              .startsWith(inputValue.replace(/,/g, '').toLowerCase()),
          ),
        )
      }
    },
  })

  return (
    <div className='relative' {...getComboboxProps()}>
      <div className='relative w-111px'>
        <NumberFormat
          displayType={'input'}
          className='rounded text-gray-800 border h-9 shadow-2 w-full pl-18px pr-41px pt-2 pb-1.5 font-extrabold text-base'
          {...getInputProps()}
          thousandSeparator={true}
        />
        <img
          className='absolute top-0 text-gray-b0 ml-2 top-4 right-4'
          src={caretDownIcon}
          alt='toggle menu'
          {...getToggleButtonProps()}
        />
      </div>
      <ul
        {...getMenuProps()}
        className={`${
          isOpen
            ? 'mt-px absolute bg-white focus:border-blue-3f w-28 rounded rounded shadow-large border-gray-e6 z-50'
            : ''
        }`}
        onClick={e => e.stopPropagation()}
      >
        {isOpen &&
          inputItems.map((item, index) => {
            return (
              <li
                key={index}
                className={cn(
                  'w-full h-10 flex items-center px-4 text-gray-35 rounded',
                  highlightedIndex === index && 'bg-gray-f7',
                )}
                {...getItemProps({ item, index })}
              >
                <NumberFormat
                  value={item}
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(formattedValue: string) => (
                    <span>{formattedValue}</span>
                  )}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
