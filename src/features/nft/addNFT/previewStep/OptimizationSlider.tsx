import React, { useCallback } from 'react'
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
  const { files } = state.optimizationService

  const formatValue = useCallback(
    (value: number) => {
      if (files) {
        const index = Math.round(value)
        const file = files[index] || image
        return formatFileSize(file.size, 2)
      }
      return ''
    },
    [files],
  )

  const formatTooltipValue = useCallback(
    (value: number) => {
      const size: string = formatValue(value) || ''

      if (fee === undefined) {
        return size
      } else {
        return `${size} - ${formatPrice(fee, currencyName)}`
      }
    },
    [fee, state],
  )

  const onChange = useCallback(
    (value: number) => {
      if (files) {
        const index = Math.round(value)
        const file = files[index]
        state.optimizationService.setSelectedFile(file && { ...file, index })
      }
    },
    [state, files],
  )

  if (state.optimizationService.status === 'processing') {
    return (
      <div className='flex items-center text-gray-71'>
        <div className='mr-3'>Loading optimized images</div>
        <Spinner className='w-6 h-6' />
      </div>
    )
  }

  if (!files?.length) {
    return null
  }
  const selectedIndex =
    state.optimizationService.selectedFile?.index ?? files.length

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
      customStartValue={formatFileSize(files[0].size, 2)}
    />
  )
}
