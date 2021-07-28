import { RefObject, useMemo, useRef } from 'react'
import Downshift, { ControllerStateAndHelpers } from 'downshift'
import { formatNumber, parseFormattedNumber } from 'common/utils/format'
import {
  TOption,
  TOptionsProps,
  TRangeProps,
} from 'common/components/Select/Select'

const noop = () => {
  // noop
}

const inputEventTypesToIgnore: string[] = [
  Downshift.stateChangeTypes.mouseUp,
  Downshift.stateChangeTypes.blurInput,
  Downshift.stateChangeTypes.controlledPropUpdatedSelectedItem,
]

type TOptions = {
  options: TOption[]
  selected: TOption | null
  onChange: (option: TOption | null) => void
  onInputValueChange:
    | undefined
    | ((value: string, options: ControllerStateAndHelpers<TOption>) => void)
  inputValueRef: RefObject<string>
}

export const useSelectOptions = (
  props: TOptionsProps | TRangeProps,
): TOptions => {
  const inputValueRef = useRef('')

  let selected: TOptions['selected']
  let onChange: TOptions['onChange']
  let onInputValueChange: TOptions['onInputValueChange']

  const optionsProps = props as TOptionsProps
  const rangeProps = props as TRangeProps

  const options = useMemo<TOptions['options']>(() => {
    if ('options' in props) {
      return props.options
    }

    const { min, max, step } = props

    const options: TOptions['options'] = []
    for (let i = min; i <= max; i += step) {
      const option = {
        label: formatNumber(i),
        value: i.toString(), // used for filtering
      }
      options.push(option)
    }
    return options
  }, [optionsProps.options, rangeProps.min, rangeProps.max, rangeProps.step])

  if ('options' in props) {
    onChange = props.onChange
    selected = props.selected || null

    onInputValueChange = value => {
      inputValueRef.current = value
    }
  } else {
    const { value, onChange: propsOnChange } = props

    if (value) {
      inputValueRef.current = formatNumber(value)
    }

    selected = null

    // onChange is required by Downshift but not needed for autocomplete mode
    onChange = noop

    onInputValueChange = (value, options) => {
      // prevent input change on clicking or tabbing outside of input
      const { type } = (options as unknown) as { type: string }
      if (inputEventTypesToIgnore.includes(type)) {
        return
      }

      // replace all non-digits except comma
      const filteredValue = value.replace(/[^\d,]/g, '')
      const parsed = parseFormattedNumber(filteredValue)

      if (isNaN(parsed)) {
        inputValueRef.current = filteredValue
      } else {
        inputValueRef.current = formatNumber(parsed)
        propsOnChange(parsed)
      }
    }
  }

  return {
    options,
    selected,
    onChange,
    onInputValueChange,
    inputValueRef,
  }
}
