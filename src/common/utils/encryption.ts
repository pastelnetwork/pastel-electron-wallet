import LZUTF8 from 'lzutf8'

export const encode = (str: string): string => {
  if (!str) {
    return ''
  }

  return encodeURIComponent(
    LZUTF8.compress(JSON.stringify(str), {
      outputEncoding: 'Base64',
    }),
  )
}

export const decode = (str: string): string => {
  if (!str) {
    return ''
  }

  return JSON.parse(
    LZUTF8.decompress(decodeURIComponent(str), {
      inputEncoding: 'Base64',
    }),
  )
}
