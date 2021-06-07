import React from 'react'
import Downshift from 'downshift'
import caretDownIcon from '../../../common/assets/icons/ico-caret-down.svg'
import cn from 'classnames'
import { parseFormattedNumber } from '../../utils/format'
import { useSelectOptions } from './select.utils'

export type TOption = {
  label: string
  value: string
}

export type TBaseProps = {
  placeholder?: string
  className?: string
  label?: string
  autocomplete?: boolean
}

export type TOptionsProps = TBaseProps & {
  options: TOption[]
  onChange: (option: TOption | null) => void
  selected?: TOption | null
}

export type TRangeProps = TBaseProps & {
  min: number
  max: number
  step: number
  onChange: (value: number | null) => void
  value: number | null
}

export type TSelectProps = TOptionsProps | TRangeProps

export default function Select(props: TSelectProps): JSX.Element {
  const { placeholder, className, label, autocomplete = false } = props

  const {
    options,
    selected,
    onChange,
    onInputValueChange,
    inputValueRef,
  } = useSelectOptions(props)

  let autoCompleteColor: string
  if ('options' in props) {
    autoCompleteColor = props.label ? 'text-gray-2d' : 'text-gray-71'
  } else {
    autoCompleteColor = 'text-gray-35'
  }

  return (
    <Downshift
      selectedItem={selected}
      onChange={onChange}
      itemToString={item => (item ? item.value : '')}
      onInputValueChange={onInputValueChange}
    >
      {({
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        inputValue,
        getInputProps,
      }) => {
        const value =
          autocomplete &&
          inputValue &&
          parseFormattedNumber(inputValue).toString()
        const filteredOptions = isOpen
          ? value
            ? options.filter(option => option.value.startsWith(value))
            : options
          : undefined

        return (
          <div
            className={cn(
              'bg-white text-gray-71 flex-center shadow-2px h-10 rounded relative',
              autoCompleteColor,
              className,
            )}
          >
            {autocomplete && (
              <input
                className='h-full w-full rounded pl-18px pr-7 text-gray-35 font-extrabold focus-visible-border'
                {...getToggleButtonProps()}
                {...getInputProps()}
                type='text'
                role='input'
                value={inputValueRef.current}
              />
            )}
            {!autocomplete && (
              <button
                className='w-full h-full flex items-center whitespace-nowrap pl-14px pr-7 focus-visible-border'
                {...getToggleButtonProps()}
              >
                {label && <span className='text-gray-b0 mr-2'>{label}:</span>}
                {selectedItem ? selectedItem.label : placeholder}
              </button>
            )}
            <img
              className={cn(
                'text-gray-b0 ml-2 absolute right-3 transition duration-200 transform',
                isOpen && 'rotate-180',
              )}
              src={caretDownIcon}
              alt='toggle menu'
            />
            <ul
              {...getMenuProps()}
              className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-10'
              onClick={e => e.stopPropagation()}
            >
              {filteredOptions?.map((item, index) => {
                const highlight =
                  selectedItem === item || highlightedIndex === index

                return (
                  <li
                    {...getItemProps({
                      key: item.label,
                      index,
                      item,
                    })}
                    className={cn(
                      'w-full h-10 flex items-center px-4 text-gray-71 cursor-pointer',
                      highlight && 'bg-gray-f7',
                    )}
                  >
                    {item.label}
                  </li>
                )
              })}
            </ul>
          </div>
        )
      }}
    </Downshift>
  )
}
