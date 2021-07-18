import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { aboutModalReducer } from '../features/about'
import { pastelConfReducer } from '../features/pastelConf'
import { pastelIDReducer } from '../features/pastelID'
import { pastelModalReducer } from '../features/pastelModal'
import { pastelPaperWalletModalReducer } from '../features/pastelPaperWalletGenerator'
import { pastelPhotopeaModalReducer } from '../features/pastelPhotopea'
import { pastelPriceReducer } from '../features/pastelPrice'
import { pastelSpriteEditorToolModalReducer } from '../features/pastelSpriteEditorTool'
import { squooshToolModalReducer } from '../features/squooshTool'
import { updateToastReducer } from '../features/updateToast'
import { glitchImageModalReducer } from '../features/glitchImage'
import { rpcConfigReducer } from '../features/loading/rpcConfigSlice'
import { appInfoReducer } from '../features/serveStatic'

const store = configureStore({
  reducer: {
    pastelID: pastelIDReducer,
    pastelModal: pastelModalReducer,
    pastelConf: pastelConfReducer,
    pastelPrice: pastelPriceReducer,
    rpcConfig: rpcConfigReducer,
    pastelPaperWalletModal: pastelPaperWalletModalReducer,
    pastelSpriteEditorToolModal: pastelSpriteEditorToolModalReducer,
    pastelPhotopeaModal: pastelPhotopeaModalReducer,
    aboutModal: aboutModalReducer,
    updateToast: updateToastReducer,
    squooshToolModal: squooshToolModalReducer,
    glitchImageModal: glitchImageModalReducer,
    appInfo: appInfoReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {pastelID: PastelIDState, errorModal: IErrorModalState, ...}
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
