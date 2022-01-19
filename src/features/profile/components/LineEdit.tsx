import React, { useCallback, useState } from 'react'
import cn from 'classnames'

import { CircleCloseIcon } from 'common/components/Icons'
import { TErrorMessageProps } from './MyProfileCard'

export type TLineEdit = {
  onChange(value: string): void
  hideCloseIcon?: boolean
  readOnly?: boolean
  inputClassName?: string
  className?: string
  error?: TErrorMessageProps
}

function LineEdit({
  onChange,
  hideCloseIcon,
  readOnly = false,
  inputClassName,
  className,
  error,
}: TLineEdit): JSX.Element {
  const [value, setValue] = useState('')
  const onClose = useCallback(() => {
    onChange('')
    setValue('')
  }, [])

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
      setValue(e.target.value)
    },
    [value],
  )

  return (
    <div>
      <div
        className={cn(
          'border rounded h-10 flex flex-grow relative',
          className ? className : 'shadow-4px',
          readOnly && 'bg-line',
          error && 'border border-red-fe',
        )}
      >
        <input
          className={cn(
            'border-none rounded bg-transparent outline-none text-base h-full pl-4  flex-grow',
            readOnly ? 'text-gray-a0' : 'text-gray-4a',
            inputClassName,
          )}
          value={value}
          onChange={onInputChange}
          readOnly={readOnly}
        />
        {!hideCloseIcon && value ? (
          <button className='mx-2' onClick={onClose} type='button'>
            <CircleCloseIcon size={22} />
          </button>
        ) : null}
      </div>
      {error ? (
        <p className='text-red-fe text-xs leading-5 pt-1'>{error.message}</p>
      ) : null}
    </div>
  )
}

export default LineEdit
