export function debounce<T extends unknown[], U>(
  callback: (...args: T) => U,
  wait: number,
): (...args: T) => void {
  let timer: NodeJS.Timeout | undefined

  return (...args: T): void => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => callback(...args), wait)
  }
}
