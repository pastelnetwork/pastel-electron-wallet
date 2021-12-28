import React, { useCallback, useEffect, useRef, useState } from 'react'
import Cropper from 'cropperjs'
import { Image as ImageJS } from 'image-js'

import 'cropperjs/dist/cropper.min.css'
import { TCroppedImage, getCroppedImage } from './PreviewStep.service'
import { Button } from 'common/components/Buttons'
import { TImage, TAddNFTState } from '../AddNFT.state'
import { ImageType } from '../AddNft.constants'
import { loadImageElement } from 'common/utils/image'
import { useSelectImageService } from '../selectImageStep/SelectImageStep.service'

type TCropperModalProps = {
  image: TImage
  croppedImage: TCroppedImage
  setCroppedImage(croppedImage: TCroppedImage): void
  onClose(): void
  state: TAddNFTState
}

const paddingX = 100
const paddingY = 200

const minSizeFraction = 0.25

export default function Cropping({
  image,
  croppedImage,
  setCroppedImage,
  onClose,
  state,
}: TCropperModalProps): JSX.Element {
  const service = useSelectImageService(state)
  const imageRef = useRef<HTMLImageElement>(null)
  const cropperRef = useRef<Cropper>()
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const img = imageRef.current
    if (!img) {
      return
    }

    cropperRef.current?.destroy()

    const maxWidth = document.body.offsetWidth - paddingX
    img.style.maxWidth = `${maxWidth}px`

    const maxHeight = document.body.offsetHeight - paddingY
    img.style.maxHeight = `${maxHeight}px`

    const minSize =
      Math.max(img.offsetWidth, img.offsetHeight) * minSizeFraction

    const cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      autoCrop: true,
      zoomable: false,
      minCropBoxWidth: minSize,
      minCropBoxHeight: minSize,
      ready() {
        cropper.setData(croppedImage.crop)
      },
    })

    cropperRef.current = cropper

    return () => {
      cropperRef.current?.destroy()
    }
  }, [])

  const submit = useCallback(async () => {
    const cropper = cropperRef.current
    if (!cropper) {
      return
    }
    setLoading(true)
    const img = await loadImageElement(image.url)
    const crop = cropper.getData()
    const croppedImage = getCroppedImage(img, crop)
    setCroppedImage(getCroppedImage(img, crop))
    state.setImageCrop(true)

    const dataURLtoFile = (dataUrl: string, filename: string) => {
      const arr = dataUrl.split(',')
      const mime = arr[0]?.match(/:(.*?);/)
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime ? mime[1] : '' })
    }
    const fileData = dataURLtoFile(croppedImage.src, image.name)
    service.selectFile({
      ...fileData,
      path: croppedImage.src,
    })
    const loadImage = await ImageJS.load(image.url)
    const cropImage = loadImage.crop({
      height: crop.height,
      width: crop.width,
      x: crop.x,
      y: crop.y,
    })
    const imageType: ImageType =
      ImageType.PNG === fileData.type ? ImageType.PNG : ImageType.JPG
    state.setImage({
      type: imageType,
      name: fileData.name,
      size: cropImage.size,
      url: cropImage.toDataURL(),
      width: cropImage.width,
      height: cropImage.height,
      maxWidth: image.maxWidth,
    })
    const arrayBuffer = await (await cropImage.toBlob()).arrayBuffer()
    state.optimizationService.optimizeImage(imageType, arrayBuffer)
    onClose()
  }, [])

  return (
    <div className='bg-white rounded-md p-5 text-center'>
      <div className='flex-center'>
        <img ref={imageRef} src={image.url} alt='Pastel Network' />
      </div>
      <div className='flex relative z-10 space-x-5 pt-5 mx-auto min-w-xs'>
        <Button
          secondary
          className='w-1/2'
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button className='w-1/2' onClick={submit} disabled={isLoading}>
          {isLoading ? 'Cropping' : 'Accept'}
        </Button>
      </div>
    </div>
  )
}
