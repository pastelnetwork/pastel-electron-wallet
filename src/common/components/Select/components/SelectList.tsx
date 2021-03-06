import { PropGetters } from 'downshift'
import { TBaseProps, TOption } from '../Select'
import React, { ReactNode } from 'react'
import cn from 'classnames'

const defaultFilterOptions = (options: TOption[], value: string) => {
  const lower = value.toLocaleLowerCase()
  return options.filter(option =>
    option.label.toLocaleLowerCase().startsWith(lower),
  )
}

type TProps = {
  getMenuProps: PropGetters<TOption>['getMenuProps']
  getItemProps: PropGetters<TOption>['getItemProps']
  isOpen: boolean
  options: TOption[]
  selectedItem: TOption | null
  highlightedIndex: number | null
  highlight?: boolean
  highlightClassName?: string
  inputValue?: string | null
  append?: ReactNode
  noOptionsText?: ReactNode
  isLoading?: boolean
  enableFiltering: boolean
  filterOptions?: TBaseProps['filterOptions']
  customListClassName?: string
  listClassName?: string
  listItemClassName?: string
}

export default function SelectList({
  getMenuProps,
  getItemProps,
  isOpen,
  options,
  selectedItem,
  highlightedIndex,
  highlight,
  highlightClassName = 'text-link',
  inputValue,
  append,
  noOptionsText,
  isLoading,
  enableFiltering,
  filterOptions = defaultFilterOptions,
  customListClassName = 'absolute top-full min-w-full mt-[3px] py-3 rounded-md bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-40 whitespace-normal',
  listClassName,
  listItemClassName,
}: TProps): JSX.Element | null {
  const filteredOptions =
    enableFiltering && typeof inputValue === 'string'
      ? filterOptions(options, inputValue)
      : options

  const showNoOptionsText = noOptionsText && !isLoading

  if (!isOpen || (!filteredOptions.length && !showNoOptionsText)) {
    return null
  }

  return (
    <ul {...getMenuProps()} className={cn(customListClassName, listClassName)}>
      {filteredOptions.map((item, index) => {
        const isSelected = selectedItem === item || highlightedIndex === index
        const { label } = item
        let pos = 0

        const content =
          !highlight || !inputValue
            ? label
            : label
                .toLocaleLowerCase()
                .split(inputValue.toLocaleLowerCase())
                .map((part, i) => {
                  const text = label.slice(pos, pos + part.length)
                  const matched =
                    i !== 0 && label.slice(pos - inputValue.length, pos)

                  pos += part.length + inputValue.length

                  return (
                    <React.Fragment
                      key={`highlight-${text}-${item.label}${item.value}`}
                    >
                      {matched && (
                        <span className={highlightClassName}>{matched}</span>
                      )}
                      {text}
                    </React.Fragment>
                  )
                })

        return (
          <li
            {...getItemProps({
              key: index,
              index,
              item,
            })}
            key={`selectList-${item.value}${item.label}`}
            className={cn(
              'w-full py-2 px-4 text-gray-71 cursor-pointer',
              isSelected && 'bg-gray-f7',
              listItemClassName,
            )}
          >
            {content}
            {append}
          </li>
        )
      })}
      {noOptionsText && !isLoading && (
        <li className={'w-full py-2 px-4 text-gray-71 cursor-pointer'}>
          {noOptionsText}
        </li>
      )}
    </ul>
  )
}

SelectList.defaultProps = {
  highlight: false,
  highlightClassName: 'text-link',
  inputValue: '',
  append: null,
  noOptionsText: null,
  isLoading: false,
  filterOptions: defaultFilterOptions,
  customListClassName:
    'absolute top-full min-w-full mt-[3px] py-3 rounded-md bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-40 whitespace-normal',
  listClassName: '',
  listItemClassName: '',
}
