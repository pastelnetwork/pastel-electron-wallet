import { useState } from 'react'
import { TOptimizedFile } from './ImageOptimization.types'

export enum OptimizationStatus {
  initial = 'initial',
  processing = 'processing',
  ready = 'ready',
  failed = 'failed',
}

export type ToptimizedFileWithIndex = TOptimizedFile & { index: number }

export type TImageOptimizationState = {
  status: OptimizationStatus
  setStatus(status: OptimizationStatus): void
  files?: TOptimizedFile[]
  setFiles(files?: TOptimizedFile[]): void
  selectedFile?: ToptimizedFileWithIndex
  setSelectedFile(file?: ToptimizedFileWithIndex): void
}

export const useImageOptimizationState = (): TImageOptimizationState => {
  const [status, setStatus] = useState<OptimizationStatus>(
    OptimizationStatus.initial,
  )
  const [files, setFiles] = useState<TOptimizedFile[]>()
  const [selectedFile, setSelectedFile] = useState<ToptimizedFileWithIndex>()

  return {
    status,
    setStatus,
    files,
    setFiles,
    selectedFile,
    setSelectedFile,
  }
}
