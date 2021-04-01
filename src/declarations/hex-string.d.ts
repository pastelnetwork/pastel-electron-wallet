declare module 'hex-string' {
  const m: {
    decode(s: string): BufferSource
    encode(b: BufferSource): string
  }
  export = m
}
