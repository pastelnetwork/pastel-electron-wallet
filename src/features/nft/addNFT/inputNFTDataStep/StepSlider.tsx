import React, { useRef } from 'react'
import { TForm } from './InputNFTDataStep'
import { Controller } from 'react-hook-form'
import Slider from 'common/components/Slider'
import { Numpad as NumpadIcon } from 'common/components/Icons'
import Numpad from 'common/components/Numpad'
import { useClickAway, useToggle } from 'react-use'

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
  const [showNumpad, toggleNumpad] = useToggle(false)
  const numpadRef = useRef<HTMLDivElement>(null)

  useClickAway(numpadRef, () => {
    if (showNumpad) {
      toggleNumpad(false)
    }
  })

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className='pt-12 flex items-start space-x-7'>
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
            <div ref={numpadRef} className='relative'>
              <button type='button' onClick={toggleNumpad}>
                <NumpadIcon size={36} />
              </button>
              {showNumpad && (
                <div className='absolute top-full -right-7 z-10'>
                  <Numpad
                    value={value}
                    onChange={value => form.setValue(name, value)}
                    min={steps[0]}
                    max={steps[steps.length - 1]}
                    fractionDigits={name === 'royalty' ? 1 : 0}
                  />
                </div>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}
