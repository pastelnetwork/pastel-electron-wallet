/* eslint-disable */

import React from 'react'
import styles from './LoadingOverlay.module.css'
export default function LoadingOverlay({ loading, children }: any) {
  return (
    <div className={styles.container}>
      {loading && <div className={styles.overlay} />}
      {children}
    </div>
  )
}
LoadingOverlay.defaultProps = {
  loading: false,
}
