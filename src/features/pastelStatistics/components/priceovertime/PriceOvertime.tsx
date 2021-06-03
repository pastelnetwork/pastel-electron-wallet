import React, { useEffect, useState } from 'react'

import PastelDB from '../../../pastelDB/database'
import { EChartsMultiLineChart } from '../chart/EChartsMultiLineChart'
import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import { TPeriod, transformPriceInfo } from '../../utils/PastelStatisticsLib'
import styles from '../../Common.module.css'
import { periods } from '../../common/constants'

type TLineChartData = {
  dataX: string[]
  dataY1: number[]
  dataY2: number[]
}

type TPriceOvertimeProps = {
  info: {
    [key: string]: string | number
  }
}

const redrawCycle = 60000

const PriceOvertime = (props: TPriceOvertimeProps): JSX.Element => {
  const { info } = props
  const [currentBgColor, setCurrentBgColor] = useState('#100c2a')
  const [period, setPeriod] = useState<TPeriod>('2d')
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.pslprice)
      if (result.length) {
        const transforms = transformPriceInfo(result[0].values, period)
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
            <EChartsMultiLineChart
              dataX={transformLineChartData?.dataX}
              dataY1={transformLineChartData?.dataY1}
              dataY2={transformLineChartData?.dataY2}
              title={`${info.currencyName} Prices`}
              info={info}
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

export default PriceOvertime
