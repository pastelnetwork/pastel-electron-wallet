import { useAppSelector } from '../../redux/hooks'

export const useCurrencyName = (): string => {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)

  return currencyName
}

export const useCurrencyPrice = (): number | undefined => {
  const {
    info: { pslPrice },
  } = useAppSelector(state => state.appInfo)

  return pslPrice
}
