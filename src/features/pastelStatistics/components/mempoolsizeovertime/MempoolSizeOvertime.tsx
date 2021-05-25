import React, { useEffect, useState } from 'react'

import PastelDB from '../../../pastelDB/database'
import { EChartsLineChart } from './EChartsLineChart'
import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import { TPeriod, transformMempoolInfo } from '../../utils/PastelStatisticsLib'
import styles from './MempoolSizeOvertime.module.css'

type TLineChartData = {
  dataX: string[]
  dataY: number[]
}

const redrawCycle = 60000

const MempoolSizeOvertime = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState('#191c24')
  const [period, setPeriod] = useState<TPeriod>('2h')
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.mempoolinfo)
      if (result.length) {
        const transforms = transformMempoolInfo(result[0].values, period)
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
              title='Mempool Size'
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

export default MempoolSizeOvertime
