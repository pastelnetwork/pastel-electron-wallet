import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TProps } from './Numpad'

export default {
  title: 'Numpad',
  component: Component,
} as Meta

export const Integer: Story<TProps> = () => {
  const [value, setValue] = useState(123)

  return (
    <div className='absolute'>
      <Component value={value} onChange={setValue} min={0} max={1000} />
    </div>
  )
}

export const Float: Story<TProps> = () => {
  const [value, setValue] = useState(123.12)

  return (
    <div className='absolute'>
      <Component
        className='w-48'
        value={value}
        onChange={setValue}
        min={0}
        max={1000}
        fractionDigits={2}
      />
    </div>
  )
}
