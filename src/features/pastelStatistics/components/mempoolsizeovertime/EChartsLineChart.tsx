import React, { useState, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import { CSVLink } from 'react-csv'

import styles from '../chart/LineChart.module.css'
import { Data } from 'react-csv/components/CommonPropTypes'
import { TPeriod } from '../../utils/PastelStatisticsLib'

type TThemeColor = {
  name: string
  backgroundColor: string
  lineColor?: string
  splitLineColor: string
  color: string
  stack?: string
  smooth?: boolean
}

type LineChartProps = {
  dataX?: string[]
  dataY?: number[]
  title?: string
  periodIndex: number
  handlePeriodFilterChange?: (period: TPeriod) => void
  handleBgColorChange: (color: string) => void
}

export const EChartsLineChart = (props: LineChartProps): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>()
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>()
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>()
  const {
    dataX,
    dataY,
    title,
    periodIndex,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
  const [minY, setMinY] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const periods: TPeriod[][] = [
    ['2h', '2d', '4d', 'all'],
    ['30d', '60d', '180d', '1y', 'all'],
  ]
  const themes = [
    {
      name: 'theme1',
      backgroundColor: '#191c24',
      splitLineColor: '#202021',
      color: '#abaac1',
    },
    {
      name: 'theme2',
      backgroundColor: '#FFF7C6',
      stack: 'confidence-band',
      splitLineColor: '#C7C4CC',
      smooth: true,
      color: '#100c2a',
    },
    {
      name: 'theme3',
      backgroundColor: '#FFF',
      splitLineColor: '#EEE',
      color: '#202021',
    },
  ]

  useEffect(() => {
    const chartInstance = eChartRef?.getEchartsInstance()
    setEChartInstance(chartInstance)
  }, [eChartRef])

  useEffect(() => {
    if (dataY?.length) {
      const min = Math.min(...dataY)
      const max = Math.max(...dataY)
      setMinY(min - 0.1)
      setMaxY(max + 0.1)
    }
  }, [dataY])

  const [csvData] = useState<string | Data>('')
  const csvHeaders = [
    { label: 'Value', key: 'value' },
    { label: 'Created time', key: 'time' },
  ]
  const downloadRef = useRef(null)
  const options = {
    grid: {
      top: 8,
      right: 8,
      bottom: 40,
      left: 70,
      show: false,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: dataX,
    },
    yAxis: {
      type: 'value',
      min: minY,
      max: maxY,
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
          const val = Number(value).toFixed(2)
          return `${val} k`
        },
      },
    },
    series: {
      type: 'line',
      sampling: 'lttb',
      lineStyle: {
        color: 'rgb(23,105,135)',
      },
      smooth: true,
      symbol: false,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(26, 67, 105, 1)',
          },
          {
            offset: 1,
            color: 'rgba(26, 39, 42, 0.3)',
          },
        ]),
      },
      data: dataY,
    },
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut',
    },
  }
  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef?.ele)
        .then(function (blob: Blob | null) {
          if (blob) {
            saveAs(blob, 'linechart-image.png')
          }
        })
        .catch(function (error) {
          throw new Error('PNG download error: ' + error)
        })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.lineChartHeader}>
        <div
          className={styles.lineChartTitle}
          style={{ color: currentTheme?.color }}
        >
          {title}
        </div>
        <div className={styles.periodSelect}>
          <span style={{ color: currentTheme?.color }}>period: </span>
          {periods[periodIndex] &&
            periods[periodIndex].map(period => (
              <button
                className={styles.filterButton}
                onClick={() => {
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
      </div>
      <div className={styles.lineChartWrap}>
        <ReactECharts
          notMerge={false}
          lazyUpdate={true}
          option={options}
          className={styles.reactECharts}
          ref={e => {
            setEChartRef(e)
          }}
        />
      </div>
      <div className={styles.lineChartFooter}>
        <div className={styles.lineChartThemeSelect}>
          {themes.map(theme => (
            <button
              className={styles.themeSelectButton}
              onClick={() => {
                setCurrentTheme(theme)
                handleBgColorChange(theme.backgroundColor)
                const option = {
                  backgroundColor: theme.backgroundColor,
                  textStyle: {
                    color: theme.color,
                  },
                  yAxis: {
                    splitLine: {
                      lineStyle: {
                        color: theme.splitLineColor,
                      },
                    },
                    axisLine: {
                      show: true,
                    },
                  },
                }
                eChartInstance?.setOption(option, false)
              }}
              style={{ backgroundColor: `${theme.backgroundColor}` }}
              type='button'
              key={`button-filter-${theme.name}`}
            ></button>
          ))}
        </div>
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
            headers={csvHeaders}
            separator={';'}
            ref={downloadRef}
            className={styles.uploadButton}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
    </div>
  )
}
