export type TIpcListenerResponse<T> = {
  status: 'Success' | 'Failure'
  payload?: T
  error?: string
}
