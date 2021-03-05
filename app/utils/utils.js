/* eslint-disable no-unused-vars */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
export const NO_CONNECTION: string = 'Could not connect to pasteld';

export default class Utils {
  static isSapling(addr: string): boolean {
    if (!addr) return false;
    return new RegExp('^ps[a-z0-9]{76}$').test(addr) || new RegExp('^ztestsapling[a-z0-9]{76}$').test(addr);
  }

  static isSprout(addr: string): boolean {
    if (!addr) return false;
    return new RegExp('^ps[a-zA-Z0-9]{93}$').test(addr);
  }

  static isZaddr(addr: string): boolean {
    if (!addr) return false;
    return Utils.isSapling(addr) || Utils.isSprout(addr);
  }

  static isTransparent(addr: string): boolean {
    if (!addr) return false;
    return new RegExp('^P[a-zA-Z0-9]{34}$').test(addr);
  }

  static isValidSaplingPrivateKey(key: string): boolean {
    return (
      new RegExp('^p-secret-extended-key-test[0-9a-z]{278}$').test(key) ||
      new RegExp('^p-secret-extended-key-main[0-9a-z]{278}$').test(key)
    );
  }

  // Convert to max 5 decimal places, and remove trailing zeros
  static maxPrecision(v: number): string {
    if (!v) return v;

    if (typeof v === 'string' || v instanceof String) {
      // eslint-disable-next-line no-param-reassign
      v = parseFloat(v);
    }

    return v.toFixed(5);
  }

  static maxPrecisionTrimmed(v: number): string {
    let s = Utils.maxPrecision(v);
    if (!s) {
      return s;
    }

    while (s.indexOf('.') >= 0 && s.substr(s.length - 1, 1) === '0') {
      s = s.substr(0, s.length - 1);
    }

    if (s.substr(s.length - 1) === '.') {
      s = s.substr(0, s.length - 1);
    }

    return s;
  }

  static splitZecAmountIntoBigSmall(pslValue: number) {
    if (!pslValue) {
      return { bigPart: pslValue, smallPart: '' };
    }

    let bigPart = Utils.maxPrecision(pslValue);
    let smallPart = '';

    if (bigPart.indexOf('.') >= 0) {
      const decimalPart = bigPart.substr(bigPart.indexOf('.') + 1);
      if (decimalPart.length > 4) {
        smallPart = decimalPart.substr(4);
        bigPart = bigPart.substr(0, bigPart.length - smallPart.length);

        // Pad the small part with trailing 0s
        while (smallPart.length < 4) {
          smallPart += '0';
        }
      }
    }

    if (smallPart === '0000') {
      smallPart = '';
    }

    return { bigPart, smallPart };
  }

  static splitStringIntoChunks(s: string, numChunks: number) {
    if (numChunks > s.length) return [s];
    if (s.length < 16) return [s];

    const chunkSize = Math.round(s.length / numChunks);
    const chunks = [];
    for (let i = 0; i < numChunks - 1; i++) {
      chunks.push(s.substr(i * chunkSize, chunkSize));
    }
    // Last chunk might contain un-even length
    chunks.push(s.substr((numChunks - 1) * chunkSize));

    return chunks;
  }

  static nextToAddrID: number = 0;

  static getNextToAddrID(): number {
    // eslint-disable-next-line no-plusplus
    return Utils.nextToAddrID++;
  }

  static getDefaultFee(height: number): number {
    if (height >= 1080000) {
      return 0.00001;
    } else {
      return 0.0001;
    }
  }

  static getDonationAddress(testnet: boolean): string {
    if (testnet) {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7';
    } else {
      return 'ps100222ztwt66hdjrl878y0ar2pvrhs26kyalppjvnwa7rdp9p8l7h8jgq3unawrv4l5mv758f2w7';
    }
  }

  static getDefaultDonationAmount(testnet: boolean): number {
    return 0.1;
  }

  static getDefaultDonationMemo(testnet: boolean): string {
    return 'Thanks for supporting Pastelwallet!';
  }

  static getZecToUsdString(price: number | null, pslValue: number | null): string {
    if (!price || !pslValue) {
      return 'USD --';
    }

    return `USD ${(price * pslValue).toFixed(2)}`;
  }
}
