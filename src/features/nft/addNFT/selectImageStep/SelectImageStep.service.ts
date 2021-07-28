import { maxWidthByOrientation } from '../AddNft.constants'
import { TAddNFTState } from '../AddNFT.state'
import { TImageFile } from './SelectImageStep'
import { processNSFW } from '../NSFW/NSFW.service'
import { optimizeImage } from '../imageOptimization/ImageOptimization.service'

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

      optimizeImage(state.optimizationState, file)
      processNSFW(state.nsfwState, url)
    }

    state.goToNextStep()
  }
}
