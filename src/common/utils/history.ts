import { createMemoryHistory } from 'history'
import * as ROUTES from 'common/utils/constants/routes'

export default createMemoryHistory({
  initialEntries: [ROUTES.LOADING],
  initialIndex: 0,
})
