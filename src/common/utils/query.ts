import { UseQueryResult } from 'react-query'
import { useMemo } from 'react'

export const useCombineQueryArray = <T>(
  queries: UseQueryResult<T[]>[],
): UseQueryResult<T[]> => {
  return useMemo(() => {
    const areAllLoading = queries.every(query => query.isLoading)

    return {
      ...queries[0],
      isLoading: queries.some(query => query.isLoading),
      data: areAllLoading ? undefined : queries.map(query => query.data).flat(),
    } as UseQueryResult<T[]>
  }, queries)
}

export const useCombineQueryObject = <T extends Record<string, unknown>>(
  queries: UseQueryResult<T>[],
): UseQueryResult<T> => {
  return useMemo(() => {
    const areAllLoading = queries.every(query => query.isLoading)

    let data: T | undefined = undefined
    if (!areAllLoading) {
      data = {} as T
      queries.forEach(query => {
        Object.assign(data, query.data)
      })
    }

    return {
      ...queries[0],
      isLoading: queries.some(query => query.isLoading),
      data,
    } as UseQueryResult<T>
  }, queries)
}
