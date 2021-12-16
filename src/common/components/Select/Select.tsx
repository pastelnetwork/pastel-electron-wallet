import React, { ReactNode, useCallback, useState } from 'react'
import Downshift, {
  ControllerStateAndHelpers,
  GetInputPropsOptions,
} from 'downshift'
import caretDownIcon from 'common/assets/icons/ico-caret-down.svg'
import cn from 'classnames'
import SelectRange from './SelectRange'
import { TFormControlProps } from '../Form/FormControl'
import { FieldValues } from 'react-hook-form'
import FormSelect from './FormSelect'
import SelectList from './components/SelectList'
import Spinner from '../Spinner'
import { debounce } from '../../utils/function'

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
  isLoading?: boolean
  noOptionsText?: ReactNode
  debounce?: number
  customListClassName?: string
  listClassName?: string
  listItemClassName?: string
  customInputWrapperClassName?: string
  disabledInputWrapperClassName?: string
  inputWrapperClassName?: string
  customInputClassName?: string
  disabledInputClassName?: string
  inputClassName?: string
  onInputChange?(
    value: string,
    options: ControllerStateAndHelpers<TOption>,
  ): void
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

export default function Select<TForm extends FieldValues>(
  props: TSelectProps<TForm>,
): JSX.Element {
  const [enableFiltering, setEnableFiltering] = useState(false)

  const onInputValueChange = useCallback(
    (value: string, event: ControllerStateAndHelpers<TOption>) => {
      const { type } = (event as unknown) as { type: string }
      if (type === Downshift.stateChangeTypes.changeInput) {
        setEnableFiltering(true)
        onInputChange?.(value, event)
      } else {
        setEnableFiltering(false)
      }
    },
    [enableFiltering],
  )

  const itemToString = useCallback(
    (item: TOption | null) => (item ? item.value : ''),
    [],
  )

  if ('form' in props) {
    return <FormSelect {...props} />
  }

  if ('step' in props) {
    return <SelectRange {...props} />
  }

  const {
    className,
    customClassName = 'bg-white transition duration-300 border border-gray-ec hover:border-blue-3f active:border-blue-3f input flex items-center p-0 relative',
    placeholder,
    label,
    append,
    labelClasses = 'text-gray-71 mr-2 absolute right-2.5',
    icon = '',
    iconClasses = '',
    disabled = false,
    disabledClassName,
    onChange,
    selected,
    autocomplete,
    isLoading,
    customInputWrapperClassName = 'relative w-full',
    disabledInputWrapperClassName = 'bg-gray-f6 border-gray-ec cursor-not-allowed',
    inputWrapperClassName,
    customInputClassName = `h-full w-full rounded pr-7 text-gray-35 font-extrabold focus-visible-border disabled:bg-gray-f6 ${
      icon ? 'pl-9 relative z-10' : 'pl-18px'
    }`,
    disabledInputClassName = 'cursor-not-allowed',
    inputClassName,
    listItemClassName,
    listClassName,
  } = props

  let { onInputChange } = props
  const { debounce: customDebounce } = props
  if (customDebounce && onInputChange) {
    onInputChange = debounce(onInputChange, customDebounce)
  }

  const getInputValue = (inputProps: GetInputPropsOptions) => {
    if (!append) {
      return inputProps.value
    }
    const vAppend: string = append?.toString() || ''
    const vInput: string = inputProps.value?.toString() || ''

    return `${vInput}${vAppend}`
  }

  return (
    <Downshift
      selectedItem={selected ?? null}
      onChange={onChange}
      itemToString={itemToString}
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
                alt='Icon'
              />
            )}
            {inputProps && (
              <div
                className={cn(
                  customInputWrapperClassName,
                  disabled && disabledInputWrapperClassName,
                  inputWrapperClassName,
                )}
              >
                <input
                  className={cn(
                    customInputClassName,
                    disabled && disabledInputClassName,
                    inputClassName,
                  )}
                  {...getToggleButtonProps()}
                  {...inputProps}
                  type='text'
                  disabled={disabled}
                  value={getInputValue(inputProps)}
                />
                {label && <span className={labelClasses}>{label}</span>}
              </div>
            )}
            {!autocomplete && (
              <button
                className={cn(
                  'w-full h-full flex items-center pr-7 focus-visible-border',
                  icon ? 'pl-9 relative z-10' : 'pl-3.5',
                  disabled && 'cursor-not-allowed',
                )}
                disabled={disabled}
                type='button'
                {...getToggleButtonProps()}
              >
                {label && <span className='text-gray-b0 mr-2'>{label}</span>}
                <span className='max-w-[80%] truncate'>
                  {selectedItem ? selectedItem.label : placeholder}
                </span>
              </button>
            )}
            {isLoading && (
              <Spinner className='w-5 h-5 absolute right-8 opacity-50' />
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
              {...props}
              getMenuProps={getMenuProps}
              getItemProps={getItemProps}
              isOpen={isOpen}
              selectedItem={selectedItem}
              highlightedIndex={highlightedIndex}
              inputValue={inputValue}
              enableFiltering={enableFiltering}
              listItemClassName={listItemClassName}
              listClassName={listClassName}
            />
          </div>
        )
      }}
    </Downshift>
  )
}
