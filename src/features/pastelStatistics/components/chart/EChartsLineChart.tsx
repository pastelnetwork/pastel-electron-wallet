import React, { useEffect, useRef, useState } from 'react'
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
} from '../../common/types'
import { makeDownloadFileName } from '../../utils/PastelStatisticsLib'

import styles from './LineChart.module.css'
import {
  getThemeInitOption,
  getThemeUpdateOption,
} from '../../utils/ChartOptions'

export const EChartsLineChart = (props: TLineChartProps): JSX.Element => {
  const {
    chartName,
    dataX,
    dataY,
    title,
    info,
    offset,
    periods,
    handlePeriodFilterChange,
    handleBgColorChange,
  } = props
  const downloadRef = useRef(null)
  const [csvData, setCsvData] = useState<string | Data>('')
  const [selectedPeriodButton, setSelectedPeriodButton] = useState(0)
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
    if (dataY?.length) {
      const min = Math.min(...dataY)
      const max = Math.max(...dataY)
      setMinY(Math.round(min) - offset)
      setMaxY(Math.floor(max) + offset)
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

  const params: TThemeInitOption = {
    theme: currentTheme,
    dataX,
    dataY,
    chartName: chartName,
    minY,
    maxY,
  }
  const options = getThemeInitOption(params)

  const downloadPNG = () => {
    if (eChartRef?.ele) {
      htmlToImage
        .toBlob(eChartRef.ele)
        .then(function (blob: Blob | null) {
          if (blob) {
            saveAs(
              blob,
              makeDownloadFileName(info.currencyName, chartName) + '.png',
            )
          }
        })
        .catch(function (error) {
          throw new Error('PNG download error: ' + error)
        })
    }
  }

  const handleThemeButtonClick = (theme: TThemeColor, index: number) => {
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
              className={`${
                styles.themeSelectButton
              } ${getActiveThemeButtonStyle(index)}`}
              onClick={() => handleThemeButtonClick(theme, index)}
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
            filename={
              makeDownloadFileName(info.currencyName, chartName) + '.csv'
            }
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
