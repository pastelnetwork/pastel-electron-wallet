import React from 'react'
import Slider from 'common/components/Slider/Slider'
import { formatNumber } from 'common/utils/format'

export type TOptimizationSliderProps = {
  calcFee(val: number): number
  quality: number
  onChange(val: number): void
  currencyName: string
}

const minQuality = 10

export default function OptimizationSlider({
  calcFee,
  quality,
  onChange,
  currencyName,
}: TOptimizationSliderProps): JSX.Element {
  const formatValue = (value: number) => `${value}% quality`
  const formatTooltipValue = (value: number) => {
    return `${Math.round(value)}% quality - ${formatNumber(
      calcFee(value),
    )} ${currencyName}`
  }

  return (
    <Slider
      min={minQuality}
      max={100}
      onChange={onChange}
      value={quality}
      step={1}
      formatValue={formatValue}
      formatTooltipValue={formatTooltipValue}
      minMaxClassName='top-6 text-gray-71 text-xs'
      width={349}
    />
  )
}
