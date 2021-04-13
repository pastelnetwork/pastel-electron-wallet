import React from 'react'

import styles from './PastelLoading.module.css'

type PastelLoadingProps = {
  loadingIsOpen: boolean
}

export default function PastelLoading(props: PastelLoadingProps): JSX.Element {
  if (!props.loadingIsOpen) {
    return <></>
  }

  return (
    <div className={styles.loading}>
      <div className={styles.loadingWrapper}>
        <div className={styles.ldsEllipsis}>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  )
}
