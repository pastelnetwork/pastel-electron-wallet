type IResonseError = {
  message: string
}

type IResponse<T> = {
  error: IResonseError
  id: string
  result: T
}

export type { IResonseError, IResponse }
