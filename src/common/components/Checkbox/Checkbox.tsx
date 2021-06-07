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
    <div className='cursor-pointer select-none'>
      {children}
      <div
        onClick={() => {
          setSelected(!selected)
          clickHandler && clickHandler(!selected)
        }}
        className={cn(
          'transition-all w-5 h-5 rounded-md checkboxCheckmark',
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
      </div>
    </div>
  )
}

export default Checkbox
