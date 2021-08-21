import React, { ReactNode, useState } from 'react'
import Downshift, { ControllerStateAndHelpers } from 'downshift'
import caretDownIcon from 'common/assets/icons/ico-caret-down.svg'
import cn from 'classnames'
import SelectRange from './SelectRange'
import { TFormControlProps } from '../Form/FormControl'
import { FieldValues } from 'react-hook-form'
import FormSelect from './FormSelect'
import SelectList from './components/SelectList'

export type TOption = {
  label: string
  value: string
}

export type TBaseProps = {
  placeholder?: string
  className?: string
  customClassName?: string
  label?: ReactNode
  autocomplete?: boolean
  append?: ReactNode
  labelClasses?: string
  icon?: string
  iconClasses?: string
  disabled?: boolean
  disabledClassName?: string
  filterOptions?: (options: TOption[], value: string) => TOption[]
  highlight?: boolean
  highlightClassName?: string
}

export type TSelectOptionsProps = TBaseProps & {
  options: TOption[]
  onChange: (option: TOption | null) => void
  selected?: TOption | null
}

export type TSelectRangeProps = TBaseProps & {
  min: number
  max: number
  step: number
  onChange: (value: number | null) => void
  value: number | null
}

export type TControlledSelectProps = TSelectOptionsProps | TSelectRangeProps

export type TFormSelectProps<TForm> = TBaseProps &
  Omit<TFormControlProps<TForm>, 'children'> & {
    options: TOption[]
  }

export type TSelectProps<TForm> =
  | TControlledSelectProps
  | TFormSelectProps<TForm>

const defaultFilterOptions = (options: TOption[], value: string) => {
  const lower = value.toLocaleLowerCase()
  return options.filter(option =>
    option.label.toLocaleLowerCase().startsWith(lower),
  )
}

export default function Select<TForm extends FieldValues>(
  props: TSelectProps<TForm>,
): JSX.Element {
  const [enableFiltering, setEnableFiltering] = useState(false)

  if ('form' in props) {
    return <FormSelect {...props} />
  }

  if ('step' in props) {
    return <SelectRange {...props} />
  }

  const {
    className,
    customClassName = 'transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f input flex-center p-0 relative',
    placeholder,
    label,
    append,
    labelClasses = 'text-gray-71 mr-2 absolute right-2.5',
    icon = '',
    iconClasses = '',
    disabled = false,
    disabledClassName,
    options,
    onChange,
    selected,
    autocomplete,
    highlight,
    highlightClassName = 'text-link',
    filterOptions = defaultFilterOptions,
  } = props

  const onInputValueChange = (
    value: string,
    event: ControllerStateAndHelpers<TOption>,
  ) => {
    const { type } = (event as unknown) as { type: string }
    setEnableFiltering(type === Downshift.stateChangeTypes.changeInput)
  }

  return (
    <Downshift
      selectedItem={selected ?? null}
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
        getInputProps,
        inputValue,
      }) => {
        const filteredOptions =
          enableFiltering && typeof inputValue === 'string'
            ? filterOptions(options, inputValue)
            : options

        const inputProps = autocomplete && getInputProps()

        return (
          <div
            className={cn(
              className,
              customClassName,
              disabled && disabledClassName,
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
            {inputProps && (
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
                  {...inputProps}
                  type='text'
                  role='input'
                  disabled={disabled}
                  value={
                    append ? `${inputProps.value}${append}` : inputProps.value
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
            <SelectList
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              isOpen={isOpen}
              options={filteredOptions}
              selectedItem={selectedItem}
              highlightedIndex={highlightedIndex}
              highlight={highlight}
              highlightClassName={highlightClassName}
              inputValue={inputValue}
              append={append}
            />
          </div>
        )
      }}
    </Downshift>
  )
}
