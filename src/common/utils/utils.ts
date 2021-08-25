export default class PastelUtils {
  static removeAllBreakChar(value: string): string {
    return value.replace(/\n/g, '').replace(/\s/g, '')
  }

  static truncateMiddle(
    str: string,
    frontLen: number,
    backLen: number,
    truncateStr: string,
  ): string {
    if (str === null) {
      return ''
    }
    const strLen = str.length
    // Setting default values
    frontLen = ~~frontLen // will cast to integer
    backLen = ~~backLen
    truncateStr = truncateStr || '&hellip;'
    if (
      (frontLen === 0 && backLen === 0) ||
      frontLen >= strLen ||
      backLen >= strLen ||
      frontLen + backLen >= strLen
    ) {
      return str
    } else if (backLen === 0) {
      return str.slice(0, frontLen) + truncateStr
    }
    return str.slice(0, frontLen) + truncateStr + str.slice(strLen - backLen)
  }

  static isSapling(addr: string): boolean {
    if (!addr) {
      return false
    }

    return (
      new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
      new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
    )
  }

  static isSprout(addr: string): boolean {
    if (!addr) {
      return false
    }

    return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
  }

  static isZaddr(addr: string): boolean {
    if (!addr) {
      return false
    }

    return this.isSapling(addr) || this.isSprout(addr)
  }

  static isTransparent(addr: string): boolean {
    if (!addr) {
      return false
    }

    return new RegExp('^[tP][a-zA-Z0-9]{34}$').test(addr)
  }

  static generateStep = (value: number): number => {
    if (value >= 10000) {
      return 10000
    }

    if (value >= 1000) {
      return 1000
    }

    if (value >= 100) {
      return 100
    }

    return 10
  }
}
