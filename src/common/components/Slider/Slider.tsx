import React, { CSSProperties } from 'react'
import { Range } from 'react-range'
import cn from 'classnames'

const paths = {
  311: (
    <path
      d='M0 8C0 6.88924 0.889079 5.98285 1.99963 5.96142L303.001 0.154312C307.394 0.0695737 311 3.60691 311 8C311 12.3931 307.394 15.9304 303.001 15.8457L1.99963 10.0386C0.889079 10.0172 0 9.11076 0 8Z'
      fill='currentColor'
    />
  ),
  349: (
    <path
      d='M0 8C0 6.88991 0.889781 5.9847 1.9997 5.96562L341.001 0.137515C345.396 0.0619531 349 3.60414 349 8C349 12.3959 345.396 15.938 341.001 15.8625L1.9997 10.0344C0.889775 10.0153 0 9.11009 0 8Z'
      fill='currentColor'
    />
  ),
} as const

type Width = keyof typeof paths

const SliderShape = ({
  className,
  width,
  style,
}: {
  className: string
  width: Width
  style?: CSSProperties
}) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${width} 16`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {paths[width]}
    </svg>
  )
}

export type TSliderProps = {
  min: number
  max: number
  width?: Width
  hideLabel?: boolean
  formatValue?: (value: number) => number | string
  formatTooltipValue?: (value: number) => number | string
  minMaxClassName?: string
} & (
  | {
      value: number
      onChange: (value: number) => void
    }
  | {
      values: [number, number]
      onChange: (values: [number, number]) => void
    }
)

const defaultFormat = (value: number) => value

export default function Slider({
  min,
  max,
  width = 311,
  hideLabel,
  formatValue = defaultFormat,
  formatTooltipValue = formatValue,
  minMaxClassName = 'top-5 text-gray-2d text-sm',
  ...props
}: TSliderProps): JSX.Element {
  let values: number[]
  let setValues: (values: number[]) => void
  let startPercent: number
  let endPercent: number

  if ('value' in props) {
    values = [props.value]
    setValues = values => props.onChange(values[0])
    startPercent = 0
    endPercent = ((props.value - min) * 100) / (max - min)
  } else {
    values = props.values
    setValues = values => props.onChange(values as [number, number])
    startPercent = ((values[0] - min) * 100) / (max - min)
    endPercent = ((values[1] - min) * 100) / (max - min)
  }

  return (
    <Range
      min={min}
      max={max}
      values={values}
      onChange={values => setValues(values as [number, number])}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className='h-4 rounded relative'
          style={{ width: `${width}px` }}
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
          {!hideLabel && (
            <>
              <div className={cn('absolute left-0', minMaxClassName)}>
                {formatValue(min)}
              </div>
              <div className={cn('absolute right-0', minMaxClassName)}>
                {formatValue(max)}
              </div>
            </>
          )}
        </div>
      )}
      renderThumb={({ props, value }) => (
        <button
          className='absolute top-0 -ml-3 w-6 h-6 bg-white rounded-full shadow-depth-1 flex-center focus:outline-none'
          {...props}
        >
          <div className='w-4 h-4 bg-blue-3f rounded-full' />
          <div className='absolute -top-8 -mt-0.5 flex flex-col items-center'>
            <div className='bg-gray-14 rounded-md h-7 px-2 flex-center text-xs whitespace-nowrap text-white font-extrabold'>
              {formatTooltipValue(value)}
            </div>
            <svg
              width='12'
              height='5'
              viewBox='0 0 12 5'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M3.17157 3.17157L0 0H12L8.82843 3.17157C7.26633 4.73367 4.73367 4.73367 3.17157 3.17157Z'
                fill='#141416'
              />
            </svg>
          </div>
        </button>
      )}
    />
  )
}
