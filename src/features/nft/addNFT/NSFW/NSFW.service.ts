import * as nsfw from 'nsfwjs'
import { NSWFStatus, TNSFWState } from './NSFW.state'
import { toast } from 'react-toastify'
import { MODEL_PATH } from './NSFW.constants'

export const processNSFW = async (
  state: TNSFWState,
  url: string,
): Promise<void> => {
  state.setStatus(NSWFStatus.processing)

  try {
    const model = await nsfw.load(MODEL_PATH, { size: 299 })
    const image = document.createElement('img')
    image.src = url
    const predictions = await model.classify(image)
    const highestPrediction = predictions.sort(
      (a, b) => b.probability - a.probability,
    )[0]

    const isSafe =
      highestPrediction.className === 'Drawing' ||
      highestPrediction.className === 'Neutral'

    state.setIsSafe(isSafe)
    state.setStatus(NSWFStatus.ready)
  } catch (error) {
    toast.error(error.message)
    state.setStatus(NSWFStatus.failed)
  }
}
