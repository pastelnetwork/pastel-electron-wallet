/* eslint-disable */
import store from '../../redux/store'

export const NO_CONNECTION = 'Could not connect to pasteld'
export default class Utils {
  static isSapling(addr: any) {
    if (!addr) return false
    return (
      new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
      new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
    )
  }

  static isSprout(addr: any) {
    if (!addr) return false
    return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
  }

  static isZaddr(addr: any) {
    if (!addr) return false
    return Utils.isSapling(addr) || Utils.isSprout(addr)
  }

  static isTransparent(addr: any) {
    if (!addr) return false
    return new RegExp('^P[a-zA-Z0-9]{34}$').test(addr)
  }

  static isValidSaplingPrivateKey(key: any) {
    return (
      new RegExp('^p-secret-extended-key-test[0-9a-z]{278}$').test(key) ||
      new RegExp('^p-secret-extended-key-main[0-9a-z]{278}$').test(key)
    )
  } // Convert to max 5 decimal places, and remove trailing zeros

  static maxPrecision(v: any) {
    if (!v) return v

    if (typeof v === 'string' || v instanceof String) {
      v = parseFloat(v as string)
    }

    return v.toFixed(5)
  }

  static maxPrecisionTrimmed(v: any) {
    let s = Utils.maxPrecision(v)

    if (!s) {
      return s
    }

    while (s.indexOf('.') >= 0 && s.substr(s.length - 1, 1) === '0') {
      s = s.substr(0, s.length - 1)
    }

    if (s.substr(s.length - 1) === '.') {
      s = s.substr(0, s.length - 1)
    }

    return s
  }

  static splitPslAmountIntoBigSmall(pslValue: any) {
    if (!pslValue) {
      return {
        bigPart: pslValue,
        smallPart: '',
      }
    }

    let bigPart = Utils.maxPrecision(pslValue)
    let smallPart = ''

    if (bigPart.indexOf('.') >= 0) {
      const decimalPart = bigPart.substr(bigPart.indexOf('.') + 1)

      if (decimalPart.length > 4) {
        smallPart = decimalPart.substr(4)
        bigPart = bigPart.substr(0, bigPart.length - smallPart.length) // Pad the small part with trailing 0s

        while (smallPart.length < 4) {
          smallPart += '0'
        }
      }
    }

    if (smallPart === '0000') {
      smallPart = ''
    }

    return {
      bigPart,
      smallPart,
    }
  }

  static splitStringIntoChunks(s: any, numChunks: any) {
    if (numChunks > s.length) return [s]
    if (s.length < 16) return [s]
    const chunkSize = Math.round(s.length / numChunks)
    const chunks = []

    for (let i = 0; i < numChunks - 1; i++) {
      chunks.push(s.substr(i * chunkSize, chunkSize))
    } // Last chunk might contain un-even length

    chunks.push(s.substr((numChunks - 1) * chunkSize))
    return chunks
  }

  static nextToAddrID = 0

  static getNextToAddrID() {
    return Utils.nextToAddrID++
  }

  static getDefaultFee(height: any) {
    if (height >= 1080000) {
      return 0.00001
    } else {
      return 0.0001
    }
  }

  static getDonationAddress(testnet: any) {
    if (testnet) {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7'
    } else {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7'
    }
  }

  static getDefaultDonationAmount(testnet: any) {
    return 0.1
  }

  static getDefaultDonationMemo(testnet: any) {
    return 'Thanks for supporting Pastelwallet!'
  }

  static getPslToUsdString(price: any, pslValue: any) {
    // overriding price here to avoid connecing every legacy component to redux
    const realPrice = store.getState().pastelPrice.price

    if (!realPrice || !pslValue) {
      return 'USD --'
    }

    return `USD ${(realPrice * pslValue).toFixed(2)}`
  }
}
