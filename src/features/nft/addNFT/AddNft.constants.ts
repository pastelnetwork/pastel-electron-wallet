import { TImageOrientation } from './AddNFT.state'

export enum ImageType {
  PNG = 'image/png',
  JPG = 'image/jpeg',
}

export type TImageType = 'image/png' | 'image/jpeg'

export enum ConvertableImageType {
  gif = 'image/gif',
  bmp = 'image/bmp',
}

export const allowedTypeNames = Object.keys(ImageType)
export const allowedMimeTypes = Object.values(ImageType)
export const minImageWidth = 1
export const minImageHeight = 1

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
