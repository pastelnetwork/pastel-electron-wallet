import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { csvHeaders, themes } from '../../common/constants'
import {
  TLineChartProps,
  TThemeColor,
  TThemeInitOption,
  TThemeButton,
} from '../../common/types'
import {
  makeDownloadFileName,
  TPeriod,
  TGranularity,
} from '../../utils/PastelStatisticsLib'
import { useCurrencyName } from 'common/hooks/appInfo'

import styles from './LineChart.module.css'
import {
  getThemeInitOption,
  getThemeUpdateOption,
} from '../../utils/ChartOptions'
import { PrevButton } from '../PrevButton'

function PeriodSelect({
  index,
  handlePeriodSelect,
  getActivePriodButtonStyle,
  period,
}: {
  index: number
  getActivePriodButtonStyle: (val: number) => string
  handlePeriodSelect: (index: number, period: TPeriod) => void
  period: TPeriod
}): JSX.Element {
  const onClick = useCallback(() => {
    handlePeriodSelect(index, period)
  }, [])

  return (
    <button
      className={`${getActivePriodButtonStyle(index)} ${styles.filterButton}`}
      onClick={onClick}
      type='button'
    >
      {period}
    </button>
  )
}

function ThemeButton({
  theme,
  getActiveThemeButtonStyle,
  index,
  handleThemeButtonClick,
}: {
  theme: TThemeButton
  getActiveThemeButtonStyle: (val: number) => string
  index: number
  handleThemeButtonClick: (theme: TThemeButton, index: number) => void
}): JSX.Element {
  const onClick = useCallback(() => {
    handleThemeButtonClick(theme, index)
  }, [])

  return (
    <button
      className={`${styles.themeSelectButton} ${getActiveThemeButtonStyle(
        index,
      )}`}
      onClick={onClick}
      style={{
        backgroundColor: `${theme.backgroundColor}`,
      }}
      type='button'
    />
  )
}

function GranularityButton({
  index,
  getActiveGranularityButtonStyle,
  granularity,
  setSelectedGranularityButton,
  handleGranularityFilterChange,
}: {
  index: number
  getActiveGranularityButtonStyle: (val: number) => string
  setSelectedGranularityButton: (val: number) => void
  granularity: TGranularity
  handleGranularityFilterChange?: (val: TGranularity) => void
}): JSX.Element {
  const onClick = useCallback(() => {
    setSelectedGranularityButton(index)
    if (handleGranularityFilterChange) {
      handleGranularityFilterChange(granularity)
    }
  }, [])

  return (
    <button
      className={`${getActiveGranularityButtonStyle(index)} ${
        styles.filterButton
      }`}
      onClick={onClick}
      type='button'
      key={`button-filter-${granularity}`}
    >
      {granularity}
    </button>
  )
}

