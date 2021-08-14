import React, { ReactNode } from 'react'
import Downshift from 'downshift'
import caretDownIcon from 'common/assets/icons/ico-caret-down.svg'
import cn from 'classnames'
import { parseFormattedNumber } from 'common/utils/format'
import { useSelectOptions } from './select.utils'
import FormControl, {
  TFormControlProps,
} from 'common/components/Form/FormControl'
import { Controller, FieldValues } from 'react-hook-form'

export type TOption = {
  label: string
  value: string
}

export type TBaseProps = {
  placeholder?: string
  className?: string
  selectClassName?: string
  label?: ReactNode
  autocomplete?: boolean
  append?: ReactNode
  prepend?: ReactNode
  labelClasses?: string
  icon?: string
  iconClasses?: string
  disabled?: boolean
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

export type TFormOptionsProps<TForm> = TBaseProps &
  Omit<TFormControlProps<TForm>, 'children'> & {
    options: TOption[]
  }

export type TSelectProps<TForm> =
  | TOptionsProps
  | TFormOptionsProps<TForm>
  | TRangeProps

export default function Select<TForm extends FieldValues>(
  props: TSelectProps<TForm>,
): JSX.Element {
  if ('form' in props) {
    return (
      <FormControl {...props}>
        <Controller
          name={props.name}
          control={props.form.control}
          render={({ field: { value, onChange } }) => (
            <SelectInner
              {...props}
              label={undefined}
              selected={value as TOption | null}
              onChange={onChange}
            />
          )}
        />
      </FormControl>
    )
  }

  return <SelectInner {...props} />
}

const SelectInner = (props: TOptionsProps | TRangeProps) => {
  const {
    placeholder,
    selectClassName,
    label,
    autocomplete = false,
    append,
    labelClasses = 'text-gray-71 mr-2 absolute right-2.5',
    icon = '',
    iconClasses = '',
    disabled = false,
  } = props

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
              'transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f input flex-center p-0 relative',
              disabled && 'bg-gray-f6 border-gray-ec cursor-not-allowed',
              autoCompleteColor,
              selectClassName,
            )}
          >
            {icon && (
              <img
                src={icon}
                className={cn(
                  'absolute top-2/4 left-3 transform -translate-y-2/4 w-3',
                  iconClasses,
                )}
              />
            )}
            {autocomplete && (
              <div
                className={cn(
                  'relative',
                  disabled && 'bg-gray-f6 border-gray-ec cursor-not-allowed',
                )}
              >
                <input
                  className={cn(
                    'h-full w-full rounded pr-7 text-gray-35 font-extrabold focus-visible-border disabled:bg-gray-f6',
                    icon ? 'pl-9 relative z-10' : 'pl-18px',
                    disabled && 'cursor-not-allowed',
                  )}
                  {...getToggleButtonProps()}
                  {...getInputProps()}
                  type='text'
                  role='input'
                  disabled={disabled}
                  value={
                    append
                      ? `${inputValueRef.current}${append}`
                      : `${inputValueRef.current}`
                  }
                />
                {label && <span className={labelClasses}>{label}</span>}
              </div>
            )}
            {!autocomplete && (
              <button
                className={cn(
                  'w-full h-full flex items-center whitespace-nowrap pr-7 focus-visible-border',
                  icon ? 'pl-9 relative z-10' : 'pl-3.5',
                  disabled && 'cursor-not-allowed',
                )}
                disabled={disabled}
                {...getToggleButtonProps()}
              >
                {label && <span className='text-gray-b0 mr-2'>{label}</span>}
                {selectedItem ? selectedItem.label : placeholder}
              </button>
            )}
            <img
              className={cn(
                'text-gray-b0 ml-2 absolute right-3 transition duration-200 transform',
                isOpen && 'rotate-180',
                disabled && 'cursor-not-allowed',
              )}
              src={caretDownIcon}
              alt='toggle menu'
            />
            <ul
              {...getMenuProps()}
              className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-20'
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
                    {append}
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
