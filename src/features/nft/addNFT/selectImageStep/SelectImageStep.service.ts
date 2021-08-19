import { TAddNFTState } from '../AddNFT.state'
import { TImageFile } from './SelectImageStep'
import { useState } from 'react'
import log from 'electron-log'
import { Image as ImageJS } from 'image-js'
import {
  ConvertableImageType,
  ImageType,
  maxWidthByOrientation,
  minImageHeight,
  minImageWidth,
  TImageType,
} from '../AddNft.constants'
import { isGifAnimated, loadImageElement } from 'common/utils/image'
import { Size } from 'common/utils/file'

export type TSelectImageStepService = {
  selectedFile?: File
  imageFile?: TImageFile
  error?: string
  isProcessing: boolean
  isAnimated: boolean
  imageToConvert?: TImageToConvert
  imageForPreview?: { url: string; maxWidth: number; size: number }
  selectFile(file?: File): Promise<void>
  convertImage(data: TImageToConvert, type: TImageType): Promise<void>
  submit(): void
}

type TImageToConvert = { name: string; image: HTMLImageElement }

export const useSelectImageService = (
  state: TAddNFTState,
): TSelectImageStepService => {
  const [imageFile, setFile] = useState<TImageFile>()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>()
  const [imageToConvert, setImageToConvert] = useState<TImageToConvert>()
  const [selectedFile, setSelectedFile] = useState<File>()
  const [isAnimated, setIsAnimated] = useState(false)

  const resetImageState = () => {
    setFile(undefined)
    setImageToConvert(undefined)
    setIsAnimated(false)
    setError(undefined)
    setIsProcessing(false)
  }

  return {
    imageForPreview: imageFile || state.image,
    selectedFile,
    imageFile,
    error,
    isProcessing,
    imageToConvert,
    isAnimated,
    async selectFile(file) {
      if (!file) {
        return
      }

      setSelectedFile(file)
      resetImageState()

      const { type } = file
      if (
        type === ConvertableImageType.gif ||
        type === ConvertableImageType.bmp
      ) {
        try {
          const url = URL.createObjectURL(file)
          const image = await loadImageElement(url)

          checkImageSize(image)

          if (type === ConvertableImageType.gif) {
            setIsAnimated(await isGifAnimated(file))
          }

          setImageToConvert({ name: file.name, image })
        } catch (error) {
          setError(error.message)
        }
        return
      }

      if (type !== ImageType.PNG && type !== ImageType.JPG) {
        return setError(`Selected file has unsupported format: ${type}`)
      }

      try {
        checkFileSize(file.size)
        setIsProcessing(true)

        const url = URL.createObjectURL(file)
        setFile(await processImage({ name: file.name, type, url }))
      } catch (error) {
        setError(error.message)
      } finally {
        setIsProcessing(false)
      }
    },
    async convertImage({ name, image }, type) {
      resetImageState()
      setIsProcessing(true)

      try {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.drawImage(image, 0, 0)

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            blob => {
              blob ? resolve(blob) : reject(new Error('Can not convert image'))
            },
            type,
            1,
          )
        })

        const url = URL.createObjectURL(blob)
        setFile(await processImage({ name, type, url }))
      } catch (error) {
        setError(error.message)
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

const checkFileSize = (size: number) => {
  if (size > 100 * Size.MB) {
    throw new Error(
      `Selected file exceeds 100 MB limit: ${(size / Size.MB).toFixed(1)} MB`,
    )
  }
}

const checkImageSize = ({
  width,
  height,
}: {
  width: number
  height: number
}) => {
  if (width < minImageWidth) {
    throw new Error(
      `Image width should not be less than ${minImageWidth}px, got ${width}px`,
    )
  }
  if (height < minImageHeight) {
    throw new Error(
      `Image height should not be less than ${minImageHeight}px, got ${height}px`,
    )
  }
}

const processingErrorMessage =
  'Can not process selected file, it is possibly corrupted'

// We need to load image using image-js to check if image file is corrupted
// In case of corrupted image it will throw error, while standard image's onerror are not triggered
const processImage = async ({
  name,
  type,
  url,
}: {
  name: string
  type: TImageType
  url: string
}): Promise<TImageFile> => {
  let image
  try {
    image = await ImageJS.load(url)
  } catch (error) {
    log.error('Image loading error', error.message)
    throw new Error(processingErrorMessage)
  }

  checkImageSize(image)

  let blob
  let arrayBuffer
  try {
    blob = await image.toBlob(type, 1)
    arrayBuffer = await blob.arrayBuffer()
  } catch (error) {
    log.error('Image converting to ArrayBuffer error', error.message)
    throw new Error(processingErrorMessage)
  }

  const { width, height } = image
  const orientation = width < height ? 'portrait' : 'landscape'

  return {
    type,
    name,
    size: image.size,
    url: URL.createObjectURL(blob),
    arrayBuffer,
    width,
    height,
    maxWidth: maxWidthByOrientation[orientation],
  }
}
