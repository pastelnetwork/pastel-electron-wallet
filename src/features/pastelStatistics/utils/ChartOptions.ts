import * as echarts from 'echarts'
import { EChartsOption } from 'echarts-for-react'
import { TThemeInitOption } from '../common/types'

type TChartOption = {
  [index: string]: EChartsOption
}

export function getThemeInitOption(args: TThemeInitOption): EChartsOption {
  const { theme, dataX, dataY, dataY1, dataY2, chartName, minY, maxY } = args
  const chartOptions: TChartOption = {
    difficulty: {
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
            color: theme?.splitLineColor,
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value: string) {
            return Number.parseFloat(value).toFixed(2)
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
    },
    hashrate: {
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
            color: theme?.splitLineColor,
          },
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter: function (value: string) {
            return Number.parseFloat(value).toFixed(2)
          },
        },
      },
      series: {
        type: 'line',
        sampling: 'lttb',
        smooth: true,
        symbol: false,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: '#ff5500',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 85, 0, 0.5)',
            },
            {
              offset: 1,
              color: '#000',
            },
          ]),
        },
        data: dataY,
      },
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
    network_totals: {
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
        data: ['Traffic receive', 'Traffic sent'],
        textStyle: {
          color: theme?.color,
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
            color: theme?.splitLineColor,
          },
        },
        axisLabel: {
          formatter: function (value: string) {
            const val = Number.parseFloat(value)
            return `${val / 1000000} M`
          },
        },
        axisLine: {
          show: true,
        },
      },
      series: [
        {
          name: 'Traffic receive',
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
                color: '#80ffa5',
              },
              {
                offset: 1,
                color: '#00BFEC',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: dataY1,
        },
        {
          name: 'Traffic sent',
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
                color: '#37a2ff',
              },
              {
                offset: 1,
                color: '#7415db',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: dataY2,
        },
      ],
      stateAnimation: {
        duration: 300,
        easing: 'cubicOut',
      },
    },
  }

  return chartOptions[chartName]
}

export function getThemeUpdateOption(args: TThemeInitOption): EChartsOption {
  const { theme, dataY, chartName } = args
  const defaultOption: EChartsOption = {
    backgroundColor: theme?.backgroundColor,
    textStyle: {
      color: theme?.color,
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: theme?.splitLineColor,
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
        smooth: theme?.smooth,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.5)',
          shadowBlur: 10,
          shadowOffsetY: 8,
        },
      },
    ],
  }
  const netTotalsOption: EChartsOption = {
    backgroundColor: theme?.backgroundColor,
    textStyle: {
      color: theme?.color,
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: theme?.splitLineColor,
        },
      },
      axisLine: {
        show: true,
      },
    },
    legend: {
      textStyle: {
        color: theme?.color,
      },
    },
  }
  const chartOptions: TChartOption = {
    difficulty: defaultOption,
    hashrate: defaultOption,
    network_totals: netTotalsOption,
  }

  return chartOptions[chartName]
}
