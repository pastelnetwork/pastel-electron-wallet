import { TSliderProps } from './Slider'

export const sliderMin = 0
export const sliderMax = 1000
export const sliderValueToPercent = (value: number): number => value / 10

// Convert value from range like 50..150 to slider value from strict range 0..1000
// Example for steps [1, 5, 15]:
// 1 -> 0,
// 5 -> 500
// 10 -> 750
// 15 -> 1000
export const valueToFraction = (props: TSliderProps, value: number): number => {
  if (!('steps' in props)) {
    return roundToStep(
      ((value - props.min) * sliderMax) / (props.max - props.min),
      props.step,
    )
  }

  const { steps } = props

  let lowerIndex = 0
  const len = steps.length
  while (lowerIndex < len) {
    if (steps[lowerIndex + 1] > value) {
      break
    }
    lowerIndex++
  }

  if (lowerIndex >= len) {
    return sliderMax
  }

  const lowerOffset = lowerIndex / (steps.length - 1)
  const lowerValue = steps[lowerIndex]
  const upperIndex = lowerIndex + 1
  const upperValue = steps[upperIndex]
  const upperOffset = upperIndex / (steps.length - 1)
  const stepOffset =
    ((upperOffset - lowerOffset) * (value - lowerValue)) /
    (upperValue - lowerValue)

  return roundToStep((lowerOffset + stepOffset) * sliderMax, props.step)
}

/**
 * Round value (to avoid Range component warn "The `values` property is in conflict with the current `step`, `min`, and `max` properties")
 * @param val
 * @param step
 * @returns Rounded value
 */
export const roundToStep = (val: number, step: number | undefined): number => {
  if (!step) {
    return val
  }

  return Math.round(val / step) * step
}

// Convert slider value 0..1000 back to range min..max
export const fractionToValue = (props: TSliderProps, value: number): number => {
  const fraction = value / sliderMax

  if (!('steps' in props)) {
    return props.min + (props.max - props.min) * fraction
  }

  const { steps } = props

  const floatingIndex = fraction * (steps.length - 1)
  const lowerIndex = Math.floor(floatingIndex)
  const upperIndex = lowerIndex + 1

  if (upperIndex > steps.length - 1) {
    return steps[steps.length - 1]
  }

  const floatingValue =
    (floatingIndex % 1) * (steps[upperIndex] - steps[lowerIndex])

  return steps[lowerIndex] + floatingValue
}
