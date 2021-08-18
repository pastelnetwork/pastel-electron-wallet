import { readFileAsArrayBuffer } from './file'

export const loadImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onerror = () => reject(new Error('Image loading error'))
    img.onload = () => resolve(img)
  })

// Logic taken from https://github.com/mailcharts/animated-gif-detector/blob/master/index.js
// rewritten for browser use with ArrayBuffer, above lib is for node.js with Buffer, and optimized
const BLOCK_TERMINATOR = 0
const EXTENSION_INTRODUCER = 33
const GRAPHIC_CONTROL_LABEL = 249
export const isGifAnimated = async (file: File): Promise<boolean> => {
  const arrayBuffer = await readFileAsArrayBuffer(file)

  let count = 0
  const buffer = new Uint8Array(arrayBuffer)

  for (let i = 2; i < buffer.length; i++) {
    if (
      buffer[i - 2] === BLOCK_TERMINATOR &&
      buffer[i - 1] === EXTENSION_INTRODUCER &&
      buffer[i] === GRAPHIC_CONTROL_LABEL
    ) {
      count++
    }

    if (count > 1) {
      return true
    }
  }

  return false
}
