import { maxWidthByOrientation } from '../AddNft.constants'
import { TAddNFTState } from '../AddNFT.state'
import { TImageFile } from './UploadStep'
import { OptimizationStatus } from '../imageOptimization/imageOptimization.state'
import { toast } from 'react-toastify'
import { invokeMainTask } from '../../../app/rendererEvents'

export const useSubmit = (
  state: TAddNFTState,
  imageFile?: TImageFile,
): (() => void) => {
  return () => {
    if (imageFile) {
      const { url, width, height, file } = imageFile
      const orientation = width < height ? 'portrait' : 'landscape'
      state.setImage({
        url,
        width,
        height,
        maxWidth: maxWidthByOrientation[orientation],
        file,
      })

      optimizeImage(state, file)
    }

    state.goToNextStep()
  }
}

const optimizeImage = async (state: TAddNFTState, file: File) => {
  state.optimizationState.setStatus(OptimizationStatus.processing)
  state.optimizationState.setFiles()
  state.optimizationState.setSelectedFile()

  try {
    const result = await invokeMainTask('optimizeImage', {
      path: file.path,
      type: file.type,
    })

    if (result.status === 'cancelled') {
      return
    }

    state.optimizationState.setFiles(result.files)
    state.optimizationState.setStatus(OptimizationStatus.ready)
  } catch (error) {
    state.optimizationState.setStatus(OptimizationStatus.failed)
    console.error(error)
    toast.error('Error optimizing image')
  }
}
