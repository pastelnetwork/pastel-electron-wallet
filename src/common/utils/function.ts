// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = <T extends Function>(fn: T, wait: number): T => {
  let timeout: NodeJS.Timeout | undefined
  return (function (...args: unknown[]) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      timeout = undefined
      fn(...args)
    }, wait)
  } as unknown) as T
}
