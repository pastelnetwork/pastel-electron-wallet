import React, { forwardRef, useCallback } from 'react'

export type TCustomInput = {
  value: string
  onChange(value: string): void
  onEnter(): void
}

function CustomInput(
  { value, onChange, onEnter }: TCustomInput,
  ref: React.Ref<HTMLInputElement>,
) {
  const size = Math.max(value.length, 1)
  const onKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onEnter()
      }
    },
    [value],
  )

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [],
  )

  return (
    <div>
      <input
        ref={ref}
        className='min-w-16px outline-none h-6 text-gray-4a'
        value={value}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        size={size}
      />
    </div>
  )
}

export default forwardRef(CustomInput)
