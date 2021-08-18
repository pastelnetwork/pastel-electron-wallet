import { TAddNFTState } from '../AddNFT.state'
import { TImageFile } from './SelectImageStep'
import { useState } from 'react'
import log from 'electron-log'
import { Image as ImageJS } from 'image-js'
import {
  maxWidthByOrientation,
  minImageHeight,
  minImageWidth,
} from '../AddNft.constants'

export type TSelectImageStepService = {
  imageFile?: TImageFile
  error?: string
  isProcessing?: boolean
  selectFile(file?: File): Promise<void>
  submit(): void
}

export const useSelectImageService = (
  state: TAddNFTState,
): TSelectImageStepService => {
  const [imageFile, setFile] = useState<TImageFile>()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>()

  return {
    imageFile,
    error,
    isProcessing,
    async selectFile(file) {
      if (!file) {
        return
      }

      const { type } = file
      if (type !== 'image/png' && type !== 'image/jpeg') {
        return setError(`Selected file has unsupported format: ${type}`)
      }

      const megabyte = 1048576

      if (file.size > 100 * megabyte) {
        return setError(
          `Selected file exceeds 100 MB limit: ${(file.size / megabyte).toFixed(
            1,
          )} MB`,
        )
      }

      setError(undefined)
      setIsProcessing(true)

      const url = URL.createObjectURL(file)

      try {
        const image = await ImageJS.load(url)
        const { width, height } = image

        if (width < minImageWidth) {
          return setError(
            `Image width should not be less than ${minImageWidth}px, got ${width}px`,
          )
        }
        if (height < minImageHeight) {
          return setError(
            `Image height should not be less than ${minImageHeight}px, got ${height}px`,
          )
        }

        const blob = await image.toBlob(type, 1)
        const arrayBuffer = await blob.arrayBuffer()
        const orientation = width < height ? 'portrait' : 'landscape'

        setFile({
          type,
          name: file.name,
          size: image.size,
          url: URL.createObjectURL(blob),
          arrayBuffer,
          width,
          height,
          maxWidth: maxWidthByOrientation[orientation],
        })
      } catch (error) {
        log.error('Error while loading image', error.message)
        setError('Can not process selected file, it is possibly corrupted')
      } finally {
        setIsProcessing(false)
      }
    },
    submit() {
      if (imageFile) {
        const { arrayBuffer, ...image } = imageFile
        state.setImage(image)
        state.optimizationService.optimizeImage(image.type, arrayBuffer)
      }

      state.goToNextStep()
    },
  }
}
