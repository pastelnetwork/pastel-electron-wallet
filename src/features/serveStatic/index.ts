import initServeStatic, { closeServeStatic } from './ServeStatic'
import SetupIPCRendererHandler from './SetupIPCRendererHandler'

export type { IAppInfoState } from './AppInfoSlice'
export { setAppInfo, appInfoReducer } from './AppInfoSlice'

export { closeServeStatic, SetupIPCRendererHandler }

export default initServeStatic
