import {
  OptimizationStatus,
  TImageOptimizationState,
} from './imageOptimization.state'
import { ipcRenderer } from 'electron'
import { toast } from 'react-toastify'

export const optimizeImage = async (
  state: TImageOptimizationState,
  file: File,
): Promise<void> => {
  state.setStatus(OptimizationStatus.processing)
  state.setFiles()
  state.setSelectedFile()

  try {
    const result = await ipcRenderer.invoke('optimizeImage', {
      path: file.path,
      type: file.type,
    })

    if (result.status === 'cancelled') {
      return
    }

    state.setFiles(result.files)
    state.setStatus(OptimizationStatus.ready)
  } catch (error) {
    state.setStatus(OptimizationStatus.failed)
    console.error(error)
    toast.error('Error optimizing image')
  }
}
