import React from 'react'
import { TForm } from './InputNFTDataStep'
import { Controller } from 'react-hook-form'
import Slider from 'common/components/Slider'

export default function StepSlider({
  form,
  name,
  steps,
  roundValue,
  formatValue,
  formatTooltipValue,
}: {
  form: TForm
  name: 'copies' | 'royalty'
  steps: number[]
  roundValue(value: number): number
  formatValue?(value: number): string | number
  formatTooltipValue?(value: number): string | number
}): JSX.Element {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className='pt-12 flex items-start space-x-4'>
            <Slider
              variant='stickToBottom'
              width={296}
              steps={steps}
              value={value}
              onChange={(value: number) => onChange(roundValue(value))}
              formatValue={formatValue}
              formatTooltipValue={formatTooltipValue}
              valuesClassName='mt-2'
            />
          </div>
        )
      }}
    />
  )
}
