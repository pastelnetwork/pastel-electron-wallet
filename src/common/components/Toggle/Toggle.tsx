import React, { useState } from 'react'
import cn from 'classnames'

export type TToggleProps = {
  classNames?: string
  selectedClass?: string
  selected?: boolean
  toggleHandler: (checked: boolean) => void
}

const Toggle: React.FC<TToggleProps> = ({
  children,
  toggleHandler,
  classNames = 'w-34px h-5 rounded-full',
  selectedClass = 'bg-green-68',
  selected = false,
}) => {
  const [checked, setChecked] = useState(selected)
  return (
    <div>
      <label className='flex items-center cursor-pointer'>
        <div className='relative'>
          <div
            className={cn(
              'block bg-gray-dd flex items-center',
              classNames,
              checked && selectedClass,
            )}
            onClick={() => {
              toggleHandler(!checked)
              setChecked(!checked)
            }}
          >
            <div
              className={cn(
                'dot absolute bg-white w-3 h-3 rounded-full',
                checked ? 'right-1' : 'left-1',
              )}
            ></div>
          </div>
        </div>
        <div className='text-sm text-gray-33 ml-3 text-opacity-50 flex items-center'>
          {children}
        </div>
      </label>
    </div>
  )
}

export default Toggle
