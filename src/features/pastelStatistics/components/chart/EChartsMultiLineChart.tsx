import React, { useState, useEffect, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import * as htmlToImage from 'html-to-image'
import * as echarts from 'echarts'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { saveAs } from 'file-saver'
import styles from './LineChart.module.css'
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
  dataY1?: number[]
  dataY2?: number[]
  title?: string
  handlePeriodFilterChange?: (period: TPeriod) => void
  handleBgColorChange: (color: string) => void
}

export const EChartsMultiLineChart = (props: LineChartProps): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<TThemeColor | null>()
  const [eChartRef, setEChartRef] = useState<ReactECharts | null>()
  const [eChartInstance, setEChartInstance] = useState<echarts.ECharts>()
  const {
    dataX,
    dataY1,
    dataY2,
    title,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
  const [minY1, setMinY1] = useState(0)
  const [minY2, setMinY2] = useState(0)
  const [maxY1, setMaxY1] = useState(0)
  const [maxY2, setMaxY2] = useState(0)
  const periods: TPeriod[] = ['2h', '2d', '4d', 'all']
  const themes = [
    {
      name: 'theme1',
      backgroundColor: '#100c2a',
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
    if (dataY1?.length && dataY2?.length) {
      const min = Math.min(...dataY1)
      const max = Math.min(...dataY1)
      const min1 = Math.min(...dataY2)
      const max1 = Math.min(...dataY2)
      if (title === 'PSL Prices') {
        setMinY1(min - 0.0001)
        setMaxY1(max + 0.0001)
        setMinY2(min1)
        setMaxY2(max1)
      }
    }
  }, [dataY1, dataY2])

  const [csvData] = useState<string | Data>('')
  const csvHeaders = [
    { label: 'Value', key: 'value' },
    { label: 'Created time', key: 'time' },
  ]
  const downloadRef = useRef(null)
  const options = {
    grid: {
      top: 50,
      right: 70,
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
    legend: {
      data: ['USD', 'BTC'],
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
        name: 'USD Price: ',
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
            return Number.parseFloat(value).toExponential(2)
          },
        },
      },
      {
        type: 'value',
        name: 'BTC Price: ',
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
            return Number.parseFloat(value).toExponential(2)
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
          {periods &&
            periods.map(period => (
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
                      name: 'USD: ',
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
                      name: 'BTC price: ',
                      yAxisIndex: 1,
                      showSymbol: false,
                      data: dataY2,
                    },
                  ],
                }
                eChartInstance?.setOption(option)
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
