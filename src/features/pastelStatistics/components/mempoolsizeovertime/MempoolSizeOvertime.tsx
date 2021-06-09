import React, { useEffect, useState } from 'react'

import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import PastelDB from '../../../pastelDB/database'
import { TLineChartData } from '../../../pastelDB/type'
import { TPeriod, transformMempoolInfo } from '../../utils/PastelStatisticsLib'
import { EChartsLineChart } from '../chart/EChartsLineChart'
import styles from '../../Common.module.css'
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
  periods,
} from '../../common/constants'

type TMempoolSizeOvertimeProps = {
  info: {
    [key: string]: string | number
  }
}

const redrawCycle = 6000

const MempoolSizeOvertime = (props: TMempoolSizeOvertimeProps): JSX.Element => {
  const { info } = props
  const [currentBgColor, setCurrentBgColor] = useState(
    CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  )
  const [period, setPeriod] = useState<TPeriod>(CHART_DEFAULT_PERIOD)
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
      if (newTicker) {
        clearInterval(newTicker)
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
              chartName='mempoolsize'
              dataX={transformLineChartData?.dataX}
              dataY={transformLineChartData?.dataY}
              title='Mempool Size(KByte)'
              info={info}
              offset={0.5}
              periods={periods[0]}
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
