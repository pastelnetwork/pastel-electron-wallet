import React, { useCallback, useMemo } from 'react'
import Select, { TSelectRangeProps, TOption } from './Select'
import { formatNumber, parseFormattedNumber } from '../../utils/format'

const defaultFilterOptions = (options: TOption[], value: string) => {
  const filteredValue = String(parseFormattedNumber(value))
  return options.filter(option => option.value.startsWith(filteredValue))
}

export default function SelectRange({
  min,
  max,
  step,
  onChange,
  value,
  filterOptions = defaultFilterOptions,
  ...props
}: TSelectRangeProps): JSX.Element {
  const options = useMemo<TOption[]>(() => {
    const options: TOption[] = []

    for (let i = min; i <= max; i += step) {
      options.push({
        label: formatNumber(i),
        value: i.toString(), // used for filtering
      })
    }

    if (max % step !== 0) {
      options.push({
        label: formatNumber(max),
        value: max.toString(),
      })
    }

    return options
  }, [min, max, step])

  const stringValue = String(value)
  const selected = useMemo(() => {
    return value === null
      ? value
      : options.find(option => stringValue === option.value)
  }, [stringValue, options])

  const onChangeOption = useCallback((option: TOption | null) => {
    onChange(option === null ? null : parseFloat(option.value))
  }, [])

  return (
    <Select
      selected={selected}
      options={options}
      onChange={onChangeOption}
      filterOptions={filterOptions}
      {...props}
    />
  )
}
