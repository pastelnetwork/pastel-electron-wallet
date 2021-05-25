import React, { useState, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import * as htmlToImage from 'html-to-image'
import { CSVLink } from 'react-csv'
import { saveAs } from 'file-saver'
import { TPeriod } from '../../utils/PastelStatisticsLib'
import { Data } from 'react-csv/components/CommonPropTypes'
import styles from '../chart/LineChart.module.css'

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
  dataY1?: number[]
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
    dataY1,
    title,
    periodIndex,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
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

  const [csvData] = useState<string | Data>('')
  const csvHeaders = [
    { label: 'Value', key: 'value' },
    { label: 'Created time', key: 'time' },
  ]
  const downloadRef = useRef(null)
  const options = {
    color: ['#80FFA5', '#37A2FF'],
    grid: {
      top: 8,
      right: 8,
      bottom: 40,
      left: 70,
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      top: 10,
      right: 10,
      data: ['traffic recv', 'traffic sent'],
      textStyle: {
        color: '#FFF',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataX,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: currentTheme?.splitLineColor,
        },
      },
      axisLabel: {
        formatter: function (value: string) {
          return Number.parseFloat(value).toExponential(2)
        },
      },
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        name: 'traffic recv',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgba(1, 191, 236)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: dataY,
      },
      {
        name: 'traffic sent',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(55, 162, 255)',
            },
            {
              offset: 1,
              color: 'rgba(116, 21, 219)',
            },
          ]),
        },
        emphasis: {
          focus: 'series',
        },
        data: dataY1,
      },
    ],
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
                  legend: {
                    textStyle: {
                      color: theme.color,
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
