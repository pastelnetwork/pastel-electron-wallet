import React, { useCallback, useEffect, useState } from 'react'

import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import PastelDB from '../../../pastelDB/database'
import { TLineChartData } from '../../../pastelDB/type'
import {
  TPeriod,
  transformDifficultyInfo,
} from '../../utils/PastelStatisticsLib'
import { EChartsLineChart } from '../chart/EChartsLineChart'
import styles from '../../Common.module.css'
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
  periods,
} from '../../common/constants'
import { TDbStatisticInfo } from '../../../pastelDB/statistic/statisticInfo.repo'

const redrawCycle = 6000

export default function DifficultyOvertime(): JSX.Element {
  const [currentBgColor, setCurrentBgColor] = useState(
    CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  )
  const [period, setPeriod] = useState<TPeriod>(CHART_DEFAULT_PERIOD)
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>({
    dataX: [],
    dataY: [],
  })

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB<TDbStatisticInfo>(
        pasteldb,
        pastelTableNames.statisticinfo,
      )
      if (result.length) {
        const transforms = transformDifficultyInfo(result, period)
        setTransformLineChartData(transforms)
      }
    }

    loadLineChartData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
    const newTicker = setInterval(() => {
      loadLineChartData()
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }, redrawCycle)
    setTicker(newTicker)

    return () => {
      if (newTicker) {
        clearInterval(newTicker)
      }
    }
  }, [period])

  const handlePeriodFilterChange = useCallback((period: TPeriod) => {
    setPeriod(period)
    if (ticker) {
      clearInterval(ticker)
    }
  }, [])

  const handleBgColorChange = useCallback((color: string) => {
    setCurrentBgColor(color)
  }, [])

  return (
    <div className={styles.container}>
      <div
        className={`${styles.content}`}
        style={{ backgroundColor: currentBgColor }}
      >
        {transformLineChartData && (
          <EChartsLineChart
            chartName='difficulty'
            dataX={transformLineChartData?.dataX}
            dataY={transformLineChartData?.dataY}
            title='Network Difficulty'
            offset={10000}
            periods={periods[0]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </div>
  )
}
