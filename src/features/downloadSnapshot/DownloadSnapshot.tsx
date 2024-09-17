import cx from 'classnames'
import React from 'react'
import { ipcRenderer } from 'electron'
import fs from 'fs'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import cstyles from '../../common/utils/Styles.module.css'
import styles from './DownloadSnapshot.module.css'
import {
  closeDownloadSnapshot,
} from './DownloadSnapshotSlice'

export default function DownloadSnapshot(): JSX.Element | null {
  const { opened } = useAppSelector(state => state.downloadSnapshot)
  const { pastelReinstallPath } = useAppSelector(state => state.appInfo)
  const dispatch = useAppDispatch()

  const handleYesButtonClick = async () => {
    await fs.promises.writeFile(pastelReinstallPath, JSON.stringify({ reinstall: true }))
    ipcRenderer.send('reset_pastel_app')
  }

  const handleNoButtonClick = () => {
    dispatch(closeDownloadSnapshot())
  }

  if (!opened) {
    return null
  }

  return (
    <div
      id='downloadSnapshot'
      className={cx(styles.wrapper, status ? styles.wrapperDownloading : '')}
    >
      <button
        className={cx(cstyles.highlight, styles.close)}
        onClick={() => dispatch(closeDownloadSnapshot())}
      >
        X
      </button>
      <p className={cx(styles.content, cstyles.large)}>
        Would you like to speed up the syncing process by downloading a
        snapshot file?
      </p>
      <div className={cstyles.center}>
        <button
          type='button'
          className={cx(styles.btn, cstyles.primaryButton)}
          onClick={handleYesButtonClick}
        >
          Yes
        </button>
        <button
          type='button'
          className={cx(styles.btn, cstyles.primaryButton)}
          onClick={handleNoButtonClick}
        >
          No
        </button>
      </div>
    </div>
  )
}
