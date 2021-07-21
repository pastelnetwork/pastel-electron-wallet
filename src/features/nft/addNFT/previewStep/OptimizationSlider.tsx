import React from 'react'
import Slider from 'common/components/Slider/Slider'
import { formatNumber } from 'common/utils/format'
import { minQualityByType } from '../AddNft.constants'

export type TOptimizationSliderProps = {
  imageType: string
  fee: number | undefined
  quality: number
  onChange(val: number): void
  currencyName: string
}

export default function OptimizationSlider({
  imageType,
  fee,
  quality,
  onChange,
  currencyName,
}: TOptimizationSliderProps): JSX.Element {
  const formatValue = (value: number) => `${value}% quality`
  const formatTooltipValue = (value: number) => {
    const quality = `${Math.round(value)}% quality`

    if (fee === undefined) {
      return quality
    } else {
      return `${quality} - ${formatNumber(fee)} ${currencyName}`
    }
  }

  return (
    <Slider
      min={minQualityByType[imageType]}
      max={100}
      onChange={(value: number) => onChange(Math.round(value))}
      value={quality}
      step={1}
      formatValue={formatValue}
      formatTooltipValue={formatTooltipValue}
      minMaxClassName='top-6 text-gray-71 text-xs'
      width={349}
    />
  )
}
