import React from 'react'
import { Story, Meta } from '@storybook/react'
import LineChart, { TChartProps } from './LineChart'

export default {
  title: 'LineChart',
  component: LineChart,
} as Meta

const Template: Story<TChartProps> = ({ ...args }) => <LineChart {...args} />

export const SimpleLineChart = Template.bind({})
SimpleLineChart.args = {
  data1: [
    {
      value: 10,
      date: new Date('2020-07-01'),
    },
    {
      value: 210,
      date: new Date('2020-08-01'),
    },
    {
      value: 580,
      date: new Date('2020-09-01'),
    },
    {
      value: 800,
      date: new Date('2020-10-01'),
    },
    {
      value: 350,
      date: new Date('2020-11-01'),
    },
    {
      value: 600,
      date: new Date('2020-12-01'),
    },
    {
      value: 600,
      date: new Date('2021-01-01'),
    },
    {
      value: 500,
      date: new Date('2021-02-01'),
    },
  ],
  data2: [
    {
      value: 8,
      date: new Date('2020-07-01'),
    },
    {
      value: 180,
      date: new Date('2020-08-01'),
    },
    {
      value: 500,
      date: new Date('2020-09-01'),
    },
    {
      value: 780,
      date: new Date('2020-10-01'),
    },
    {
      value: 300,
      date: new Date('2020-11-01'),
    },
    {
      value: 560,
      date: new Date('2020-12-01'),
    },
    {
      value: 560,
      date: new Date('2021-01-01'),
    },
    {
      value: 460,
      date: new Date('2021-02-01'),
    },
  ],
  height: 300,
  width: 600,
  margin: {
    left: 100,
    right: 100,
    top: 50,
    bottom: 40,
  },
}
