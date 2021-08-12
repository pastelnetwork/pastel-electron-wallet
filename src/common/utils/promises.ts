export const promiseTimeout = (delay: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, delay))

export const retryPromise = async <T>(
  promiseCreator: () => Promise<T>,
  {
    delay,
    attempts,
    onError,
  }: { delay: number; attempts: number; onError?(error: Error): void },
): Promise<T> => {
  let error
  for (let i = 0; i < attempts; i++) {
    try {
      return await promiseCreator()
    } catch (err) {
      error = err
      onError?.(error)
    }

    await promiseTimeout(delay)
  }

  throw error
}

export const ignorePromiseError = async (
  promise: Promise<unknown>,
): Promise<void> => {
  try {
    await promise
  } catch {
    // noop
  }
}
