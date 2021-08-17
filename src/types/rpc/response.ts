type TResonseError = {
  message: string
}

type TResponse<T> = {
  error: TResonseError
  id: string
  result: T
}

export type { TResonseError, TResponse }
