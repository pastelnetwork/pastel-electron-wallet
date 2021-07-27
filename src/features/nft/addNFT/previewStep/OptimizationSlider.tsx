import React from 'react'
import Slider from 'common/components/Slider/Slider'
import { formatNumber } from 'common/utils/format'

export type TOptimizationSliderProps = {
  recalcFee(val: number): number
  fileSizeKb: number
  optimizedSizeKb: number
  setOptimizedSizeKb(val: number): void
  currencyName: string
}

export default function OptimizationSlider(
  props: TOptimizationSliderProps,
): JSX.Element {
  const fileSizeMb = props.fileSizeKb / 1024
  const maxOptimization = Math.ceil(10 * fileSizeMb) / 10

  const formatValue = (value: number) => `${value} Mb`
  const formatTooltipValue = (value: number) => {
    return `${value.toFixed(1)} Mb - ${formatNumber(
      props.recalcFee(value * 1024),
    )} ${props.currencyName}`
  }

  const onUpdate = (val: number) => {
    props.setOptimizedSizeKb(val * 1024)
  }

  return (
    <Slider
      min={0}
      max={maxOptimization}
      onChange={onUpdate}
      value={props.optimizedSizeKb / 1024}
      step={0.01}
      formatValue={formatValue}
      formatTooltipValue={formatTooltipValue}
      minMaxClassName='top-6 text-gray-71 text-xs'
      width={349}
    />
  )
}
