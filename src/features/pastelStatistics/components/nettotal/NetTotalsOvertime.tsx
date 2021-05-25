import React, { useEffect, useState } from 'react'

import PastelDB from '../../../pastelDB/database'
import { EChartsLineChart } from './EChartsLineChart'
import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import { TPeriod, transformNetTotals } from '../../utils/PastelStatisticsLib'
import styles from './NetTotalsOvertime.module.css'

export type TNetTotalsChartData = {
  dataX: string[]
  dataY: number[]
  dataY1: number[]
}

const redrawCycle = 60000

const NetTotalsOvertime = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState('#191c24')
  const [period, setPeriod] = useState<TPeriod>('2h')
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TNetTotalsChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.nettotals)
      if (result.length) {
        const transforms = transformNetTotals(result[0].values, period)
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
              dataY1={transformLineChartData?.dataY1}
              title='Network Totals'
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

export default NetTotalsOvertime
