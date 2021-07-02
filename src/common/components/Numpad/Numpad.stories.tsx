import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TProps } from './Numpad'

export default {
  title: 'Numpad',
  component: Component,
} as Meta

export const Numpad: Story<TProps> = () => {
  const [value, setValue] = useState(123)

  return (
    <div className='absolute'>
      <Component
        value={value}
        onChange={setValue}
        min={0}
        max={1000}
        default={1}
      />
    </div>
  )
}
