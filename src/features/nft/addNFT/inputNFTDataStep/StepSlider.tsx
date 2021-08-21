import React, { useRef } from 'react'
import { TForm } from './InputNFTDataStep'
import { Controller } from 'react-hook-form'
import Slider from 'common/components/Slider'
import { Numpad as NumpadIcon } from 'common/components/Icons'
import Numpad from 'common/components/Numpad'
import { useClickAway, useToggle } from 'react-use'
import cn from 'classnames'

export default function StepSlider({
  form,
  name,
  steps,
  defaultValue,
  roundValue,
  formatValue,
  formatTooltipValue,
}: {
  form: TForm
  name: 'copies' | 'royalty'
  steps: number[]
  defaultValue: number
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
          <div className='pt-12 space-x-7 relative pr-[34px]'>
            <Slider
              variant='stickToBottom'
              width={311}
              steps={steps}
              value={value}
              onChange={(value: number) => onChange(roundValue(value))}
              formatValue={formatValue}
              formatTooltipValue={formatTooltipValue}
            />
            {name === 'copies' && (
              <div className='absolute -right-4 -bottom-1.5' ref={numpadRef}>
                <button
                  type='button'
                  onClick={toggleNumpad}
                  className={cn(
                    'w-9 h-9 flex-center rounded-full transition duration-200',
                    showNumpad ? 'bg-blue-eb text-blue-3f' : 'text-gray-8e',
                  )}
                >
                  <NumpadIcon size={22} className='relative top-0.5' />
                </button>
                {showNumpad && (
                  <div className='absolute top-full mt-1.5 left-0 z-10'>
                    <Numpad
                      value={value}
                      default={defaultValue}
                      onChange={value => form.setValue(name, value)}
                      min={steps[0]}
                      max={steps[steps.length - 1]}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
