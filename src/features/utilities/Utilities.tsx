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
import {
  openPayURIModal,
  openExportPrivKeyModal,
  openImportPrivKeyModal,
  openImportANIPrivKeyModal,
} from './index'
import PayURIModal from './PayURIModal'
import ExportPrivKeyModal from './ExportPrivKeyModal'
import ImportANIPrivKeyModal from './ImportANIPrivKeyModal'
import ImportPrivKeyModal from './ImportPrivKeyModal'

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

    onRendererEvent('payuri', () => {
      dispatch(openPayURIModal())
    })

    onRendererEvent('import', () => {
      dispatch(openImportPrivKeyModal())
    })

    onRendererEvent('importani', () => {
      dispatch(openImportANIPrivKeyModal())
    })

    onRendererEvent('exportall', () => {
      dispatch(openExportPrivKeyModal())
    })

    onRendererEvent('exportalltx', async () => {
      // const save = await invokeMainTask(
      //   'showSaveTransactionsAsCSVDialog',
      //   undefined,
      // )
      // if (save.filePath) {
      //   // Construct a CSV
      //   const { transactions } = this.props
      //   const rows = transactions.flatMap((t: any) => {
      //     if (t.detailedTxns) {
      //       return t.detailedTxns.map((dt: any) => {
      //         const normaldate = dayjs(t.time * 1000).format('mmm dd yyyy hh::MM tt')
      //         const escapedMemo = dt.memo
      //           ? `'${dt.memo.replace(/"/g, '""')}'`
      //           : ''
      //         return `${t.time},"${normaldate}","${t.txid}","${t.type}",${dt.amount},"${dt.address}","${escapedMemo}"`
      //       })
      //     } else {
      //       return []
      //     }
      //   })
      //   const header = ['UnixTime, Date, Txid, Type, Amount, Address, Memo']
      //   try {
      //     await fs.promises.writeFile(
      //       save.filePath,
      //       header.concat(rows).join('\n'),
      //     )
      //   } catch (err) {
      //     openErrorModal('Error Exporting Transactions', `${err}`)
      //   }
      // }
    })
  }, [])

  return (
    <>
      <PastelPhotopeaModal />
      <PastelSpriteEditorToolModal />
      <AboutModal />
      <SquooshToolModal />
      <GlitchImageModal />
      <PayURIModal />
      <ExportPrivKeyModal />
      <ImportANIPrivKeyModal />
      <ImportPrivKeyModal />
    </>
  )
}
