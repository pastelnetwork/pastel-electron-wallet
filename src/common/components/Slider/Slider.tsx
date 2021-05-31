import React, { CSSProperties } from 'react'
import { Range } from 'react-range'

const SliderShape = ({
  className,
  style,
}: {
  className?: string
  style?: CSSProperties
}) => {
  return (
    <svg
      className={className}
      style={style}
      viewBox='0 0 311 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 8C0 6.88924 0.889079 5.98285 1.99963 5.96142L303.001 0.154312C307.394 0.0695737 311 3.60691 311 8C311 12.3931 307.394 15.9304 303.001 15.8457L1.99963 10.0386C0.889079 10.0172 0 9.11076 0 8Z'
        fill='currentColor'
      />
    </svg>
  )
}

export type SliderProps = {
  min: number
  max: number
  style?: CSSProperties
  formatValue?: (value: number) => number | string
  formatTooltipValue?: (value: number) => number | string
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

const defaultStyle = {
  width: '19rem',
}

const defaultFormat = (value: number) => value

export default function Slider({
  min,
  max,
  style = defaultStyle,
  formatValue = defaultFormat,
  formatTooltipValue = formatValue,
  ...props
}: SliderProps): JSX.Element {
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
        <div {...props} className='h-4 rounded relative' style={style}>
          <SliderShape className='w-full h-full text-gray-e6' />
          <SliderShape
            className='w-full h-full text-blue-3f absolute inset-0'
            style={{
              clipPath: `polygon(${startPercent}% 0, ${endPercent}% 0, ${endPercent}% 100%, ${startPercent}% 100%)`,
            }}
          />
          {children}
          <div className='absolute left-0 top-5 text-gray-2d text-sm'>
            {formatValue(min)}
          </div>
          <div className='absolute right-0 top-5 text-gray-2d text-sm'>
            {formatValue(max)}
          </div>
        </div>
      )}
      renderThumb={({ props, value }) => (
        <button
          className='absolute top-0 -ml-3 w-6 h-6 bg-white rounded-full shadow-depth-1 flex-center focus:outline-none'
          {...props}
        >
          <div className='w-4 h-4 bg-blue-3f rounded-full' />
          <div className='absolute -top-9 flex flex-col items-center'>
            <div className='bg-gray-14 rounded-md h-7 px-2 flex-center text-xs whitespace-nowrap text-white'>
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
