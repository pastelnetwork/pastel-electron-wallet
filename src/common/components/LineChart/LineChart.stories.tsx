import React from 'react'
import { Story, Meta } from '@storybook/react'
import LineChart, { TChartProps } from './LineChart'

import dayjs from 'dayjs'

export default {
  title: 'LineChart',
  component: LineChart,
} as Meta

const Template: Story<TChartProps> = ({ ...args }) => <LineChart {...args} />

const data1 = Array.from({ length: 100 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs()
      .subtract(50 - index, 'day')
      .startOf('day')
      .toDate(),
  }
})

const data2 = Array.from({ length: 100 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs()
      .subtract(50 - index, 'day')
      .startOf('day')
      .toDate(),
  }
})

export const WeeklyLineChart = Template.bind({})

WeeklyLineChart.args = {
  data1: data1,
  data2: data2,
  height: 300,
  width: 600,
  type: 'week',
  data1Label: 'Total Views',
  data2Label: 'Likes',
  margin: {
    left: 100,
    right: 100,
    top: 50,
    bottom: 40,
  },
}

export const MonthlyLineChart = Template.bind({})

const demoMonthlyData = Array.from({ length: 20 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs().startOf('year').add(index, 'month').toDate(),
  }
})

const demoMonthlyData2 = Array.from({ length: 20 }).map((_, index) => {
  return {
    value: Math.floor(Math.random() * (800 - 100) + 100),
    date: dayjs().startOf('year').add(index, 'month').toDate(),
  }
})

MonthlyLineChart.args = {
  data1: demoMonthlyData,
  data2: demoMonthlyData2,
  data1Label: 'Average Sale Price per NFT Copy (PSL)',
  data2Label: 'Total NFT Copies Sold',
  height: 300,
  width: 600,
  type: 'month',
  label1className: 'bg-blue-ac',
  label2className: 'bg-gradient-to-t from-blue-9b to-red-f8',
  margin: {
    left: 100,
    right: 100,
    top: 50,
    bottom: 40,
  },
}
