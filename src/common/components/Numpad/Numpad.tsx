import React, { useEffect, useState, forwardRef, useRef } from 'react'
import cn from 'classnames'

import { formatNumber } from 'common/utils/format'

export type TProps = {
  value: number
  default: number
  onChange(value: number): void
  min?: number
  max?: number
  className?: string
}

export default forwardRef<HTMLDivElement, TProps>(function Numpad(
  {
    value: valueProp,
    default: defaultValue,
    onChange: onChangeProp,
    min = -Infinity,
    max = Infinity,
    className,
  },
  ref,
) {
  const [value, setValue] = useState('')

  // when input gets empty, default it passed to onChange, valueProp updates and we need to ignore it to keep input empty
  const skipSetValueRef = useRef(false)

  useEffect(() => {
    if (!skipSetValueRef.current) {
      setValue(String(valueProp))
    } else {
      skipSetValueRef.current = false
    }
  }, [valueProp])

  const onChange = (value: string) => {
    const number = parseInt(value)
    if (!isNaN(number) && number >= min && number <= max) {
      setValue(String(number))
      onChangeProp(number)
    } else if (value.length === 0) {
      setValue(value)
      skipSetValueRef.current = true
      onChangeProp(defaultValue)
    }
  }

  const getNumPadList = () => {
    const numpadList = []
    for (let i = 0; i < max.toString().length - value.length; i++) {
      numpadList.push({
        value: 0,
        type: 'default',
      })
    }

    value.split('').map(item => {
      numpadList.push({
        value: item,
        type: 'value',
      })
    })

    return numpadList
  }

  const clear = () => onChange('')

  const addChar = (char: string) => onChange(value + char)

  return (
    <div
      ref={ref}
      className={cn(
        'p-4 bg-white rounded-2xl shadow-4 border border-gray-e7',
        className,
      )}
    >
      <div className='input h-8 px-2 mb-1 w-[112px] flex justify-between items-center text-gray-a0 font-medium'>
        {getNumPadList().map((item, index) => (
          <span
            className={cn(
              'text-base font-medium',
              item.type === 'default' ? 'text-gray-a0' : 'text-gray-4a',
            )}
            key={index}
          >
            {item.value}
          </span>
        ))}
      </div>
      <div className='pt-1 space-y-2'>
        <input
          className='input h-8 px-2 mb-1 w-[112px] hidden'
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <div className='flex space-x-2'>
          {[1, 2, 3].map(value => (
            <NumpadButton
              key={value}
              value={value}
              onClick={() => addChar(String(value))}
            />
          ))}
        </div>
        <div className='flex space-x-2'>
          {[3, 4, 5].map(value => (
            <NumpadButton
              key={value}
              value={value}
              onClick={() => addChar(String(value))}
            />
          ))}
        </div>
        <div className='flex space-x-2'>
          {[7, 8, 9].map(value => (
            <NumpadButton
              key={value}
              value={value}
              onClick={() => addChar(String(value))}
            />
          ))}
        </div>
        <div className='flex space-x-2'>
          <NumpadButton value={0} onClick={() => addChar('0')} />
          <NumpadButton value='clear' onClick={clear} className='flex-grow' />
        </div>
        <div className='text-gray-a0 text-xs text-center'>
          number between
          <br />1 and {formatNumber(max)}
        </div>
      </div>
    </div>
  )
})

const NumpadButton = ({
  value,
  onClick,
  className,
}: {
  value: number | string
  onClick(): void
  className?: string
}) => {
  return (
    <button
      type='button'
      className={cn(
        'shadow-sm text-blue-3f border border-blue-3f w-8 h-8 flex-center rounded-lg duration-200 transition hover:bg-blue-e1 flex-shrink-0',
        className,
      )}
      onClick={onClick}
    >
      {value}
    </button>
  )
}
