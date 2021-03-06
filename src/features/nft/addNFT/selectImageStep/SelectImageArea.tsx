import React, { ChangeEvent, ReactNode, useCallback, useEffect } from 'react'
import { TSelectImageStepService } from './SelectImageStep.service'

type TProps = {
  service: TSelectImageStepService
  children: ReactNode
}

export default function SelectImageArea({
  service,
  children,
}: TProps): JSX.Element {
  const onChangeFile = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      service
        .selectFile(e.target.files?.[0])
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    },
    [service],
  )

  useEffect(() => {
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      service
        .selectFile(e.dataTransfer?.files[0])
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
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
    <label>
      {children}
      <input type='file' hidden onChange={onChangeFile} />
    </label>
  )
}
