import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import fs from 'fs'

import dayjs from 'common/utils/initDayjs'
import { useAppDispatch } from 'redux/hooks'
import * as ROUTES from 'common/utils/constants/routes'

import { transactionRPC } from 'api/pastel-rpc'
import { TTransactionType } from 'types/rpc'
import PastelPhotopeaModal, { openPastelPhotopeaModal } from '../pastelPhotopea'
import PastelSpriteEditorToolModal, {
  openPastelSpriteEditorToolModal,
} from '../pastelSpriteEditorTool'
import AboutModal, { openAboutModal } from '../about'
import SquooshToolModal, { openSquooshToolModal } from '../squooshTool'
import GlitchImageModal, { openGlitchImageModal } from '../glitchImage'
import { openUpdateToast } from '../updateToast'
import { onRendererEvent, invokeMainTask } from '../app/rendererEvents'
import {
  openPayURIModal,
  openExportPrivKeyModal,
  openImportPrivKeyModal,
  openImportANIPrivKeyModal,
  openPasteldModal,
} from './index'
import PayURIModal from './PayURIModal'
import ExportPrivKeyModal from './ExportPrivKeyModal'
import ImportANIPrivKeyModal from './ImportANIPrivKeyModal'
import ImportPrivKeyModal from './ImportPrivKeyModal'
import ErrorModal from './ErrorModal'
import PasteldModal from './PasteldModal'

export default function Utilities(): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [exportTxnError, setExportTxnError] = useState('')
  const [closeExportTxn, setCloseExportTxn] = useState(false)

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
      dispatch(openPasteldModal())
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

    onRendererEvent(
      'exportalltx',
      async (): Promise<void> => {
        const save = await invokeMainTask(
          'showSaveTransactionsAsCSVDialog',
          undefined,
        )

        if (save.filePath) {
          const transactionsRaw = await transactionRPC.fetchTAndZTransactions()

          const transactions =
            transactionsRaw?.map(transaction => ({
              type:
                (transaction.type as TTransactionType) || TTransactionType.ALL,
              amount: transaction.amount || 0,
              txid: transaction.txid,
              time: transaction.time,
              address: transaction.address,
              escapedMemo: transaction.memo
                ? `'${transaction.memo.replace(/"/g, '""')}'`
                : '',
              normaldate: dayjs
                .unix(transaction.time)
                .format('MMM DD YYYY hh:mm A'),
            })) || []

          const rows = transactions.map(transaction => {
            const time: string = transaction.time?.toString() || ''
            const normaldate: string = transaction.normaldate || ''
            const txid: string = transaction.txid || ''
            const type: string = transaction.type?.toString() || ''
            const amount: string = transaction.amount?.toString() || ''
            const address: string = transaction.address || ''
            const escapedMemo: string = transaction.escapedMemo || ''
            return `${time},"${normaldate}","${txid}","${type}",${amount},"${address}","${escapedMemo}"`
          })
          const header = ['UnixTime, Date, Txid, Type, Amount, Address, Memo']
          try {
            await fs.promises.writeFile(
              save.filePath,
              header.concat(rows).join('\n'),
            )
          } catch (err) {
            const message: string = err.message || ''
            setExportTxnError(`${message}`)
            setCloseExportTxn(true)
          }
        }
      },
    )
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
      <ErrorModal
        message={exportTxnError}
        isOpen={closeExportTxn}
        closeModal={() => setCloseExportTxn(false)}
      />
      <PasteldModal />
    </>
  )
}
