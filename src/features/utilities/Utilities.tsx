import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch } from 'redux/hooks'
import * as ROUTES from 'common/utils/constants/routes'

import PastelPhotopeaModal, { openPastelPhotopeaModal } from '../pastelPhotopea'
import PastelSpriteEditorToolModal, {
  openPastelSpriteEditorToolModal,
} from '../pastelSpriteEditorTool'
import AboutModal, { openAboutModal } from '../about'
import SquooshToolModal, { openSquooshToolModal } from '../squooshTool'
import GlitchImageModal, { openGlitchImageModal } from '../glitchImage'
import { openUpdateToast } from '../updateToast'
import { onRendererEvent } from '../app/rendererEvents'

export default function Utilities(): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    onRendererEvent('pastelPhotopea', () => {
      dispatch(openPastelPhotopeaModal())
    })

    onRendererEvent('pastelSpriteEditorTool', () => {
      dispatch(openPastelSpriteEditorToolModal())
    })

    onRendererEvent('about', () => {
      dispatch(openAboutModal())
    })

    onRendererEvent('squooshTool', () => {
      dispatch(openSquooshToolModal())
    })

    onRendererEvent('glitchImage', () => {
      dispatch(openGlitchImageModal())
    })

    onRendererEvent('updateDownloaded', () => {
      dispatch(openUpdateToast())
    })

    onRendererEvent('deepLink', ({ view, param }) => {
      const allRoutes = Object.assign(ROUTES)
      const page = allRoutes[view.toUpperCase()] ? view : ROUTES.DASHBOARD
      history.replace({
        pathname: page,
        state: { param },
      })
    })

    onRendererEvent('pasteld', () => {
      history.push(ROUTES.PASTELD)
    })
  }, [])

  return (
    <>
      <PastelPhotopeaModal />
      <PastelSpriteEditorToolModal />
      <AboutModal />
      <SquooshToolModal />
      <GlitchImageModal />
    </>
  )
}
