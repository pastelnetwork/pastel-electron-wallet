import { Dayjs } from 'dayjs'

// taken from here: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const formatNumber = (x: number, delimiter = ','): string =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter)

export const parseFormattedNumber = (input: string, delimiter = ','): number =>
  parseFloat(input.replaceAll(delimiter, ''))

const distanceUnits = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
] as const

// Example output: 1y 2m 3m 4d 5h 6m 7s
// 0 values are skipped by design, thought it seems to be a bug
export const formatDatesDistance = (from: Dayjs, to: Dayjs): string => {
  const result: string[] = []

  distanceUnits.forEach(unit => {
    const value = to.diff(from, unit)
    to = to.subtract(value, unit)
    if (value) {
      result.push(`${value}${unit[0]}`)
    }
  })

  return result.join(' ')
}

// convert string to title case -> Convert String To Title Case
export const formatToTitleCase = (string: string): string =>
  string.replace(
    /\w\S*/g,
    word =>
      word.charAt(0).toLocaleUpperCase() + word.substr(1).toLocaleLowerCase(),
  )

export const formatDate = (time: Dayjs): string => time.format('MM/DD/YY')
