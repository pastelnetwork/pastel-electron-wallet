import React, { useEffect, useState, useCallback } from 'react'
import PastelDB from '../../../pastelDB/database'
import { EChartsLineChart } from '../chart/EChartsLineChart'
import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import {
  periods,
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
} from '../../common/constants'
import { TLineChartData } from '../../../pastelDB/type'
import { TPeriod, transformHashrateInfo } from '../../utils/PastelStatisticsLib'

import styles from '../../Common.module.css'
import { TDbMiningInfo } from '../../../pastelDB/mining/miningInfo.repo'

const redrawCycle = 6000

export default function HashrateOvertime(): JSX.Element {
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
      const result = getDatasFromDB<TDbMiningInfo>(
        pasteldb,
        pastelTableNames.mininginfo,
      )
      if (result.length) {
        const transforms = transformHashrateInfo(result, period)
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
            chartName='hashrate'
            dataX={transformLineChartData?.dataX}
            dataY={transformLineChartData?.dataY}
            title='Hashrate(MH/s)'
            offset={1}
            periods={periods[0]}
            handleBgColorChange={handleBgColorChange}
            handlePeriodFilterChange={handlePeriodFilterChange}
          />
        )}
      </div>
    </div>
  )
}
