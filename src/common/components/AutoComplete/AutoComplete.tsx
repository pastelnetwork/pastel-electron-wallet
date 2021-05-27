import React, { useEffect } from 'react'
import Downshift from 'downshift'
import caretDownIcon from '../../../common/assets/icons/ico-caret-down.svg'
import NumberFormat from 'react-number-format'
import cn from 'classnames'

export type Option = {
  value: string
}

export type AutoCompleteProps = {
  options: Option[]
  onChange?: (option: Option | null) => void
  selected: Option | null
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
  const options: Array<Option> = []
  options.push({ value: '0' })
  useEffect(() => {
    for (let i = startNumber; i <= endNumber; i += diffNumber) {
      options.push({ value: i.toString() })
    }
  })
  return (
    <Downshift
      selectedItem={selected ? selected : options[0]}
      onChange={onChange}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getInputProps,
      }) => (
        <div className='relative'>
          <div className='relative w-111px'>
            <NumberFormat
              displayType={'input'}
              className='rounded text-gray-800 border h-36px shadow-2 w-full pl-18px pr-41px pt-8px pb-6px font-extrabold text-16px'
              {...getInputProps()}
              thousandSeparator={true}
            />
            <img
              className='absolute top-0 text-gray-b0 ml-2 top-16px right-16px'
              src={caretDownIcon}
              alt='toggle menu'
              {...getToggleButtonProps()}
            />
          </div>
          {isOpen ? (
            <ul
              {...getMenuProps()}
              className='mt-px absolute bg-white focus:border-blue-3f w-112px rounded rounded-4px shadow-large border-gray-e6'
              onClick={e => e.stopPropagation()}
            >
              {options
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => {
                  const highlight =
                    selectedItem === item || highlightedIndex === index
                  return (
                    <li
                      type='button'
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                      })}
                      className={cn(
                        'w-full h-40px flex items-center px-4 text-gray-35 rounded',
                        highlight && 'bg-gray-f7',
                      )}
                    >
                      <NumberFormat
                        value={item.value}
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
          ) : null}
        </div>
      )}
    </Downshift>
  )
}
