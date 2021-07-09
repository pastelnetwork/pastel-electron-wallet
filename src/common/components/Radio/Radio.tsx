import React from 'react'
import cn from 'classnames'
import './Radio.css'

export type TRadioProps = {
  checked: boolean
  onChange: (param: boolean) => void
  className?: string
  smallCircleClass?: string
  children: React.ReactNode
  labelClassName?: string
}

const Radio = ({
  children,
  checked,
  onChange,
  className = 'w-5 h-5',
  smallCircleClass = 'w-2 h-2',
  labelClassName = 'ml-2 mt-2.5px',
}: TRadioProps): JSX.Element => {
  return (
    <div>
      <div className='flex items-center'>
        <div
          className={cn(
            'rounded-full flex justify-center items-center cursor-pointer',
            className,
            checked
              ? 'bg-blue-e5'
              : 'border-2 border-gray-dd bg-white hover:border-gray-8e',
          )}
        >
          <input
            type='radio'
            className='absolute opacity-0 cursor-pointer'
            checked={checked}
            onChange={() => {
              onChange(!checked)
            }}
          />
          {checked && (
            <span
              className={cn('rounded-full bg-blue-3f', smallCircleClass)}
            ></span>
          )}
        </div>
        <div
          className={cn(
            'text-gray-4a',
            labelClassName,
            checked ? 'font-extrabold' : 'font-medium text-opacity-50',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Radio