export const EChartsLineChart = memo(function EChartsLineChart(
  props: TLineChartProps,
): JSX.Element {
  const {
    chartName,
    dataX,
    dataY,
    dataY1,
    dataY2,
    title,
    offset,
    periods,
    granularities,
    handlePeriodFilterChange,
    handleGranularityFilterChange,
    handleBgColorChange,
  } = props
  const currencyName = useCurrencyName()
  const downloadRef = useRef(null)
  const [csvData, setCsvData] = useState<string | Data>('')
  const [selectedPeriodButton, setSelectedPeriodButton] = useState(
    periods.length - 1,
  )
  const [selectedGranularityButton, setSelectedGranularityButton] = useState(0)
  const [selectedThemeButton, setSelectedThemeButton] = useState(0)
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>(
    themes[0],
  )
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>()
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>()
  const [minY, setMinY] = useState(0)
  const [maxY, setMaxY] = useState(0)

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance()
    setEChartInstance(chartInstance)
  }, [eChartRef])

  useEffect(() => {
    if (dataY?.length) {
      const min = Math.min(...dataY)
      const max = Math.max(...dataY)
      if (chartName === 'mempoolsize') {
        setMinY(Math.floor(min))
        setMaxY(Math.ceil(max))
      } else if (chartName === 'difficulty') {
        setMinY(Math.floor(min / offset) * offset)
        setMaxY(Math.ceil(max / offset) * offset)
      } else if (chartName === 'transactionfee') {
        setMinY(Math.round(min) - offset)
        setMaxY(Math.ceil(max / offset) * offset)
      } else {
        setMinY(Math.round(min) - offset)
        setMaxY(Math.floor(max) + offset)
      }
      if (dataX) {
        const data: Data = []
        dataY.map((yAxis, index) => {
          data.push({
            value: yAxis,
            time: dataX[index],
          })
        })
        setCsvData(data)
      }
    } else if (dataY1?.length && dataY2?.length) {
      if (dataX) {
        const data: Data = []
        dataY1.map((yAxis, index) => {
          data.push({
            value: `${yAxis} : ${dataY2[index]}`,
            time: dataX[index],
          })
        })
        setCsvData(data)
      }
    }
  }, [dataX, dataY])

  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    dataY1,
    dataY2,
    chartName: chartName,
    minY,
    maxY,
  }
  const options = getThemeInitOption(params)

  const downloadPNG = useCallback(() => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef.ele)
        .then(function (blob: Blob | null) {
          if (blob) {
            saveAs(blob, makeDownloadFileName(currencyName, chartName) + '.png')
          }
        })
        .catch(function (error) {
          const message: string = error?.message || ''
          throw new Error('PNG download error: ' + message)
        })
    }
  }, [])

  const handleThemeButtonClick = useCallback(
    (theme: TThemeColor, index: number) => {
      setCurrentTheme(theme)
      setSelectedThemeButton(index)
      handleBgColorChange(theme.backgroundColor)

      const params: TThemeInitOption = {
        theme: theme,
        dataX,
        dataY,
        chartName: chartName,
        minY,
        maxY,
      }
      const option = getThemeUpdateOption(params)
      eChartInstance?.setOption(option)
    },
    [currentTheme, selectedThemeButton],
  )

  const getActivePriodButtonStyle = useCallback((index: number): string => {
    if (selectedPeriodButton === index) {
      return styles.activeButton
    }
    return ''
  }, [])

  const getActiveGranularityButtonStyle = useCallback(
    (index: number): string => {
      if (selectedGranularityButton === index) {
        return styles.activeButton
      }
      return ''
    },
    [],
  )

  const getActiveThemeButtonStyle = useCallback((index: number): string => {
    if (selectedThemeButton === index) {
      return styles.activeThemeButton
    }
    return ''
  }, [])

  const handlePeriodSelect = useCallback((index: number, period: TPeriod) => {
    setSelectedPeriodButton(index)
    if (handlePeriodFilterChange) {
      handlePeriodFilterChange(period)
    }
  }, [])

  const onEChartRef = useCallback(
    (e: React.SetStateAction<ReactECharts | null | undefined>) => {
      setEChartRef(e)
    },
    [],
  )

  const renderDownloadButtonBar = () => (
    <div className={styles.lineChartDownloadButtonBar}>
      <button
        className={styles.uploadButton}
        type='button'
        onClick={downloadPNG}
      >
        Download PNG
      </button>
      <CSVLink
        data={csvData}
        filename={makeDownloadFileName(currencyName, chartName) + '.csv'}
        headers={csvHeaders[chartName]}
        separator={';'}
        ref={downloadRef}
        className={styles.uploadButton}
      >
        Download CSV
      </CSVLink>
    </div>
  )

  const renderPeriodSelect = () => (
    <div className={styles.periodSelect}>
      <span style={{ color: currentTheme?.color }}>Period: </span>
      {periods.map((period, index) => (
        <PeriodSelect
          key={`button-filter-${period}`}
          getActivePriodButtonStyle={getActivePriodButtonStyle}
          index={index}
          period={period}
          handlePeriodSelect={handlePeriodSelect}
        />
      ))}
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.lineChartHeader}>
        <PrevButton color='#c3921f' />
        <div
          className={styles.lineChartTitle}
          style={{ color: currentTheme?.color }}
        >
          {title}
        </div>
        {granularities && (
          <div className={styles.granularitySelect}>
            <span style={{ color: currentTheme?.color }}>Granularity: </span>
            {granularities?.map((granularity, index) => {
              return (
                <GranularityButton
                  key={`button-filter-${granularity}`}
                  granularity={granularity}
                  index={index}
                  getActiveGranularityButtonStyle={
                    getActiveGranularityButtonStyle
                  }
                  setSelectedGranularityButton={setSelectedGranularityButton}
                  handleGranularityFilterChange={handleGranularityFilterChange}
                />
              )
            })}
          </div>
        )}
        {renderPeriodSelect()}
      </div>
      <div className={styles.lineChartWrap}>
        <ReactECharts
          notMerge={false}
          lazyUpdate
          option={options}
          className={styles.reactECharts}
          ref={onEChartRef}
        />
      </div>
      <div className={styles.lineChartFooter}>
        <div className={styles.lineChartThemeSelect}>
          {themes.map((theme, index) => (
            <ThemeButton
              key={`button-filter-${theme.name}`}
              theme={theme}
              index={index}
              getActiveThemeButtonStyle={getActiveThemeButtonStyle}
              handleThemeButtonClick={handleThemeButtonClick}
            />
          ))}
        </div>
        {renderDownloadButtonBar()}
      </div>
    </div>
  )
})
