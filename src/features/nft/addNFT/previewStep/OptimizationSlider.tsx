import React from 'react'
import Slider from 'common/components/Slider/Slider'
import { formatFileSize, formatPrice } from 'common/utils/format'
import { TAddNFTState, TImage } from '../AddNFT.state'
import Spinner from 'common/components/Spinner'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TOptimizationSliderProps = {
  state: TAddNFTState
  image: TImage
  fee: number | undefined
}

const createArrayOfIndices = (length: number) =>
  new Array(length).fill(0).map((_, i) => i)

export default function OptimizationSlider({
  state,
  image,
  fee,
}: TOptimizationSliderProps): JSX.Element | null {
  const currencyName = useCurrencyName()

  if (state.optimizationState.status === 'processing') {
    return (
      <div className='flex items-center text-gray-71'>
        <div className='mr-3'>Loading optimized images</div>
        <Spinner className='w-6 h-6' />
      </div>
    )
  }

  const { files } = state.optimizationState
  if (!files?.length) {
    return null
  }

  const formatValue = (value: number) => {
    const index = Math.round(value)
    const file = files[index] || image.file
    return formatFileSize(file.size, 2)
  }

  const formatTooltipValue = (value: number) => {
    const size = formatValue(value)

    if (fee === undefined) {
      return size
    } else {
      return `${size} - ${formatPrice(fee, currencyName)}`
    }
  }

  const selectedIndex =
    state.optimizationState.selectedFile?.index ?? files.length

  const onChange = (value: number) => {
    const index = Math.round(value)
    const file = files[index]
    state.optimizationState.setSelectedFile(file && { ...file, index })
  }

  return (
    <Slider
      className='relative z-10'
      min={0}
      max={files.length}
      onChange={onChange}
      value={selectedIndex}
      step={1}
      steps={createArrayOfIndices(files.length + 1)}
      formatValue={formatValue}
      formatTooltipValue={formatTooltipValue}
      minMaxClassName='top-6 text-gray-71 text-xs'
      minMaxAlignCenter
      width={349}
      alwaysShowTooltip
    />
  )
}
