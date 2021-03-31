/* eslint-disable no-unused-vars */

/* eslint-disable no-else-return */

/* eslint-disable no-plusplus */
export const NO_CONNECTION = 'Could not connect to pasteld'
export default class Utils {
  static isSapling(addr) {
    if (!addr) return false
    return (
      new RegExp('^ps[a-z0-9]{76}$').test(addr) ||
      new RegExp('^ptestsapling[a-z0-9]{76}$').test(addr)
    )
  }

  static isSprout(addr) {
    if (!addr) return false
    return new RegExp('^P[a-zA-Z0-9]{94}$').test(addr)
  }

  static isZaddr(addr) {
    if (!addr) return false
    return Utils.isSapling(addr) || Utils.isSprout(addr)
  }

  static isTransparent(addr) {
    if (!addr) return false
    return new RegExp('^P[a-zA-Z0-9]{34}$').test(addr)
  }

  static isValidSaplingPrivateKey(key) {
    return (
      new RegExp('^p-secret-extended-key-test[0-9a-z]{278}$').test(key) ||
      new RegExp('^p-secret-extended-key-main[0-9a-z]{278}$').test(key)
    )
  } // Convert to max 5 decimal places, and remove trailing zeros

  static maxPrecision(v) {
    if (!v) return v

    if (typeof v === 'string' || v instanceof String) {
      // eslint-disable-next-line no-param-reassign
      v = parseFloat(v)
    }

    return v.toFixed(5)
  }

  static maxPrecisionTrimmed(v) {
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

  static splitPslAmountIntoBigSmall(pslValue) {
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

  static splitStringIntoChunks(s, numChunks) {
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
    // eslint-disable-next-line no-plusplus
    return Utils.nextToAddrID++
  }

  static getDefaultFee(height) {
    if (height >= 1080000) {
      return 0.00001
    } else {
      return 0.0001
    }
  }

  static getDonationAddress(testnet) {
    if (testnet) {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7'
    } else {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7'
    }
  }

  static getDefaultDonationAmount(testnet) {
    return 0.1
  }

  static getDefaultDonationMemo(testnet) {
    return 'Thanks for supporting Pastelwallet!'
  }

  static getPslToUsdString(price, pslValue) {
    if (!price || !pslValue) {
      return 'USD --'
    }

    return `USD ${(price * pslValue).toFixed(2)}`
  }
}
