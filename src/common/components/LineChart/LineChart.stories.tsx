import React from 'react'
import { Story, Meta } from '@storybook/react'
import LineChart, { TChartProps } from './LineChart'

import dayjs from 'dayjs'

export default {
  title: 'LineChart',
  component: LineChart,
} as Meta

const Template: Story<TChartProps> = ({ ...args }) => <LineChart {...args} />

export const SimpleLineChart = Template.bind({})

console.log('printed')
console.log(dayjs().subtract(dayjs().day(), 'day').toDate())

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

SimpleLineChart.args = {
  data1: data1,
  data2: data2,
  height: 300,
  width: 600,
  margin: {
    left: 100,
    right: 100,
    top: 50,
    bottom: 40,
  },
}
