import React from 'react'
import { Link } from 'react-router-dom'

import cstyles from '../../legacy/components/Common.module.css'
import { pastelChartFields } from './constants/common'
import { Card } from './components/card/Card'
import styles from './PastelStatistics.module.css'

const PastelStatistics = (): JSX.Element => {
  return (
    <>
      <div
        className={`${cstyles.xlarge} ${cstyles.padall} ${cstyles.center} ${styles.marginTop20}`}
      >
        Pastel Statistics
      </div>
      <div className={styles.container}>
        <div className={`${styles.fullWidth} ${styles.padding16}`}>
          <div className={styles.cardList}>
            {pastelChartFields.map(field => (
              <Link to={field.routeName} className={styles.cardLink}>
                <Card
                  key={field.name}
                  subTitle={field.name}
                  backgroundImage={field.backgroundImage}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PastelStatistics
