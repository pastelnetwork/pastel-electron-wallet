import { useState } from 'react'
import { ipcRenderer } from 'electron'
import log from 'electron-log'
import { toast } from 'react-toastify'

import { TOptimizedFile } from './ImageOptimization.types'
import { TImageType } from '../AddNft.constants'
import { translate } from 'features/app/translations'

export enum OptimizationStatus {
  initial = 'initial',
  processing = 'processing',
  ready = 'ready',
  failed = 'failed',
}

export type TOptimizedFileWithIndex = TOptimizedFile & { index: number }

export type TImageOptimizationService = {
  status: OptimizationStatus
  files?: TOptimizedFile[]
  selectedFile?: TOptimizedFileWithIndex
  setSelectedFile(file?: TOptimizedFileWithIndex): void
  optimizeImage(type: TImageType, arrayBuffer: ArrayBuffer): Promise<void>
  setFiles(files?: TOptimizedFile[]): void
}

export const useImageOptimizationService = (): TImageOptimizationService => {
  const [status, setStatus] = useState<OptimizationStatus>(
    OptimizationStatus.initial,
  )
  const [files, setFiles] = useState<TOptimizedFile[]>()
  const [selectedFile, setSelectedFile] = useState<TOptimizedFileWithIndex>()

  return {
    status,
    files,
    selectedFile,
    setSelectedFile,
    setFiles,
    optimizeImage: async (type: TImageType, arrayBuffer: ArrayBuffer) => {
      setStatus(OptimizationStatus.processing)
      setFiles(undefined)
      setSelectedFile(undefined)

      try {
        const result = await ipcRenderer.invoke('optimizeImage', {
          arrayBuffer,
          type,
        })

        if (result.status === 'cancelled') {
          return
        }

        setFiles(result.files)
        setStatus(OptimizationStatus.ready)
      } catch (error) {
        setStatus(OptimizationStatus.failed)
        log.error('Error optimizing image', error)
        toast.error(translate('errorOptimizingImage'))
      }
    },
  }
}
