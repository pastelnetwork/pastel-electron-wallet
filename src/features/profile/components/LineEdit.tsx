import React from 'react'
import cn from 'classnames'
import { CircleCloseIcon } from 'common/components/Icons'

export type TLineEdit = {
  value: string
  onChange(value: string): void
  hideCloseIcon?: boolean
  readOnly?: boolean
  inputClassName?: string
  className?: string
}

const LineEdit = ({
  value,
  onChange,
  hideCloseIcon,
  readOnly = false,
  inputClassName,
  className,
}: TLineEdit): JSX.Element => {
  return (
    <div
      className={cn(
        'border rounded h-10 flex flex-grow relative',
        className ? className : 'shadow-4px',
        readOnly && 'bg-line',
      )}
    >
      <input
        className={cn(
          'border-none rounded bg-transparent outline-none text-base h-full pl-4  flex-grow',
          readOnly ? 'text-gray-a0' : 'text-gray-4a',
          inputClassName,
        )}
        value={value}
        onChange={e => onChange(e.target.value)}
        readOnly={readOnly}
      />
      {!hideCloseIcon ? (
        <button className='mx-2'>
          <CircleCloseIcon size={22} onClick={() => onChange('')} />
        </button>
      ) : null}
    </div>
  )
}

export default LineEdit
