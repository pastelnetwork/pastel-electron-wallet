import initServeStatic, { closeServeStatic } from './ServeStatic'

export type { IAppInfoState } from './AppInfoSlice'
export { setAppInfo, appInfoReducer } from './AppInfoSlice'

export { closeServeStatic }

export default initServeStatic
