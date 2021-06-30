import React, { useEffect, useState, forwardRef } from 'react'
import { Backspace } from '../Icons'
import cn from 'classnames'

export type TProps = {
  value: number
  onChange(value: number): void
  min?: number
  max?: number
  fractionDigits?: number
  className?: string
}

export default forwardRef<HTMLDivElement, TProps>(function Numpad(
  {
    value: valueProp,
    onChange: onChangeProp,
    min = -Infinity,
    max = Infinity,
    fractionDigits = 0,
    className,
  },
  ref,
) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(String(valueProp))
  }, [valueProp])

  const onChange = (value: string) => {
    if (value.indexOf('.') === value.length - 1) {
      return setValue(value)
    }

    const multiply = Math.pow(10, fractionDigits)
    const number =
      fractionDigits > 0
        ? Math.floor(parseFloat(value) * multiply) / multiply
        : parseInt(value)
    if (!isNaN(number) && number >= min && number <= max) {
      setValue(String(number))
      onChangeProp(number)
      return
    }

    if (value.length === 0 || value.indexOf('.') === value.length - 1) {
      setValue(value)
    }
  }

  const onBackspace = () => {
    onChange(value.slice(0, value.length - 1))
  }

  const addChar = (char: string) => onChange(value + char)

  return (
    <div
      ref={ref}
      className={cn(
        'p-2 bg-white rounded-b shadow-md text-gray-51 space-y-2 border border-gray-e7',
        className,
      )}
    >
      <div className='relative'>
        <input
          className='input w-[136px]'
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <button
          type='button'
          className='absolute right-2 top-2.5 text-gray-71 duration-200 transition hover:text-gray-57'
          onClick={onBackspace}
        >
          <Backspace size={24} />
        </button>
      </div>
      <div className='flex space-x-2'>
        {[1, 2, 3].map(value => (
          <NumpadButton value={value} onClick={() => addChar(String(value))} />
        ))}
      </div>
      <div className='flex space-x-2'>
        {[3, 4, 5].map(value => (
          <NumpadButton value={value} onClick={() => addChar(String(value))} />
        ))}
      </div>
      <div className='flex space-x-2'>
        {[7, 8, 9].map(value => (
          <NumpadButton value={value} onClick={() => addChar(String(value))} />
        ))}
      </div>
      <div className='flex space-x-2'>
        <div className='w-10 h-10' />
        <NumpadButton value={0} onClick={() => addChar('0')} />
        {fractionDigits > 0 && (
          <NumpadButton value='.' onClick={() => addChar('.')} />
        )}
      </div>
    </div>
  )
})

const NumpadButton = ({
  value,
  onClick,
}: {
  value: number | string
  onClick(): void
}) => {
  return (
    <button
      type='button'
      className='shadow-input border border-gray-e7 w-10 h-10 flex-center rounded-lg duration-200 transition hover:bg-gray-fc'
      onClick={onClick}
    >
      {value}
    </button>
  )
}
