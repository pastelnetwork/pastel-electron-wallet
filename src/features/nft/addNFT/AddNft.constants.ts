import { TImageOrientation } from './AddNFT.state'

export const imageTypes = {
  PNG: 'image/png',
  JPG: 'image/jpeg',
}

export const allowedTypeNames = Object.keys(imageTypes)
export const allowedMimeTypes = Object.values(imageTypes)
export const minImageWidth = 250
export const minImageHeight = 250

export const copiesAmountToShowWarning = 100

export const titleMinLength = 10
export const copiesMin = 1
export const copiesMax = 1000
export const royaltyMin = 0.1
export const royaltyMax = 20

export const minQuality = 60
export const maxQuality = 85
export const qualityStep = 5

export const maxWidthByOrientation: Record<TImageOrientation, number> = {
  portrait: 320,
  landscape: 463,
}
