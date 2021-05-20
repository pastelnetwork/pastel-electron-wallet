import React from 'react'
import { Link } from 'react-router-dom'

import cstyles from '../../legacy/components/Common.module.css'
import { pastelChartFields } from '../pastelDB/constants'
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
            {pastelChartFields.map((field, index) => (
              <Link to={field.routeName} className={styles.cardLink}>
                <Card
                  key={field.name}
                  subTitle={field.name}
                  cardIndex={index}
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
