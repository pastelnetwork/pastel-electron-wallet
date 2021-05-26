import React, { useEffect, useState } from 'react'

import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import PastelDB from '../../../pastelDB/database'
import { TLineChartData } from '../../../pastelDB/type'
import {
  TPeriod,
  transformTransactionInfo,
} from '../../utils/PastelStatisticsLib'
import { EChartsLineChart } from './EChartsLineChart'
import styles from '../../Common.module.css'

const redrawCycle = 60000

const TransactionTotalCountOvertime = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState('#100c2a')
  const [period, setPeriod] = useState<TPeriod>('2h')
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.txoutsetinfo)
      if (result.length) {
        const transforms = transformTransactionInfo(result[0].values, period)
        setTransformLineChartData(transforms)
      }
    }

    loadLineChartData()
    const newTicker = setInterval(() => {
      loadLineChartData()
    }, redrawCycle)
    setTicker(newTicker)

    return () => {
      if (ticker) {
        clearInterval(ticker)
      }
    }
  }, [period])

  const handlePeriodFilterChange = (period: TPeriod) => {
    setPeriod(period)
    clearInterval(ticker as NodeJS.Timeout)
  }

  const handleBgColorChange = (color: string) => {
    setCurrentBgColor(color)
  }

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.content}`}
          style={{ backgroundColor: currentBgColor }}
        >
          {transformLineChartData && (
            <EChartsLineChart
              dataX={transformLineChartData?.dataX}
              dataY={transformLineChartData?.dataY}
              title='Number of Transactions'
              periodIndex={0}
              handleBgColorChange={handleBgColorChange}
              handlePeriodFilterChange={handlePeriodFilterChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TransactionTotalCountOvertime
