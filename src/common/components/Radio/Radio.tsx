import React from 'react'
import cn from 'classnames'

export type TRadioProps = {
  checked: boolean
  onChange: (param: boolean) => void
  className?: string
  smallCircleClass?: string
  children: React.ReactNode
}

const Radio = ({
  children,
  checked,
  onChange,
  className = 'w-5 h-5',
  smallCircleClass = 'w-2 h-2',
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
            onClick={() => {
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
            'text-gray-4a ml-2 mt-2.5px',
            checked ? 'font-extrabold' : 'font-medium',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Radio
