import smartcrop from 'smartcrop'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Crop } from '../AddNFT.state'

const previewSize = 320

export type CroppedImage = {
  src: string
  crop: Crop
  ctx: CanvasRenderingContext2D
}

export type CroppedValidatedImage = CroppedImage & {
  error?: string
}

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onerror = reject
    img.onload = () => resolve(img)
  })

export const getCroppedImage = (
  img: HTMLImageElement,
  crop: Crop,
): CroppedImage => {
  const canvas = document.createElement('canvas')
  canvas.width = Math.min(crop.width, previewSize)
  canvas.height = Math.min(crop.height, previewSize)

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  ctx.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  return {
    src: canvas.toDataURL('image/png'),
    crop,
    ctx,
  }
}

const getSmartCroppedImage = async (src: string): Promise<CroppedImage> => {
  const img = await loadImage(src)
  const result = await smartcrop.crop(img, {
    width: previewSize,
    height: previewSize,
    ruleOfThirds: true,
  })

  return getCroppedImage(img, result.topCrop)
}

const hasDifferentPixels = (ctx: CanvasRenderingContext2D) => {
  // data is a flat array of RGBA integer values
  const { data } = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)

  // get first pixel values, alpha value is ignored
  const r = data[0]
  const g = data[1]
  const b = data[2]
  for (let i = 4, length = data.length; i < length; i += 4) {
    if (r !== data[i] || g !== data[i + 1] || b !== data[i + 2]) {
      return true
    }
  }

  return false
}

export const useImagePreview = ({
  image,
}: {
  image: string
}): [
  CroppedValidatedImage | undefined,
  (image: CroppedValidatedImage) => void,
] => {
  const [croppedImage, setCroppedImage] = useState<CroppedValidatedImage>()

  const updateCroppedImage = (croppedImage: CroppedImage) => {
    setCroppedImage({
      ...croppedImage,
      error: hasDifferentPixels(croppedImage.ctx)
        ? undefined
        : 'Please select more colorful image region',
    })
  }

  useEffect(() => {
    getSmartCroppedImage(image)
      .then(updateCroppedImage)
      .catch(error => toast(error.message, { type: 'error' }))
  }, [image])

  return [croppedImage, updateCroppedImage]
}

export const useChangeableImage = (
  providedImage: string,
): {
  image: string
  onImageChange(e: ChangeEvent<HTMLInputElement>): void
} => {
  const [image, setImage] = useState(providedImage)

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files
    if (!files) {
      return
    }
    const file = files[0]
    setImage(URL.createObjectURL(file))
  }

  return { image, onImageChange }
}
