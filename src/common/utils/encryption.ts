import { SHA3 } from 'sha3'

export const encode = (str: string): string => {
  const hash = new SHA3(256)
  return hash.update(str).digest('hex')
}
