import React from 'react'
import cn from 'classnames'

export type TRadio = {
  label?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  value?: string
}

const Radio = ({
  label,
  checked,
  onChange,
  className,
  value,
}: TRadio): JSX.Element => {
  const classes = cn(
    'relative inline-flex items-center cursor-pointer transition duration-300',
    className,
  )

  const buttonClasses = cn(
    'input-radio-button relative w-4 h-4 border-2 border-gray-71 rounded-full mr-2',
  )

  return (
    <label className={classes}>
      <input
        type='radio'
        value={value}
        checked={checked}
        onChange={onChange}
        className='input-radio absolute top-0 left-0 right-0 bottom-0 invisible'
      />
      <span className={buttonClasses}></span>
      {label && (
        <span className='input-radio-text text-14px font-medium text-gray-71'>
          {label}
        </span>
      )}
    </label>
  )
}

export default Radio
