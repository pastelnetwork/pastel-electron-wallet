import React, { useState } from 'react'
import cn from 'classnames'
import IconCheckBlue from '../../assets/icons/ico-check-blue.svg'

export type TCheckboxProps = {
  isChecked: boolean
  clickHandler?: (checked: boolean) => void
}

const Checkbox: React.FC<TCheckboxProps> = ({
  children,
  isChecked,
  clickHandler,
}) => {
  const [selected, setSelected] = useState(isChecked)
  return (
    <label className='relative cursor-pointer select-none'>
      {children}
      <input
        type='checkbox'
        checked={isChecked}
        className={cn('absolute bg-opacity-0 cursor-pointer h-0 w-0')}
        onChange={() => setSelected(!selected)}
      />
      <span
        onClick={() => {
          clickHandler && clickHandler(selected)
        }}
        className={cn(
          'transition-all absolute top-0 left-0 w-5 h-5 rounded-md checkboxCheckmark',
          !selected && 'border-gray-dd border hover:border-gray-8e border',
          selected && 'bg-blue-e5 flex items-center justify-center',
        )}
      >
        <img
          src={IconCheckBlue}
          className={`${
            !selected ? 'hidden transition-all' : 'transition-all'
          }`}
        />
      </span>
    </label>
  )
}

export default Checkbox
