import { installExtensionsPromiseRef } from '../src/common/utils/test-utils'

export default jest.fn(() => installExtensionsPromiseRef.current)
