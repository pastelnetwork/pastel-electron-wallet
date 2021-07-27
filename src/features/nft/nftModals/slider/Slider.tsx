import React from 'react'
import { Range } from 'react-range'

export type TSlider = {
  value: number
  setValue(value: number): void
}

export default function Slider({ value, setValue }: TSlider): JSX.Element {
  return (
    <Range
      step={0.1}
      min={0}
      max={100}
      values={[value]}
      onChange={values => setValue(values[0])}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className='bg-white bg-opacity-20 w-full rounded-full h-1 relative'
        >
          {children}
          <div
            className='absolute bg-white h-1 rounded-full'
            style={{ width: `${value}%` }}
          />
        </div>
      )}
      renderThumb={({ props }) => (
        <div {...props} className='bg-white rounded-full h-3 w-3 outline-none'>
          <div className='absolute -top-9 flex flex-col items-center w-48px transform -translate-x-18px'>
            <div className='bg-gray-14 rounded-md h-7 px-2 flex-center text-xs whitespace-nowrap text-white'>
              {props['aria-valuenow']}%
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
        </div>
      )}
    />
  )
}
