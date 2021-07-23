import React, { useState } from 'react'
import cn from 'classnames'
import SVG from 'react-inlinesvg'
import IconCheck from '../../assets/icons/ico-check-transparent.svg'

export type TCheckboxProps = {
  isChecked: boolean
  clickHandler?: (checked: boolean) => void
  children?: React.ReactNode
  variant?: string
}

const Checkbox = ({
  children,
  isChecked,
  clickHandler,
  variant,
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
          'transition-all w-5 h-5 rounded-md flex-shrink-0',
          !selected && 'border-gray-88 hover:border-gray-55 border-1.3px',
          selected &&
            (variant === 'secondary'
              ? 'bg-button'
              : 'bg-button-hover-secondary') +
              ' flex items-center justify-center',
        )}
      >
        <SVG
          src={IconCheck}
          className={cn(
            !selected && 'hidden transition-all',
            selected && 'transition-all',
            variant === 'secondary' ? 'stroke-white' : 'stroke-blue-3f',
          )}
        />
      </div>
      <div className='text-sm font-normal text-gray-71 ml-2'>{children}</div>
    </div>
  )
}

export default Checkbox
