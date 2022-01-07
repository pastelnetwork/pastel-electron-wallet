import fs from 'fs'

import { Step, TNFTData, TCrop, TImage } from './AddNFT.state'
import { TOptimizedFileWithIndex } from './imageOptimization/ImageOptimization.service'

type TFile = {
  fileUrl: string
  quality: number
  size: number
}
export type TAddNFTState = {
  step: Step
  nftData?: TNFTData
  crop?: TCrop
  isImageCrop: boolean
  image?: TImage
  isLossLess: boolean
  estimatedFee?: number
  thumbnail: string
  percentage: number
  fileUploaded?: string
  files?: TFile[]
  selectedFile?: TOptimizedFileWithIndex
}

const initialState: TAddNFTState = {
  step: 0,
  nftData: undefined,
  crop: undefined,
  isImageCrop: false,
  image: undefined,
  isLossLess: true,
  estimatedFee: undefined,
  thumbnail: '',
  percentage: 0,
  fileUploaded: undefined,
  files: undefined,
  selectedFile: undefined,
}

const storeName = 'nftDataStore'

export const saveNFTDataStore = (data: TAddNFTState): void => {
  localStorage.setItem(storeName, JSON.stringify(data))
}

export const setFilesOptimization = (files: TFile[]): void => {
  const nftDataStore = localStorage.getItem(storeName)
  if (nftDataStore) {
    localStorage.setItem(
      storeName,
      JSON.stringify({
        ...JSON.parse(nftDataStore),
        files,
      }),
    )
  }
}

export const setSelectedFile = (file?: TOptimizedFileWithIndex): void => {
  const nftDataStore = localStorage.getItem(storeName)
  if (nftDataStore) {
    localStorage.setItem(
      storeName,
      JSON.stringify({
        ...JSON.parse(nftDataStore),
        selectedFile: file,
      }),
    )
  }
}

export const setFileUploaded = (url: string): void => {
  const nftDataStore = localStorage.getItem(storeName)
  if (nftDataStore) {
    localStorage.setItem(
      storeName,
      JSON.stringify({
        ...JSON.parse(nftDataStore),
        fileUploaded: url,
      }),
    )
  }
}

export const getNFTDataStore = (): TAddNFTState => {
  const nftDataStore = localStorage.getItem(storeName)
  if (nftDataStore) {
    return JSON.parse(nftDataStore)
  }

  return initialState
}

export const removeNFTData = (): void => {
  const nftDataStore = getNFTDataStore()
  localStorage.removeItem(storeName)
  if (nftDataStore.fileUploaded) {
    if (fs.existsSync(nftDataStore.fileUploaded)) {
      fs.promises.unlink(nftDataStore.fileUploaded)
    }
  }
}
