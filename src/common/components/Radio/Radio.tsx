import React from 'react'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import './Radio.css'

export type TRadioProps = {
  checked: boolean
  onChange: (param: boolean) => void
  className?: string
  smallCircleClass?: string
  children: React.ReactNode
  labelClassName?: string
  checkedCircleBackgroundColor?: string
  variant?: string
  id?: string
}

function Radio({
  children,
  checked,
  onChange,
  className = 'w-5 h-5',
  smallCircleClass = 'w-2 h-2',
  labelClassName = 'ml-2 mt-2.5px',
  checkedCircleBackgroundColor = 'bg-blue-e5',
  variant,
  id,
}: TRadioProps): JSX.Element {
  const renderInputControl = () => (
    <input
      type='radio'
      className='absolute opacity-0 cursor-pointer'
      checked={checked}
      onChange={() => {
        onChange(!checked)
      }}
      id={id}
    />
  )

  if (variant === 'secondary') {
    return (
      <label htmlFor={id}>
        <div className='flex items-center'>
          <div
            className={cn(
              'rounded-full flex justify-center items-center cursor-pointer transition duration-300',
              className,
              checked
                ? 'bg-blue-3f'
                : 'border-2 border-gray-a0 bg-white hover:border-gray-8e',
            )}
          >
            {renderInputControl()}
            {checked && (
              <span
                className={cn(smallCircleClass, 'rounded-full bg-blue-e7')}
              ></span>
            )}
          </div>
          <div
            className={cn(
              'text-gray-71',
              labelClassName,
              checked ? 'font-medium' : 'font-medium',
            )}
          >
            {children}
          </div>
        </div>
      </label>
    )
  }

  return (
    <label htmlFor={id}>
      <div className='flex items-center'>
        <div
          className={cn(
            'rounded-full flex justify-center items-center cursor-pointer transition duration-300',
            className,
            checked
              ? checkedCircleBackgroundColor
              : 'border-2 border-gray-a0 bg-white hover:border-gray-8e',
          )}
        >
          {renderInputControl()}
          {checked && (
            <span
              className={cn(smallCircleClass, 'rounded-full bg-blue-3f')}
            ></span>
          )}
        </div>
        <div
          className={cn(
            'text-gray-71',
            labelClassName,
            checked ? 'font-medium' : 'font-medium',
          )}
        >
          {children}
        </div>
      </div>
    </label>
  )
}

export default Radio

Radio.defaultProps = {
  id: uuidv4(),
  className: 'w-5 h-5',
  smallCircleClass: 'w-2 h-2',
  labelClassName: 'ml-2 mt-2.5px',
  checkedCircleBackgroundColor: 'bg-blue-e5',
  variant: undefined,
}
