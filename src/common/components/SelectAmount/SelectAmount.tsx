import React, { useState, KeyboardEvent, useEffect } from 'react'
import Downshift from 'downshift'
import cn from 'classnames'

import { useOptions, validate, formatDisplayNumber } from './SelectAmount.utils'
import { Caret } from '../Icons'

export type TOption = {
  label: string
  value: string
}

export type TSelectAmountProps = {
  min: number
  max: number
  step: number
  onChange?: (selection: TOption) => void
  className?: string
  invalidClassName?: string
  invalidInputClassName?: string
  disabled?: boolean
  defaultValue?: TOption
  forceUpdate?: boolean
}

const inputEventTypesToIgnore: string[] = [
  Downshift.stateChangeTypes.mouseUp,
  Downshift.stateChangeTypes.blurInput,
  Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem,
]

export default function SelectAmount({
  min,
  max,
  step,
  onChange,
  disabled,
  className,
  invalidClassName,
  invalidInputClassName,
  defaultValue,
  forceUpdate,
}: TSelectAmountProps): JSX.Element {
  const [isValid, setIsValid] = useState(true)
  const options: TOption[] = useOptions(min, max, step)
  const [selected, setSelected] = useState(
    defaultValue || {
      label: '',
      value: '',
    },
  )

  useEffect(() => {
    if (forceUpdate && defaultValue?.value) {
      setSelected(defaultValue)
    }
  }, [forceUpdate])

  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!validate(e)) {
      const selection = {
        label: selected.label.slice(0, -1),
        value: selected.value.slice(0, -1),
      }
      setSelected(selection)
      onChange && onChange(selection)
    }
  }

  return (
    <Downshift
      onChange={selection => {
        setSelected(selection)
        onChange && onChange(selection)
      }}
      onInputValueChange={(inputValue: string, options) => {
        const { type } = (options as unknown) as { type: string }
        if (inputEventTypesToIgnore.includes(type)) {
          return
        }
        if (parseFloat(inputValue) > max || parseFloat(inputValue) < min) {
          setIsValid(false)
        }
        const selection = {
          label: inputValue,
          value: inputValue,
        }
        setSelected(selection)
        onChange && onChange(selection)
      }}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => {
        const filteredOptions = inputValue
          ? options.filter(option => option.value.startsWith(inputValue))
          : options

        return (
          <div
            className={cn(
              'transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f input flex-center p-0 relative',
              disabled && 'bg-gray-f6 border-gray-ec cursor-not-allowed',
              !isValid && invalidClassName,
              className,
            )}
          >
            <div
              className={cn(
                'relative w-full h-full flex items-center',
                disabled && 'bg-gray-f6 border-gray-ec cursor-not-allowed',
              )}
            >
              <input
                {...getToggleButtonProps()}
                {...getInputProps()}
                type='text'
                role='input'
                value={formatDisplayNumber(selected?.label)}
                onKeyUp={handleOnKeyUp}
                className={cn(
                  'h-full w-full rounded pr-7 text-gray-35 font-extrabold focus-visible-border disabled:bg-gray-f6 pl-18px',
                  disabled && 'cursor-not-allowed',
                  !isValid && invalidInputClassName,
                )}
              />
              <button {...getToggleButtonProps()} className='w-10px mr-4'>
                <Caret
                  size={10}
                  to='bottom'
                  className={cn(
                    'text-gray-b0 transition duration-200 transform',
                    isOpen && 'rotate-180',
                    disabled && 'cursor-not-allowed',
                  )}
                />
              </button>
            </div>
            <ul
              {...getMenuProps()}
              className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-16px text-gray-35 font-medium overflow-y-auto z-100 max-h-[200px]'
              onClick={e => e.stopPropagation()}
            >
              {isOpen
                ? filteredOptions.map((item, index) => {
                    const highlight =
                      selectedItem === item || highlightedIndex === index

                    return (
                      <li
                        key={index}
                        {...getItemProps({
                          key: item.label,
                          item,
                          index,
                        })}
                        className={cn(
                          'w-full h-10 flex items-center px-4 text-gray-71 cursor-pointer',
                          highlight && 'bg-gray-f7',
                        )}
                      >
                        {item.label}
                      </li>
                    )
                  })
                : null}
            </ul>
          </div>
        )
      }}
    </Downshift>
  )
}
