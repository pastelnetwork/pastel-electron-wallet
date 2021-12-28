import React, { useCallback, useEffect, useRef, useState } from 'react'
import Cropper from 'cropperjs'

import 'cropperjs/dist/cropper.min.css'
import { TCroppedImage, getCroppedImage } from './PreviewStep.service'
import { Button } from 'common/components/Buttons'
import { TImage, TAddNFTState } from '../AddNFT.state'
import { loadImageElement } from 'common/utils/image'

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
    setCroppedImage(croppedImage)
    state.setImageCrop(true)
    state.setCrop(crop)
    state.setThumbnail(croppedImage.src)
    onClose()
  }, [])

  const handleOnClose = useCallback(() => {
    state.setImageCrop(false)
    state.setThumbnail('')
    onClose()
  }, [state])

  return (
    <div className='bg-white rounded-md p-5 text-center'>
      <div className='flex-center'>
        <img ref={imageRef} src={image.url} alt='Pastel Network' />
      </div>
      <div className='flex relative z-10 space-x-5 pt-5 mx-auto min-w-xs'>
        <Button
          secondary
          className='w-1/2'
          onClick={handleOnClose}
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
