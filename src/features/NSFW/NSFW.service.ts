import { useLocalStorage } from 'react-use'

const defaultDisplay = false
const defaultProbability = 85

export const useDisplayNSWF = (): [boolean, () => void] => {
  const [value = defaultDisplay, set, remove] = useLocalStorage<boolean>(
    'displayNSWF',
  )

  const toggle = () => {
    if (value) {
      remove()
    } else {
      set(true)
    }
  }

  return [value, toggle]
}

export const useNSFWPornProbability = (): [number, (value: number) => void] => {
  const [value = defaultProbability, set] = useLocalStorage<number>(
    'NSFWPornProbability',
  )
  return [value, set]
}

export const useNSFWHentaiProbability = (): [
  number,
  (value: number) => void,
] => {
  const [value = defaultProbability, set] = useLocalStorage<number>(
    'NSFWHentaiProbability',
  )
  return [value, set]
}

export const useIsNSFW = ({
  hentai,
  porn,
}: {
  hentai: number
  porn: number
}): boolean => {
  const [displayNSFW] = useDisplayNSWF()
  const [hentaiProbability] = useNSFWHentaiProbability()
  const [pornProbability] = useNSFWPornProbability()

  return displayNSFW
    ? false
    : hentai >= hentaiProbability || porn >= pornProbability
}
