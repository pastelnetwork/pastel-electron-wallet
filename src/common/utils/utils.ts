import { useLocation } from 'react-router-dom'
import * as ROUTES from 'common/utils/constants/routes'

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

  static noHeader(): boolean {
    const location = useLocation()

    return location.pathname === ROUTES.CHAT
  }
}
