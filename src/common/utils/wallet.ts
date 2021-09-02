export const isSapling = (addr: string): boolean => {
  if (!addr) {
    return false
  }

  return (
    new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
    new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
  )
}

export const isSprout = (addr: string): boolean => {
  if (!addr) {
    return false
  }

  return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
}

export const isZaddr = (addr: string): boolean => {
  if (!addr) {
    return false
  }

  return isSapling(addr) || isSprout(addr)
}

export const isTransparent = (addr: string): boolean => {
  if (!addr) {
    return false
  }

  return new RegExp('^[tP][a-zA-Z0-9]{34}$').test(addr)
}

export const isValidSaplingPrivateKey = (key: string): boolean => {
  return (
    new RegExp('^p-secret-extended-key-test[0-9a-z]{278}$').test(key) ||
    new RegExp('^p-secret-extended-key-main[0-9a-z]{278}$').test(key)
  )
}

export const isValidPrivateKey = (key: string): boolean => {
  if (key.startsWith('p-secret-extended-key')) {
    return isValidSaplingPrivateKey(key)
  }

  return key.length === 52
}
