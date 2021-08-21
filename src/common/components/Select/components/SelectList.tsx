import { PropGetters } from 'downshift'
import { TOption } from '../Select'
import React, { ReactNode } from 'react'
import cn from 'classnames'

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
}

export default function SelectList({
  getMenuProps,
  getItemProps,
  isOpen,
  options,
  selectedItem,
  highlightedIndex,
  highlight,
  highlightClassName,
  inputValue,
  append,
}: TProps): JSX.Element {
  return (
    <ul
      {...getMenuProps()}
      hidden={!isOpen}
      className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-16px text-gray-35 font-medium max-h-96 overflow-y-auto z-20'
      onClick={e => e.stopPropagation()}
    >
      {options.map((item, index) => {
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
                    <React.Fragment key={i}>
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
              key: item.label,
              index,
              item,
            })}
            className={cn(
              'w-full h-10 flex items-center px-4 text-gray-71 cursor-pointer',
              isSelected && 'bg-gray-f7',
            )}
          >
            {content}
            {append}
          </li>
        )
      })}
    </ul>
  )
}
