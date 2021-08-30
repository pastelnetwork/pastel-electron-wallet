import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { arrayUniq } from '../common/utils/array'

export const useSuggestLocations = (
  query: string,
  options: {
    enabled: boolean
  },
): UseQueryResult<string[]> => {
  return useQuery(
    ['suggestLocations', query],
    async () => {
      const res = await axios.get<{ display_name: string }[]>(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
      )

      return arrayUniq(res.data.map(location => location.display_name))
    },
    options,
  )
}
