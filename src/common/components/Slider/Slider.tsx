import React from 'react'
import { Range } from 'react-range'
import cn from 'classnames'
import { SliderShape, TWidth } from './SliderShape'
import {
  fractionToValue,
  sliderMax,
  sliderValueToPercent,
  valueToFraction,
} from './slider.utils'
import Tooltip2 from '../Tooltip2'

type TVariant = 'default' | 'stickToBottom'

export type TSliderProps = {
  width?: TWidth
  variant?: TVariant
  hideLabel?: boolean
  formatValue?: (value: number) => number | string
  formatTooltipValue?: (value: number) => number | string
  className?: string
  valuesClassName?: string
  minMaxClassName?: string
  minMaxAlignCenter?: boolean
  step?: number | undefined
  alwaysShowTooltip?: boolean
} & (
  | {
      value: number
      onChange: (value: number) => void
    }
  | {
      values: [number, number]
      onChange: (values: [number, number]) => void
    }
) &
  (
    | {
        min: number
        max: number
      }
    | {
        steps: number[]
      }
  )

const defaultFormat = (value: number) => value

export default function Slider({
  width = 311,
  variant = 'default',
  hideLabel,
  formatValue = defaultFormat,
  formatTooltipValue = formatValue,
  className,
  valuesClassName = 'mt-2',
  minMaxClassName = 'top-5 text-gray-2d font-medium text-sm',
  minMaxAlignCenter = false,
  alwaysShowTooltip,
  ...props
}: TSliderProps): JSX.Element {
  const stickToBottom = variant === 'stickToBottom'
  const [min, max] =
    'steps' in props
      ? [props.steps[0], props.steps[props.steps.length - 1]]
      : [props.min, props.max]

  let values: number[]
  let setValues: (values: number[]) => void
  let startPercent: number
  let endPercent: number

  if ('value' in props) {
    values = [valueToFraction(props, props.value)]
    setValues = values => props.onChange(fractionToValue(props, values[0]))
    startPercent = 0
    endPercent = sliderValueToPercent(values[0])
  } else {
    values = [
      valueToFraction(props, props.values[0]),
      valueToFraction(props, props.values[1]),
    ]
    setValues = values => {
      props.onChange([
        fractionToValue(props, values[0]),
        fractionToValue(props, values[1]),
      ])
    }
    startPercent = sliderValueToPercent(values[0])
    endPercent = sliderValueToPercent(values[1])
  }

  return (
    <Range
      min={0}
      max={sliderMax}
      step={props.step}
      values={values}
      onChange={values => setValues(values)}
      renderTrack={({ props: trackProps, children }) => (
        <div
          className={cn('h-4 rounded relative group', className)}
          style={{
            width: `${width}px`,
          }}
        >
          <div
            {...trackProps}
            style={
              stickToBottom
                ? {
                    ...trackProps.style,
                    transform: `${trackProps.style.transform} rotate(-1.3deg)`,
                  }
                : trackProps.style
            }
          >
            <SliderShape className='w-full h-full text-gray-e6' width={width} />
            <SliderShape
              className='w-full h-full text-blue-3f absolute inset-0'
              width={width}
              style={{
                clipPath: `polygon(${startPercent}% 0, ${endPercent}% 0, ${endPercent}% 100%, ${startPercent}% 100%)`,
              }}
            />
            {children}
          </div>
          {!hideLabel && (
            <div
              className={cn('flex-between whitespace-nowrap', valuesClassName)}
            >
              <div className={cn('flex-center', minMaxAlignCenter && 'w-0')}>
                <div className={minMaxClassName}>
                  {min === 0 ? min : formatValue(min)}
                </div>
              </div>
              {'steps' in props &&
                props.steps.slice(1, props.steps.length - 1).map(step => (
                  <div key={step} className='w-0 flex-center'>
                    <div className='text-xs font-medium text-gray-a0'>
                      {formatValue(step)}
                    </div>
                  </div>
                ))}
              <div className={cn('flex-center', minMaxAlignCenter && 'w-0')}>
                <div className={minMaxClassName}>{formatValue(max)}</div>
              </div>
            </div>
          )}
        </div>
      )}
      renderThumb={({ props: thumbProps, value }) => (
        <button
          type='button'
          className={cn(
            'absolute top-0 -ml-3 w-6 h-6 bg-white rounded-full shadow-depth-1 flex-center focus:outline-none',
            stickToBottom && '-top-1',
          )}
          {...thumbProps}
        >
          <Tooltip2
            text={formatTooltipValue(fractionToValue(props, value))}
            show
            className={cn(
              'whitespace-nowrap duration-200 transition',
              !alwaysShowTooltip && 'opacity-0 group-hover:opacity-100',
            )}
          >
            {ref => (
              <div ref={ref} className='w-4 h-4 bg-blue-3f rounded-full' />
            )}
          </Tooltip2>
        </button>
      )}
    />
  )
}
