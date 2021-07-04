import React, { useState } from 'react'
import cn from 'classnames'
import IconCheckBlue from '../../assets/icons/ico-check-blue.svg'

export type TCheckboxProps = {
  isChecked: boolean
  clickHandler?: (checked: boolean) => void
  children?: React.ReactNode
}

const Checkbox = ({
  children,
  isChecked,
  clickHandler,
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
          selected && 'bg-blue-e5 flex items-center justify-center',
        )}
      >
        <img
          src={IconCheckBlue}
          className={`${
            !selected ? 'hidden transition-all' : 'transition-all'
          }`}
        />
      </div>
      <div
        className={cn(
          'text-12px font-medium ml-2',
          selected ? 'text-gray-11' : 'text-gray-80',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Checkbox
