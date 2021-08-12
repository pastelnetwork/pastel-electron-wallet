export type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
