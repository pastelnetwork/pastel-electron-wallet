import React, { useEffect, useMemo, useState } from 'react'
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

type TTransactionItemProps = {
  type: TTransactionType
  amount: number
  txid: string
  time: number
  address: string
  escapedMemo?: string
  normaldate: string
}

export default function Utilities(): JSX.Element {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [exportTxnError, setExportTxnError] = useState('')
  const [closeExportTxn, setCloseExportTxn] = useState(false)

  const { data: transactionsRaw } = transactionRPC.useTAndZTransactions()

  const transactions = useMemo<TTransactionItemProps[]>(
    () =>
      transactionsRaw?.map(transaction => ({
        type: (transaction.type as TTransactionType) || TTransactionType.ALL,
        amount: transaction.amount || 0,
        txid: transaction.txid,
        time: transaction.time,
        address: transaction.address,
        escapedMemo: transaction.memo
          ? `'${transaction.memo.replace(/"/g, '""')}'`
          : '',
        normaldate: dayjs.unix(transaction.time).format('MMM DD YYYY hh::mm A'),
      })) || [],
    [transactionsRaw],
  )

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

    onRendererEvent('exportalltx', async () => {
      const save = await invokeMainTask(
        'showSaveTransactionsAsCSVDialog',
        undefined,
      )
      if (save.filePath) {
        const rows = transactions.map(
          transaction =>
            `${transaction.time},"${transaction.normaldate}","${transaction.txid}","${transaction.type}",${transaction.amount},"${transaction.address}","${transaction.escapedMemo}"`,
        )

        const header = ['UnixTime, Date, Txid, Type, Amount, Address, Memo']
        try {
          await fs.promises.writeFile(
            save.filePath,
            header.concat(rows).join('\n'),
          )
        } catch (err) {
          setExportTxnError(`${err}`)
          setCloseExportTxn(true)
        }
      }
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
      <ErrorModal
        message={exportTxnError}
        isOpen={closeExportTxn}
        closeModal={() => setCloseExportTxn(false)}
      />
      <PasteldModal />
    </>
  )
}
