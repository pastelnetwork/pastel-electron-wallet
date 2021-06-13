import React, { useEffect, useState } from 'react'

import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import PastelDB from '../../../pastelDB/database'
import { TScatterChartData } from '../../../pastelDB/type'
import {
  TPeriod,
  transformTransactionInBlock,
} from '../../utils/PastelStatisticsLib'
import { EChartsScatterChart } from '../chart/EChartsScatterChart'
import styles from '../../Common.module.css'
import {
  CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  CHART_DEFAULT_PERIOD,
  periods,
} from '../../common/constants'

type TTransactionsInBlockOvertimeProps = {
  info: {
    [key: string]: string | number
  }
}

const redrawCycle = 6000

const TransactionsInBlockOvertime = (
  props: TTransactionsInBlockOvertimeProps,
): JSX.Element => {
  const { info } = props
  const [currentBgColor, setCurrentBgColor] = useState(
    CHART_THEME_BACKGROUND_DEFAULT_COLOR,
  )
  const [period, setPeriod] = useState<TPeriod>(CHART_DEFAULT_PERIOD)
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TScatterChartData>({
    data: [],
    dataX: [],
  })

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.blockinfo)
      if (result.length) {
        const transforms = transformTransactionInBlock(result[0].values, period)
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
            <EChartsScatterChart
              chartName='transactionsinblock'
              data={transformLineChartData?.data}
              dataX={transformLineChartData?.dataX}
              title='Transactions In Block'
              info={info}
              offset={1}
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

export default TransactionsInBlockOvertime
