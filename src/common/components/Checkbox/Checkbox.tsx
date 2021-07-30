import React, { useState } from 'react'
import cn from 'classnames'
import { CheckIcon } from 'common/components/Icons'

export type TCheckboxProps = {
  isChecked: boolean
  clickHandler?: (checked: boolean) => void
  children?: React.ReactNode
  tickClassName?: string
  selectedBackgroundClassName?: string
}

const Checkbox = ({
  children,
  isChecked,
  clickHandler,
  tickClassName = 'text-gray-e7',
  selectedBackgroundClassName = 'bg-blue-3f',
}: TCheckboxProps): JSX.Element => {
  const [selected, setSelected] = useState(isChecked)
  return (
    <div className='cursor-pointer select-none flex items-center'>
      <div
        onClick={() => {
          setSelected(!selected)
          clickHandler && clickHandler(!selected)
        }}
        className={cn(
          'transition-all w-5 h-5 rounded-md checkboxCheckmark flex-shrink-0',
          !selected && 'border-gray-dd border hover:border-gray-8e',
          selected &&
            `${selectedBackgroundClassName} flex items-center justify-center`,
        )}
      >
        <CheckIcon
          size={8}
          className={cn(
            tickClassName,
            !selected ? 'hidden transition-all' : 'transition-all',
          )}
        />
      </div>
      {children && (
        <div className='text-sm font-normal text-gray-71 ml-2'>{children}</div>
      )}
    </div>
  )
}

export default Checkbox
