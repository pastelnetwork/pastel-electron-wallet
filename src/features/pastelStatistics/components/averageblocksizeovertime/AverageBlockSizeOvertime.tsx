import React, { useEffect, useState } from 'react'

import { getFilteredDataFromDBByPeriod } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import PastelDB from '../../../pastelDB/database'
import { TLineChartData } from '../../../pastelDB/type'
import {
  TGranularity,
  TPeriod,
  transformBlockSizeInfo,
} from '../../utils/PastelStatisticsLib'
import { EChartsLineChart } from '../chart/EChartsLineChart'
import styles from '../../Common.module.css'
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
  BLOCK_CHART_DEFAULT_GRANULARITY,
  granularities,
  periods,
} from '../../common/constants'

const redrawCycle = 60000

const AverageBlockSizeOvertime = (): JSX.Element => {
  const [currentBgColor, setCurrentBgColor] = useState(
    CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  )
  const [period, setPeriod] = useState<TPeriod>(CHART_DEFAULT_PERIOD)
  const [granularity, setGranularity] = useState<TGranularity>(
    BLOCK_CHART_DEFAULT_GRANULARITY,
  )
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getFilteredDataFromDBByPeriod(
        pasteldb,
        pastelTableNames.blockinfo,
        granularity,
        period,
      )
      if (result.length) {
        const transforms = transformBlockSizeInfo(result[0].values)
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
  }, [granularity, period])

  const handlePeriodFilterChange = (period: TPeriod) => {
    setPeriod(period)
    clearInterval(ticker as NodeJS.Timeout)
  }

  const handleGranularityFilterChange = (granularity: TGranularity) => {
    setGranularity(granularity)
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
              chartName='averageblocksize'
              dataX={transformLineChartData?.dataX}
              dataY={transformLineChartData?.dataY}
              title='Average Block Size(KB)'
              offset={1}
              granularities={granularities[0]}
              periods={periods[1]}
              handleBgColorChange={handleBgColorChange}
              handlePeriodFilterChange={handlePeriodFilterChange}
              handleGranularityFilterChange={handleGranularityFilterChange}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default AverageBlockSizeOvertime
