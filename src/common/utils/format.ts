// taken from here: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const formatNumber = (x: number, delimiter = ','): string =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, delimiter)

export const parseFormattedNumber = (input: string, delimiter = ','): number =>
  parseFloat(input.replaceAll(delimiter, ''))
