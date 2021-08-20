import { LabelKeyObject } from 'react-csv/components/CommonPropTypes'
import { TGranularity, TPeriod } from '../utils/PastelStatisticsLib'

export type TThemeColor = {
  name: string
  backgroundColor: string
  lineColor?: string
  splitLineColor: string
  color: string
  stack?: string
  smooth?: boolean
}

export type TLineChartProps = {
  chartName: string
  dataX?: string[]
  dataY?: number[]
  dataY1?: number[]
  dataY2?: number[]
  granularities?: TGranularity[]
  title?: string
  offset: number
  periods: TPeriod[]
  handleBgColorChange: (color: string) => void
  handlePeriodFilterChange?: (period: TPeriod) => void
  handleGranularityFilterChange?: (granularity: TGranularity) => void
}

export type TScatterChartProps = {
  chartName: string
  data: number[][]
  dataX: string[]
  title?: string
  info: {
    [key: string]: string | number
  }
  offset: number
  periods: TPeriod[]
  handleBgColorChange: (color: string) => void
  handlePeriodFilterChange?: (period: TPeriod) => void
  handleGranularityFilterChange?: (granularity: TGranularity) => void
}

export type TThemeInitOption = {
  theme?: TThemeColor | null
  data?: number[][]
  dataX?: string[]
  dataY?: number[]
  dataY1?: number[]
  dataY2?: number[]
  chartName: string
  minY: number
  maxY: number
}

export type TCsvHeaderType = {
  [key: string]: LabelKeyObject[]
}
