import initServeStatic, { closeServeStatic } from './ServeStatic'

export type { IAppInfoState, TWalletInfo } from './AppInfoSlice'
export {
  setPastelInfo,
  appInfoReducer,
  defaultPastelInfo,
} from './AppInfoSlice'

export { closeServeStatic }

export default initServeStatic
