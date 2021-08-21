import React, { useState, KeyboardEvent } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { X, Caret } from 'common/components/Icons'
import cn from 'classnames'
import { Controller, FieldValues } from 'react-hook-form'
import FormControl, { TFormControlProps } from '../Form/FormControl'

export type TOption = {
  label: string
  value: string
}

type TBaseProps = {
  options: TOption[]
  name: string
  selectClassName?: string
  placeholder?: string
  disabled?: boolean
}

export type TControlledProps = TBaseProps & {
  selected: TOption[]
  onChange(selected: TOption[]): void
}

export type TFormProps<TForm> = TBaseProps &
  Omit<TFormControlProps<TForm>, 'children'>

export default function SelectMultiple<TForm extends FieldValues>(
  props: TControlledProps | TFormProps<TForm>,
): JSX.Element {
  if ('form' in props) {
    return (
      <FormControl {...props}>
        <Controller
          name={props.name}
          control={props.form.control}
          render={({ field: { value, onChange } }) => (
            <SelectMultipleInner
              {...props}
              selected={value}
              onChange={onChange}
            />
          )}
        />
      </FormControl>
    )
  }

  return <SelectMultipleInner {...props} />
}

const SelectMultipleInner = ({
  options,
  selected,
  name,
  onChange,
  selectClassName,
  placeholder,
  disabled = false,
}: TControlledProps) => {
  const [inputValue, setInputValue] = useState('')

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: selected,
    onSelectedItemsChange({ selectedItems }) {
      onChange(selectedItems || [])
    },
  })

  const lowerValue = inputValue.toLocaleLowerCase()
  const filteredItems = options.filter(
    item =>
      !selectedItems.includes(item) &&
      (!lowerValue || item.label.toLocaleLowerCase().includes(lowerValue)),
  )

  if (lowerValue) {
    filteredItems.sort(item =>
      item.label.toLocaleLowerCase().startsWith(lowerValue) ? -1 : 0,
    )
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: filteredItems,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ inputValue = '', type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem)
          }
          break
        default:
          break
      }
    },
  })

  const id = `${name}SelectMultiple`

  const inputProps = getInputProps(
    getDropdownProps({ preventKeyAction: isOpen, disabled }),
  )

  const { onKeyDown } = inputProps
  inputProps.onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    if (e.key === 'Backspace' && value.length === 0) {
      const last = selectedItems[selectedItems.length - 1]
      if (last) {
        removeSelectedItem(last)
      }
    } else {
      onKeyDown(e)
    }
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        'input h-auto flex items-start p-2 pt-7px pb-px pr-3 relative transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f',
        inputProps.disabled && 'bg-gray-f6 border-gray-ec cursor-not-allowed',
        selectClassName,
      )}
      {...getLabelProps()}
    >
      <div className='flex-grow flex flex-wrap'>
        {selectedItems.map((item, index) => (
          <div
            key={item.value}
            className='bg-gray-71 rounded-full h-6 px-2 mr-1.5 mb-1.5 text-white text-sm leading-6 flex-center'
            {...getSelectedItemProps({ selectedItem: item, index })}
          >
            {item.label}
            <button
              type='button'
              className='ml-2'
              onClick={() => removeSelectedItem(item)}
            >
              <X size={8} />
            </button>
          </div>
        ))}
        <div
          {...getComboboxProps()}
          className='flex-grow relative mb-1.5 h-6 min-w-[80px]'
        >
          <input
            id={id}
            className='absolute inset-0 w-full pl-2 disabled:bg-gray-f6 disabled:cursor-not-allowed'
            placeholder={placeholder}
            {...inputProps}
          />
        </div>
      </div>
      <button
        type='button'
        {...getToggleButtonProps()}
        className={cn(
          'mt-1.5 w-4 h-4 flex-center flex-shrink-0',
          disabled && 'cursor-not-allowed',
        )}
        aria-label='toggle menu'
        disabled={disabled}
      >
        <Caret size={8} to='bottom' />
      </button>
      <div
        {...getMenuProps()}
        className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-10'
      >
        {isOpen &&
          filteredItems.map((item, index) => (
            <div
              key={item.value}
              {...getItemProps({ item, index })}
              className={cn(
                'w-full h-10 flex items-center px-4 text-gray-71 cursor-pointer',
                highlightedIndex === index && 'bg-gray-f7',
              )}
            >
              {item.label}
            </div>
          ))}
      </div>
    </label>
  )
}
