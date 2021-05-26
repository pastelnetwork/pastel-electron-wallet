import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import { saveAs } from 'file-saver'
import * as htmlToImage from 'html-to-image'
import React, { useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { Data } from 'react-csv/components/CommonPropTypes'
import { TPeriod } from '../../utils/PastelStatisticsLib'

import styles from './LineChart.module.css'

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
  handleBgColorChange: (color: string) => void
  handlePeriodFilterChange?: (period: TPeriod) => void
}

export const EChartsLineChart = (props: LineChartProps): JSX.Element => {
  const [csvData, setCsvData] = useState<string | Data>('')
  const csvHeaders = [
    { label: 'Value', key: 'value' },
    { label: 'Created time', key: 'time' },
  ]
  const downloadRef = useRef(null)
  const [selectedPeriodButton, setSelectedPeriodButton] = useState(0)
  const [selectedThemeButton, setSelectedThemeButton] = useState(0)
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
    if (dataY?.length) {
      const min = Math.min(...dataY)
      const max = Math.max(...dataY)
      if (title === 'PSL Prices') {
        setMinY(Math.round(min) - 1)
        setMaxY(Math.floor(max) + 1)
      } else {
        setMinY(Math.round(min) - 1000)
        setMaxY(Math.floor(max) + 1000)
      }
      if (dataX) {
        const data: Data = []
        dataY.map((o, index) => {
          data.push({
            value: o,
            time: dataX[index],
          })
        })
        setCsvData(data)
      }
    }
  }, [dataX, dataY])

  const options = {
    grid: {
      top: 8,
      right: 8,
      bottom: 40,
      left: 70,
      show: false,
    },
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: minY,
      max: maxY,
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
          return Number.parseFloat(value).toExponential(2)
        },
      },
    },
    series: {
      type: 'line',
      showSymbol: false,
      data: dataY,
      lineStyle: {
        width: 3,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowBlur: 10,
        shadowOffsetY: 12,
      },
    },
    stateAnimation: {
      duration: 300,
      easing: 'cubicOut',
    },
  }
  const makeDownloadFileName = (): string => {
    let imageTitle = ''
    const date = new Date()

    if (title === 'Network Difficulty') {
      imageTitle = 'Network_Difficulty'
    } else if (title === 'PSL Prices') {
      imageTitle = 'Prices'
    }

    const dateTime = `${
      date.getMonth() + 1
    }_${date.getDate()}_${date.getFullYear()}__${date.getHours()}_${date.getMinutes()}`

    return `PSL_${imageTitle}_${dateTime}`
  }
  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef?.ele)
        .then(function (blob: Blob | null) {
          if (blob) {
            saveAs(blob, makeDownloadFileName() + '.png')
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
            periods[periodIndex].map((period, index) => (
              <button
                className={`${
                  selectedPeriodButton == index ? styles.activeButton : ''
                } ${styles.filterButton}`}
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
          {themes.map((theme, index) => (
            <button
              className={`${styles.themeSelectButton} ${
                selectedThemeButton === index ? styles.activeThemeButton : ''
              }`}
              onClick={() => {
                setCurrentTheme(theme)
                setSelectedThemeButton(index)
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
                  series: [
                    {
                      type: 'line',
                      showSymbol: false,
                      data: dataY,
                      smooth: theme.smooth,
                      lineStyle: {
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.5)',
                        shadowBlur: 10,
                        shadowOffsetY: 8,
                      },
                    },
                  ],
                }
                eChartInstance?.setOption(option)
              }}
              style={{
                backgroundColor: `${theme.backgroundColor}`,
              }}
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
            filename={makeDownloadFileName() + '.csv'}
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
