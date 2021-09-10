import { walletNodeApiURL } from '../../common/constants/urls'

type TOptions = {
  data?: Record<string, unknown>
  removeEmpty?: boolean
  removeNullStrings?: boolean
}

const makeRequest = async <T>(
  method: string,
  path: string,
  { data, removeEmpty, removeNullStrings }: TOptions = {},
): Promise<T> => {
  const fetchOptions: RequestInit = {
    method,
  }

  if (data) {
    const formData = new FormData()
    for (const key in data) {
      const value = data[key]
      if (value !== undefined) {
        formData.append(key, String(value))
      }
    }
    fetchOptions.body = formData
  }

  const response = await fetch(walletNodeApiURL + path, fetchOptions)
  const result = await response.json()

  if (removeEmpty || removeNullStrings) {
    const filtered: typeof result = {}
    for (const key in result) {
      const value = result[key]
      if (
        typeof value !== 'string' ||
        ((!removeEmpty || value.length) &&
          (!removeNullStrings || value !== 'NULL'))
      ) {
        filtered[key] = value
      }
    }
    return filtered
  }

  return result
}

export const request = {
  get: <T>(path: string, options?: TOptions): Promise<T> =>
    makeRequest('POST', path, options),
  post: <T>(path: string, options?: TOptions): Promise<T> =>
    makeRequest('POST', path, options),
}
