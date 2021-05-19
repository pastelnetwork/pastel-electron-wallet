import cx from 'classnames'
import { ipcRenderer, shell } from 'electron'
import React from 'react'

import pkg from '../../../package.json'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import cstyles from '../common/Styles.module.css'
import styles from './UpdateToast.module.css'
import { closeUpdateToast } from './UpdateToastSlice'

export default function UpdateToast(): JSX.Element | null {
  const { opened } = useAppSelector(state => state.updateToast)
  const dispatch = useAppDispatch()

  const openLearnMore = () => {
    shell.openExternal(`https://github.com/${pkg.repoName}/releases`)
  }

  const handleUpdate = () => {
    dispatch(closeUpdateToast())
    ipcRenderer.send('restart_app')
  }

  if (!opened) {
    return null
  }

  return (
    <div id='updateToast' className={styles.wrapper}>
      <button
        className={cx(cstyles.highlight, styles.close)}
        onClick={() => dispatch(closeUpdateToast())}
      >
        X
      </button>
      <p className={cx(styles.content, cstyles.large)}>
        Would you like to update to the new version of Wallet? Recommended!
      </p>
      <div className={cstyles.center}>
        <button
          type='button'
          className={cx(styles.btn, cstyles.primaryButton)}
          onClick={handleUpdate}
        >
          OK
        </button>
        <button
          type='button'
          className={cx(styles.btn, cstyles.primaryButton)}
          onClick={openLearnMore}
        >
          Learn more
        </button>
      </div>
    </div>
  )
}
