import React from 'react'
import Downshift from 'downshift'
import caretDownIcon from '../../../common/assets/icons/ico-caret-down.svg'
import cn from 'classnames'

export type Option = {
  label: string
  value: string
}

export type SelectProps = {
  options: Option[]
  onChange?: (option: Option | null) => void
  selected: Option | null
  placeholder?: string
  className?: string
  label?: string
}

export default function Select({
  options,
  onChange,
  selected,
  placeholder,
  className,
  label,
}: SelectProps): JSX.Element {
  return (
    <Downshift
      selectedItem={selected}
      onChange={onChange}
      itemToString={item => (item ? item.value : '')}
    >
      {({
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <button
          type='button'
          {...getToggleButtonProps()}
          className={cn(
            'bg-white text-gray-71 flex items-center justify-between shadow-xs h-40px px-14px rounded relative focus-visible',
            className,
          )}
        >
          <div className='whitespace-nowrap'>
            {label && <span className='text-gray-b0 mr-2'>{label}:</span>}

            {selectedItem ? (
              <span className='text-gray-2d'>{selectedItem.value}</span>
            ) : (
              placeholder
            )}
          </div>
          <img
            className='text-gray-b0 ml-2'
            src={caretDownIcon}
            alt='toggle menu'
          />
          <ul
            {...getMenuProps()}
            className='absolute top-full left-0 min-w-full mt-px rounded-md overflow-hidden bg-white border-gray-e6 shadow-xs z-10'
            onClick={e => e.stopPropagation()}
          >
            {isOpen
              ? options.map((item, index) => {
                  const highlight =
                    selectedItem === item || highlightedIndex === index

                  return (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                      })}
                      className={cn(
                        'w-full h-40px flex items-center px-4 text-gray-71',
                        highlight && 'bg-gray-f7',
                      )}
                    >
                      {item.value}
                    </li>
                  )
                })
              : null}
          </ul>
        </button>
      )}
    </Downshift>
  )
}
