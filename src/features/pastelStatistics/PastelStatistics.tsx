import React from 'react'

import cstyles from '../../legacy/components/Common.module.css'
import { statisticsFieldNames } from '../pastelDB/constants'
import { Card } from './components'
import styles from './PastelStatistics.module.css'

const PastelStatistics = (): JSX.Element => {
  return (
    <>
      <div
        className={`${cstyles.xlarge} ${cstyles.padall} ${cstyles.center}`}
        style={{ marginTop: '20px' }}
      >
        Pastel Statistics
      </div>
      <div className={styles.container}>
        <div className={`${styles.fullWidth}`} style={{ padding: '16px' }}>
          <div className={styles.cardList}>
            {statisticsFieldNames.map((field, index) => (
              <Card
                key={field.name}
                subTitle={field.name}
                cardIndex={index}
                routeUrl={field.routeName}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PastelStatistics
