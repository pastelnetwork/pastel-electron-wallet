// import cx from 'classnames'
import React from 'react'

// import cstyles from '../../../legacy/components/Common.module.css'
import ScrollPane from '../../../legacy/components/ScrollPane'
import { useAppSelector } from '../../../redux/hooks'
import styles from './ArtRegForm.module.css'
import { GeneralInfoStep } from './GeneralInfoStep'
// import { ImageSelectionStep } from './ImageSelectionStep'

const stepMap = {
  GeneralInfo: <GeneralInfoStep />,
  // ImageSelection: <ImageSelectionStep />,
  ImageSelection: <div />,
  Optimization: <div />,
  Submission: <div />,
}

export function ArtRegForm(): JSX.Element {
  const { step } = useAppSelector(state => state.artRegForm)
  return (
    <ScrollPane offsetHeight={0}>
      <div className={styles.artRegFormContainer}>
        <div className={styles.artRegFormMainBlock}>{stepMap[step]}</div>
      </div>
    </ScrollPane>
  )
}
