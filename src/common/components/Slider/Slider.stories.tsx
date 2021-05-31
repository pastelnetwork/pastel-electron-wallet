import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import Slider, { SliderProps } from './Slider'

export default {
  title: 'Slider',
  component: Slider,
} as Meta

export const SingleValue: Story = () => {
  const [value, setValue] = useState(100)

  return (
    <div className='mt-10'>
      <Slider min={50} max={150} value={value} onChange={setValue} />
    </div>
  )
}

export const RangeSlider: Story<SliderProps> = () => {
  const [values, setValues] = useState<[number, number]>([25, 75])

  return (
    <div className='mt-10'>
      <Slider min={0} max={100} values={values} onChange={setValues} />
    </div>
  )
}

export const FormatValues: Story<SliderProps> = () => {
  const [value, setValue] = useState(100)

  const formatValue = (value: number) => `${value}K`
  const formatTooltipValue = (value: number) => `${value}k - 5000 PSL`

  return (
    <div className='mt-10'>
      <Slider
        min={50}
        max={150}
        value={value}
        onChange={setValue}
        formatValue={formatValue}
        formatTooltipValue={formatTooltipValue}
      />
    </div>
  )
}
