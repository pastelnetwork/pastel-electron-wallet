import React, { useState } from 'react'
import Slider from 'common/components/Slider/Slider'

export default function OptimizationSlider(): JSX.Element {
  const [optimization, setOptimization] = useState(50)
  const minOptimization = 10
  const maxOptimization = 100
  const formatValue = (value: number) => `${value} Mb`
  const formatTooltipValue = (value: number) => `${value} Mb - 5,000 PSL`

  return (
    <Slider
      min={minOptimization}
      max={maxOptimization}
      onChange={setOptimization}
      value={optimization}
      formatValue={formatValue}
      formatTooltipValue={formatTooltipValue}
      minMaxClassName='top-6 text-gray-71 text-xs'
      width={349}
    />
  )
}
