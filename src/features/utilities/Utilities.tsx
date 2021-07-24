import React, { useEffect } from 'react'
import { ipcRenderer } from 'electron'
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

export default function Utilities(): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    ipcRenderer.on('pastelPhotopea', () => {
      dispatch(openPastelPhotopeaModal())
    })

    ipcRenderer.on('pastelSpriteEditorTool', () => {
      dispatch(openPastelSpriteEditorToolModal())
    })

    ipcRenderer.on('about', () => {
      dispatch(openAboutModal())
    }) // About

    ipcRenderer.on('squooshTool', () => {
      dispatch(openSquooshToolModal())
    })

    ipcRenderer.on('glitchImage', () => {
      dispatch(openGlitchImageModal())
    })

    ipcRenderer.on('update_downloaded', () => {
      dispatch(openUpdateToast())
    })

    ipcRenderer.on(
      'deepLink',
      (event, { view, param }: { view: string; param: string }) => {
        const allRoutes = Object.assign(ROUTES)
        const page = allRoutes[view.toUpperCase()] ? view : ROUTES.DASHBOARD
        history.replace({
          pathname: page,
          state: { param },
        })
      },
    )

    ipcRenderer.on('pasteld', () => {
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
