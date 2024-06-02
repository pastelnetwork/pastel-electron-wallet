import cx from 'classnames'
import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { downloadSnapshotFile } from './utils'
import cstyles from '../../common/utils/Styles.module.css'
import styles from './DownloadSnapshot.module.css'
import {
  closeDownloadSnapshot,
  setDownloadSnapshot,
} from './DownloadSnapshotSlice'

export default function DownloadSnapshot(): JSX.Element | null {
  const [status, setStatus] = React.useState('')
  const { opened } = useAppSelector(state => state.downloadSnapshot)
  const { locatePastelConfDir } = useAppSelector(state => state.appInfo)
  const { pastelConf } = useAppSelector(state => state)
  const dispatch = useAppDispatch()

  const handleYesButtonClick = () => {
    downloadSnapshotFile({
      outputDir: locatePastelConfDir,
      url:
        'https://download.pastel.network/snapshots/mainnet/snapshot-690894-mainnet.tar.gz',
      fileName: 'snapshot-690894-mainnet.tar.gz',
      onProgress: (currentStatus: string) => setStatus(currentStatus),
      pastelConf,
    })
    dispatch(setDownloadSnapshot())
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
      {!status ? (
        <>
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
        </>
      ) : (
        <p
          className={cx(
            styles.content,
            cstyles.large,
            styles.contentDownloading,
          )}
        >
          {status}
        </p>
      )}
    </div>
  )
}
