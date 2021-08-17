import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import Slider, { TSliderProps } from './Slider'

export default {
  title: 'Slider',
  component: Slider,
} as Meta

export const SingleValue: Story = () => {
  const [value, setValue] = useState(100)

  return (
    <div className='mt-10'>
      <Slider
        min={50}
        max={150}
        value={value}
        onChange={setValue}
        formatTooltipValue={Math.round}
      />
    </div>
  )
}

export const RangeSlider: Story<TSliderProps> = () => {
  const [values, setValues] = useState<[number, number]>([25, 75])

  return (
    <div className='mt-10'>
      <Slider
        min={0}
        max={100}
        values={values}
        onChange={setValues}
        formatTooltipValue={Math.round}
      />
    </div>
  )
}

export const FormatValues: Story<TSliderProps> = () => {
  const [value, setValue] = useState(100)

  const formatValue = (value: number) => `${value}K`
  const formatTooltipValue = (value: number) =>
    `${Math.round(value)}k - 5000 PSL`

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

export const NonLinearValues: Story<TSliderProps> = () => {
  const [value, setValue] = useState(75)

  return (
    <div className='mt-10'>
      <Slider
        variant='stickToBottom'
        width={296}
        steps={[1, 5, 10, 25, 50, 100, 250, 500, 1000]}
        value={value}
        onChange={setValue}
        formatTooltipValue={Math.round}
      />
    </div>
  )
}
