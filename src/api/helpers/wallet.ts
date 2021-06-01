const isSapling = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return (
    new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
    new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
  )
}

const isSprout = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
}

const isZaddr = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return isSapling(addr) || isSprout(addr)
}

const isTransparent = (addr: string): boolean => {
  if (!addr) {
    return false
  }
  return new RegExp('^[tP][a-zA-Z0-9]{34}$').test(addr)
}

export { isSapling, isSprout, isTransparent, isZaddr }
