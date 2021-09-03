import { KeyboardEvent } from 'react'
import { formatNumber } from 'common/utils/format'
import { TOption } from './SelectAmount'

const specialKeys: number[] = []
specialKeys.push(8) // Backspace
specialKeys.push(190) // dot
specialKeys.push(37) // arrow left
specialKeys.push(39) // arrow right

export const useOptions = (
  min: number,
  max: number,
  step: number,
): TOption[] => {
  const options: TOption[] = []
  let maxValue = 0
  for (let i = min; i <= max; i += step) {
    const option = {
      label: formatNumber(i),
      value: i.toString(),
    }
    maxValue = i
    options.push(option)
  }
  if (maxValue < max) {
    options.push({
      label: formatNumber(max),
      value: max.toString(),
    })
  }

  return options
}

export const validate = (e: KeyboardEvent<HTMLInputElement>): boolean => {
  const keyCode = e.which ? e.which : e.keyCode
  return (keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) !== -1
}

export const formatDisplayNumber = (x: string, delimiter = ','): string =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter)

export const generateStep = (value: number): number => {
  if (value >= 10000) {
    return 10000
  }

  if (value >= 1000) {
    return 1000
  }

  if (value >= 100) {
    return 100
  }

  return 10
}
