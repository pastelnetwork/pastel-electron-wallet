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
  variant?: string
}

const Radio = ({
  children,
  checked,
  onChange,
  className = 'w-5 h-5',
  smallCircleClass = 'w-2 h-2',
  labelClassName = 'ml-2 mt-2.5px',
  variant,
}: TRadioProps): JSX.Element => {
  return (
    <div>
      <div className='flex items-center'>
        <div
          className={cn(
            'rounded-full flex justify-center items-center cursor-pointer',
            className,
            checked
              ? variant === 'secondary'
                ? 'bg-blue-3f'
                : 'bg-button-pressed-secondary'
              : 'border-2 border-gray-a0 bg-white hover:border-gray-55',
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
              className={cn(
                'rounded-full',
                variant === 'secondary' ? 'bg-white' : 'bg-blue-3f',
                smallCircleClass,
              )}
            ></span>
          )}
        </div>
        <div className={cn('text-sm font-normal text-gray-71', labelClassName)}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Radio
