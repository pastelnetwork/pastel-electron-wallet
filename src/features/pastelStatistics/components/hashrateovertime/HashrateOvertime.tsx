import React, { useEffect, useState } from 'react'
import PastelDB from '../../../pastelDB/database'
import { EChartsLineChart } from '../chart/EChartsLineChart'
import { getDatasFromDB } from '../../../pastelDB'
import { pastelTableNames } from '../../../pastelDB/constants'
import { periods } from '../../common/constants'
import { TLineChartData } from '../../../pastelDB/type'
import { TPeriod, transformHashrateInfo } from '../../utils/PastelStatisticsLib'
import styles from '../../Common.module.css'

type THashrateOvertimeProps = {
  info: {
    [key: string]: string | number
  }
}

const redrawCycle = 60000

const HashrateOvertime = (props: THashrateOvertimeProps): JSX.Element => {
  const { info } = props
  const [currentBgColor, setCurrentBgColor] = useState('#0d0d0d')
  const [period, setPeriod] = useState<TPeriod>('2h')
  const [ticker, setTicker] = useState<NodeJS.Timeout>()
  const [
    transformLineChartData,
    setTransformLineChartData,
  ] = useState<TLineChartData>()

  useEffect(() => {
    const loadLineChartData = async () => {
      const pasteldb = await PastelDB.getDatabaseInstance()
      const result = getDatasFromDB(pasteldb, pastelTableNames.mininginfo)
      if (result.length) {
        const transforms = transformHashrateInfo(result[0].values, period)
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
              chartIndex='hashrate'
              dataX={transformLineChartData?.dataX}
              dataY={transformLineChartData?.dataY}
              title='Hashrate(MH/s)'
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

export default HashrateOvertime
