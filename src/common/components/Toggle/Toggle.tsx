import React, { useState } from 'react'
import cn from 'classnames'

export type TToggleProps = {
  classNames?: string
  selectedClass?: string
  selected?: boolean
  toggleHandler?: (checked: boolean) => void
  children?: React.ReactNode
}

const Toggle = ({
  children,
  toggleHandler,
  classNames = 'w-34px h-5 rounded-full',
  selectedClass = 'bg-blue-3f',
  selected = false,
}: TToggleProps): JSX.Element => {
  const [checked, setChecked] = useState(selected)
  return (
    <div>
      <label className='flex items-center cursor-pointer'>
        <div className='relative'>
          <div
            className={cn(
              'block flex items-center duration-200 transition',
              classNames,
              checked ? selectedClass : 'bg-gray-dd',
            )}
            onClick={() => {
              !!toggleHandler && toggleHandler(!checked)
              setChecked(!checked)
            }}
          >
            <div
              className={cn(
                'dot absolute bg-white w-3 h-3 rounded-full duration-200 transition left-1',
                checked && 'transform translate-x-4',
              )}
            />
          </div>
        </div>
        {children && (
          <div className='text-sm text-gray-33 ml-3 text-opacity-50 flex items-center'>
            {children}
          </div>
        )}
      </label>
    </div>
  )
}

export default Toggle
