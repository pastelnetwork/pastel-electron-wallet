export default class PastelUtils {
  static removeAllBreakChar(value: string): string {
    return value.replace(/\u00ad/g, '').replace(/\s/g, '')
  }
}
