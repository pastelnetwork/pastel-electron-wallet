import dateformat from 'dateformat'
import { Dayjs } from 'dayjs'

// taken from here: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const formatNumber = (x: number, delimiter = ','): string =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter)

export const parseFormattedNumber = (input: string, delimiter = ','): number =>
  parseFloat(input.replaceAll(delimiter, ''))
// taken from https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
// Example input, output
// case 1: formatAbbreviatedNumber(759878, 1) = 759.9k
// case 2: formatAbbreviatedNumber(759878, 0) = 760k
export const formatAbbreviatedNumber = (x: number, digits: number): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(item => {
      return x >= item.value
    })
  return item
    ? (x / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}

export const formatTime = (val: Date): string => {
  return dateformat(val, 'hh:MM') // TODO: change if another format required
}

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

export const formatFileSize = (size: number): string => {
  let i = -1
  const units = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
  do {
    size = size / 1024
    i++
  } while (size > 1024)

  if (!i) {
    return Math.round(size) + units[i]
  }

  return Math.max(size, 0.1).toFixed(1) + units[i]
}
