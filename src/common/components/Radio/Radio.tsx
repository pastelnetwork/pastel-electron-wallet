import React, { useEffect, useState } from 'react'
import cn from 'classnames'

export type TRadioProps = {
  isChecked: boolean
  clickHandler: (param: boolean) => void
  className?: string
  smallCircleClass?: string
  children: React.ReactNode
}

const Radio = ({
  children,
  isChecked,
  clickHandler,
  className = 'w-5 h-5',
  smallCircleClass = 'w-2 h-2',
}: TRadioProps): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(isChecked)
  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])
  return (
    <div className='flex items-center'>
      <div
        className={cn(
          'rounded-full flex justify-center items-center cursor-pointer',
          className,
          checked
            ? 'bg-blue-e5'
            : 'border-2 border-gray-dd bg-white hover:border-gray-8e',
        )}
        onClick={() => {
          clickHandler(!checked)
          setChecked(!checked)
        }}
      >
        {checked && (
          <div
            className={cn('rounded-full bg-blue-3f', smallCircleClass)}
          ></div>
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
  )
}

export default Radio
