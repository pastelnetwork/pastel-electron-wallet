import React, { useState, useEffect, useRef, useCallback } from 'react'
import ReactECharts from 'echarts-for-react'
import * as htmlToImage from 'html-to-image'
import * as echarts from 'echarts'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { saveAs } from 'file-saver'
import { makeDownloadFileName, TPeriod } from '../../utils/PastelStatisticsLib'
import { TLineChartProps, TThemeColor, TThemeButton } from '../../common/types'
import { pricesCSVHeaders, themes } from '../../common/constants'
import { useCurrencyName } from 'common/hooks/appInfo'
import { PrevButton } from '../PrevButton'
import styles from './LineChart.module.css'

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
      className={`${getActivePriodButtonStyle(index)} 
          ${styles.filterButton}`}
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
      style={{ backgroundColor: `${theme.backgroundColor}` }}
      type='button'
    />
  )
}

export function EChartsMultiLineChart(props: TLineChartProps): JSX.Element {
  const {
    chartName,
    dataX,
    dataY1,
    dataY2,
    offset,
    periods,
    title,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
  const currencyName = useCurrencyName()
  const downloadRef = useRef(null)
  const [csvData, setCsvData] = useState<string | Data>('')
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>()
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>()
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>()
  const [selectedPeriodButton, setSelectedPeriodButton] = useState(
    periods.length - 1,
  )
  const [selectedThemeButton, setSelectedThemeButton] = useState(0)
  const [minY1, setMinY1] = useState(0)
  const [minY2, setMinY2] = useState(0)
  const [maxY1, setMaxY1] = useState(0)
  const [maxY2, setMaxY2] = useState(0)

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance()
    setEChartInstance(chartInstance)
  }, [eChartRef])

  useEffect(() => {
    if (dataY1?.length && dataY2?.length) {
      const min = Math.min(...dataY1)
      const max = Math.max(...dataY1)
      const min1 = Math.min(...dataY2)
      const max1 = Math.max(...dataY2)
      if (chartName === 'prices') {
        setMinY1(min - offset)
        setMaxY1(max + offset)
        setMinY2(min1)
        setMaxY2(max1)
        if (dataX) {
          const data: Data = []
          dataY1.map((o, index) => {
            data.push({
              usd: o,
              btc: dataY2[index],
              time: dataX[index],
            })
          })
          setCsvData(data)
        }
      }
    }
  }, [dataY1, dataY2])

  const options = {
    grid: {
      top: 50,
      right: 100,
      bottom: 40,
      left: 70,
      show: false,
    },
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: minY1,
      max: maxY1,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      data: dataX,
    },
    yAxis: [
      {
        type: 'value',
        name: 'USD Price',
        position: 'left',
        min: minY1,
        max: maxY1,
        splitLine: {
          lineStyle: {
            color: currentTheme?.splitLineColor,
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value: string) {
            return `$${Number.parseFloat(value).toFixed(5)}`
          },
        },
      },
      {
        type: 'value',
        name: 'BTC Price',
        position: 'right',
        min: minY2,
        max: maxY2,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value: string) {
            return Number.parseFloat(value).toFixed(10)
          },
        },
      },
    ],
    series: [
      {
        name: 'USD Price: ',
        type: 'line',
        showSymbol: false,
        data: dataY1,
      },
      {
        name: 'BTC Price: ',
        type: 'bar',
        yAxisIndex: 1,
        showSymbol: false,
        color: '#5470C6',
        barWidth: 5,
        data: dataY2,
      },
    ],
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut',
    },
  }

  const handlePeriodSelect = useCallback(
    () => (index: number, period: TPeriod) => {
      setSelectedPeriodButton(index)
      if (handlePeriodFilterChange) {
        handlePeriodFilterChange(period)
      }
    },
    [],
  )

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
      const option = {
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.color,
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            name: 'USD:',
            splitLine: {
              lineStyle: {
                color: theme.splitLineColor,
              },
            },
            axisLine: {
              show: true,
            },
          },
          {
            type: 'value',
            name: 'BTC price:',
            position: 'right',
            splitLine: {
              lineStyle: {
                color: theme.splitLineColor,
              },
            },
            axisLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: dataY1,
            smooth: theme.smooth,
            lineStyle: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.5)',
              shadowBlur: 10,
              shadowOffsetY: 8,
            },
          },
          {
            type: 'bar',
            yAxisIndex: 1,
            showSymbol: false,
            data: dataY2,
          },
        ],
      }
      eChartInstance?.setOption(option)
    },
    [currentTheme],
  )

  const getActivePriodButtonStyle = useCallback((index: number): string => {
    if (selectedPeriodButton === index) {
      return styles.activeButton
    }
    return ''
  }, [])

  const getActiveThemeButtonStyle = useCallback((index: number): string => {
    if (selectedThemeButton === index) {
      return styles.activeThemeButton
    }
    return ''
  }, [])

  const onEChartRef = useCallback(
    (e: React.SetStateAction<ReactECharts | null | undefined>) => {
      setEChartRef(e)
    },
    [],
  )

  const rendertDownloadButtonBar = () => (
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
        headers={pricesCSVHeaders}
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
        {rendertDownloadButtonBar()}
      </div>
    </div>
  )
}
