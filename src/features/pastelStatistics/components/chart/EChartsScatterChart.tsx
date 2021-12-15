import React, { useEffect, useRef, useState, memo, useCallback } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { csvHeaders, themes } from '../../common/constants'
import { useCurrencyName } from 'common/hooks/appInfo'
import { PrevButton } from '../PrevButton'
import {
  TScatterChartProps,
  TThemeColor,
  TThemeInitOption,
  TThemeButton,
} from '../../common/types'
import { makeDownloadFileName } from '../../utils/PastelStatisticsLib'
import {
  getThemeInitOption,
  getThemeUpdateOption,
} from '../../utils/ChartOptions'
import styles from './LineChart.module.css'

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
      key={`button-filter-${theme.name}`}
    />
  )
}

export const EChartsScatterChart = memo(function EChartsScatterChart(
  props: TScatterChartProps,
): JSX.Element {
  const {
    chartName,
    data,
    dataX,
    title,
    offset,
    periods,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
  const currencyName = useCurrencyName()
  const downloadRef = useRef(null)
  const [csvData, setCsvData] = useState<string | Data>('')
  const [selectedPeriodButton, setSelectedPeriodButton] = useState(
    periods.length - 1,
  )
  const [selectedThemeButton, setSelectedThemeButton] = useState(0)
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>()
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>()
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>()
  const [minY, setMinY] = useState(0)
  const [maxY, setMaxY] = useState(0)

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance()
    setEChartInstance(chartInstance)
  }, [eChartRef])

  useEffect(() => {
    if (data?.length) {
      const dataY = data.reduce((yAxis, item) => {
        yAxis.push(item[1])
        return yAxis
      }, [])
      const min = Math.min(...dataY)
      const max = Math.max(...dataY)
      setMinY(min - offset)
      setMaxY(max + offset)
      const dataCsv: Data = []
      data.map((row, index) => {
        dataCsv.push({
          height: row[0],
          transactions: row[1],
          time: dataX[index],
        })
      })
      setCsvData(dataCsv)
    }
  }, [data])

  const params: TThemeInitOption = {
    theme: currentTheme,
    data,
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

  const handleThemeButtonClick = (theme: TThemeColor, index: number) => {
    setCurrentTheme(theme)
    setSelectedThemeButton(index)
    handleBgColorChange(theme.backgroundColor)

    const params: TThemeInitOption = {
      theme: theme,
      data,
      minY,
      maxY,
      chartName: chartName,
    }
    const option = getThemeUpdateOption(params)
    eChartInstance?.setOption(option)
  }

  const getActivePriodButtonStyle = (index: number): string => {
    if (selectedPeriodButton === index) {
      return styles.activeButton
    }
    return ''
  }

  const getActiveThemeButtonStyle = (index: number): string => {
    if (selectedThemeButton === index) {
      return styles.activeThemeButton
    }
    return ''
  }

  const renderDownloadButton = () => (
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

  const renderThemes = () => (
    <div className={styles.lineChartThemeSelect}>
      {themes.map((theme, index) => (
        <ThemeButton
          key={`button-filter-${theme.name}`}
          getActiveThemeButtonStyle={getActiveThemeButtonStyle}
          index={index}
          theme={theme}
          handleThemeButtonClick={handleThemeButtonClick}
        />
      ))}
    </div>
  )

  const renderPeriod = () => (
    <div className={styles.periodSelect}>
      <span style={{ color: currentTheme?.color }}>period: </span>
      {periods.map((period, index) => (
        <button
          className={`${getActivePriodButtonStyle(index)} ${
            styles.filterButton
          }`}
          onClick={() => {
            setSelectedPeriodButton(index)
            if (handlePeriodFilterChange) {
              handlePeriodFilterChange(period)
            }
          }}
          type='button'
          key={`button-filter-${period}`}
        >
          {period}
        </button>
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
        {renderPeriod()}
      </div>
      <div className={styles.lineChartWrap}>
        <ReactECharts
          notMerge={false}
          lazyUpdate
          option={options}
          className={styles.reactECharts}
          ref={e => setEChartRef(e)}
        />
      </div>
      <div className={styles.lineChartFooter}>
        {renderThemes()}
        {renderDownloadButton()}
      </div>
    </div>
  )
})
