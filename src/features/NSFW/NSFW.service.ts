import * as nsfw from 'nsfwjs'
import { toast } from 'react-toastify'
import { MODEL_PATH, NSWFProbabilityThreshold } from './NSFW.constants'
import { useLocalStorage } from 'react-use'
import { useEffect, useState } from 'react'

export const useDisplayNSWF = (): [boolean, () => void] => {
  const [value, set, remove] = useLocalStorage<boolean>('displayNSWF')

  const toggle = () => {
    if (value) {
      remove()
    } else {
      set(true)
    }
  }

  return [value || false, toggle]
}

export enum NSWFProcessingStatus {
  processing = 'processing',
  ready = 'ready',
}

export const useIsImageNSWF = (
  src: string,
): [boolean, NSWFProcessingStatus, Error | undefined] => {
  const [isNSWF, setNSFW] = useState(true)
  const [status, setStatus] = useState(NSWFProcessingStatus.ready)
  const [error, setError] = useState<Error>()
  const [displayNSFW] = useDisplayNSWF()

  const process = async () => {
    try {
      const model = await nsfw.load(MODEL_PATH, { size: 299 })
      const image = await loadImageElement(src)
      const predictions = await model.classify(image)

      const porn = predictions.find(item => item.className === 'Porn')
      const hentai = predictions.find(item => item.className === 'Hentai')

      const isNSWF =
        (porn && porn.probability >= NSWFProbabilityThreshold) ||
        (hentai && hentai.probability >= NSWFProbabilityThreshold) ||
        false

      setNSFW(isNSWF)
    } catch (error) {
      setError(error)
      toast.error(error.message)
    } finally {
      setStatus(NSWFProcessingStatus.ready)
    }
  }

  useEffect(() => {
    if (!displayNSFW) {
      process()
    }
  }, [src, displayNSFW])

  return [displayNSFW ? false : isNSWF, status, error]
}

const loadImageElement = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement('img')
    image.src = src
    image.onload = () => {
      resolve(image)
    }
    image.onerror = reject
  })
}
