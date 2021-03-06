import React, { useCallback, useEffect, useState } from 'react'

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
import { TDbBlockInfo } from '../../../pastelDB/blockchain/blockInfo.repo'

type TTransactionsInBlockOvertimeProps = {
  info: {
    [key: string]: string | number
  }
}

const redrawCycle = 6000

export default function TransactionsInBlockOvertime(
  props: TTransactionsInBlockOvertimeProps,
): JSX.Element {
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
      const result = getDatasFromDB<TDbBlockInfo>(
        pasteldb,
        pastelTableNames.blockinfo,
      )
      if (result.length) {
        const transforms = transformTransactionInBlock(result, period)
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
  )
}
