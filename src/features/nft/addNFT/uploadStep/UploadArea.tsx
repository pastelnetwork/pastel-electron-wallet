import React, { ChangeEvent, useEffect, useState } from 'react'
import { UploadFile } from 'common/components/Icons'
import { TImageFile } from './UploadStep'
import {
  allowedTypeNames,
  allowedMimeTypes,
  minImageWidth,
  minImageHeight,
} from '../AddNft.constants'

type TProps = {
  setFile(file: TImageFile): void
}

export default function UploadArea({ setFile }: TProps): JSX.Element {
  const [error, setError] = useState<string>()

  const selectFile = (file?: File) => {
    if (!file) {
      return
    }

    if (!allowedMimeTypes.includes(file.type)) {
      return setError(`Selected file has unsupported format: ${file.type}`)
    }

    const megabyte = 1048576

    if (file.size > 100 * megabyte) {
      return setError(
        `Selected file exceeds 100 MB limit: ${(file.size / megabyte).toFixed(
          1,
        )} MB`,
      )
    }

    const image = new Image()
    const url = URL.createObjectURL(file)
    image.src = url
    image.onload = () => {
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

      setFile({
        file,
        url,
        width,
        height,
      })
    }

    image.onerror = () => {
      setError('Invalid image file was supplied')
    }
  }

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) =>
    selectFile(e.target.files?.[0])

  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      selectFile(e.dataTransfer?.files[0])
    }
    const preventDefault = (e: DragEvent) => e.preventDefault()

    document.addEventListener('drop', onDrop)
    document.addEventListener('dragover', preventDefault)
    document.addEventListener('dragend', preventDefault)
    document.addEventListener('dragleave', preventDefault)

    return () => {
      document.removeEventListener('drop', onDrop)
      document.removeEventListener('dragover', preventDefault)
      document.removeEventListener('dragend', preventDefault)
      document.removeEventListener('dragleave', preventDefault)
    }
  }, [])

  return (
    <label className='bg-gray-f4 rounded-md h-full flex-center flex-col text-gray-77 text-xs'>
      <UploadFile size={22} className='mb-3' />
      <div className='mb-2'>{allowedTypeNames.join(', ')} Max 100 MB.</div>
      <div className='text-gray-a0'>Drag or choose your file to upload</div>
      {error && (
        <div className='text-error font-medium mt-2 text-md'>{error}</div>
      )}
      <input type='file' hidden onChange={onChangeFile} />
    </label>
  )
}
