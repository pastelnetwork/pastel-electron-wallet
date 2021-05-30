import React, { ReactNode } from 'react'
import cn from 'classnames'
import './styles.css'

export interface InputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  type?: string
  prepend?: ReactNode
  append?: ReactNode
  [x: string]: any
}

const Input: React.FC<InputProps> = ({
  className,
  onChange,
  type,
  prepend,
  append,
  ...otherProps
}) => {
  const classes = cn(
    {
      'relative flex items-center': true,
    },
    className,
  )

  const inputClasses = cn({
    'input-field w-full py-2 bg-white text-base text-gray-800 text-h5 focus:outline-none': true,
    'pl-4': !prepend,
    'pl-2': prepend,
    'pr-4': !append,
    'pr-2': append,
  })

  return (
    <div className={classes}>
      {prepend && <div className='pl-2'>{prepend}</div>}

      <input
        className={inputClasses}
        onChange={onChange}
        type={type}
        {...otherProps}
      />
      <fieldset className='absolute top-0 right-0 bottom-0 left-0 shadow-input placeholder-gray-500 rounded border border-transparent pointer-events-none' />

      {append && <div className='pr-2'>{append}</div>}
    </div>
  )
}

export default Input
