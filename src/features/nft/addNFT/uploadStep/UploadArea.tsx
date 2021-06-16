import React, { ChangeEvent, useEffect, useState } from 'react'
import { UploadFile } from 'common/components/Icons'

const imageTypes = {
  PNG: 'image/png',
  JPG: 'image/jpeg',
  GIF: 'image/gif',
}

const allowedTypeNames = Object.keys(imageTypes)
const allowedMimeTypes = Object.values(imageTypes)

type TProps = {
  setFile(file: File): void
}

export default function UploadArea({ setFile }: TProps): JSX.Element {
  const [error, setError] = useState<string>()

  const selectFile = (file?: File) => {
    if (!file) {
      return
    }
    if (allowedMimeTypes.includes(file.type)) {
      setFile(file)
    } else {
      setError(`Selected file has unsupported format: ${file.type}`)
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
      <div className='mb-2'>{allowedTypeNames.join(', ')} Max 100Mb.</div>
      <div className='text-gray-a0'>Drag or choose your file to upload</div>
      {error && (
        <div className='text-error font-medium mt-2 text-md'>{error}</div>
      )}
      <input type='file' hidden onChange={onChangeFile} />
    </label>
  )
}
