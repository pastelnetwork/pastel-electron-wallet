import { useAppSelector } from '../../redux/hooks'

export const useCurrencyName = (): string => {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)

  return currencyName
}
