import React, { useEffect } from 'react'
import * as d3 from 'd3'
import dayjs from 'dayjs'

export type TLineChartRow = {
  date: Date
  value: number
}
type TMarginType = {
  left: number
  right: number
  top: number
  bottom: number
}

export type TChartProps = {
  data1: Array<TLineChartRow>
  data2?: Array<TLineChartRow>
  height?: number
  width?: number
  margin: TMarginType
  data1Label?: string
  data2Label?: string
  barChartWidth?: number
  type: 'week' | 'month' | 'year'
}

const filterData = (
  data: TLineChartRow[],
  type: 'week' | 'month' | 'year',
): Array<TLineChartRow> => {
  if (type === 'week') {
    return data.filter(
      item =>
        dayjs(item.date).diff(dayjs().subtract(dayjs().day(), 'day')) > 0 &&
        dayjs()
          .add(7 - dayjs().day(), 'day')
          .diff(dayjs(item.date)) > 0,
    )
  } else {
    return []
  }
}

const LineChart = ({
  data1,
  height = 300,
  width = 600,
  data2,
  margin,
  data1Label = 'View',
  data2Label = 'Likes',
  barChartWidth = 33,
}: TChartProps): JSX.Element => {
  console.log(dayjs().subtract(dayjs().day() + 1, 'day'))
  useEffect(() => {
    const data: TLineChartRow[] = filterData(data1, 'week')
    const svg = d3
      .select('#container')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    const extent = []

    extent.push(
      dayjs()
        .subtract(dayjs().day() - 1, 'day')
        .startOf('day'),
    )
    extent.push(
      dayjs()
        .add(7 - dayjs().day(), 'day')
        .startOf('day'),
    )
    if (extent[0]) {
      const x = d3.scaleTime().domain(extent).range([0, width])
      const formatTime = d3.timeFormat('%A')
      const xAxis = d3
        .axisBottom(x)
        .tickArguments([7])
        .tickFormat(d => {
          const date = new Date(d.toString())
          console.log(d)
          return formatTime(date)
        })

      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(g => {
          g.call(xAxis)
          g.select('.domain').remove()
          g.selectAll('.tick line')
            .attr('stroke', '#4F4F4F')
            .attr('stroke-width', 1)
          g.selectAll('.tick text')
            .attr('dy', 15)
            .attr('class', 'text-gray-71 text-13px')
        })
      const maxValue = d3.max(data, function (d) {
        return +d.value
      })
      if (maxValue) {
        const y = d3.scaleLinear().domain([0, maxValue]).range([height, 0])
        const yAxis = d3.axisRight(y).tickSize(width).tickArguments([4])
        svg.append('g').call(g => {
          g.call(yAxis)
          g.select('.domain').remove()
          g.selectAll('.tick line')
            .attr('x1', -30)
            .attr('x2', width + 30)
            .attr('stroke', '#DFE5EE')
            // .attr('stroke', 'red')
            .attr('stroke-dasharray', '5,5')
          g.selectAll('.tick text')
            .attr('x', -60)
            .attr('dy', 5)
            .attr('class', 'text-gray-71 text-13px')
        })
        if (data2) {
          const secondData = filterData(data2, 'week')
          const selection = svg.selectAll('rect').data(secondData)
          selection
            .enter()
            .append('rect')
            .attr('x', d => x(d.date) - barChartWidth / 2)
            .attr('y', 0)
            .attr('width', barChartWidth)
            .attr('height', 0)
            .attr('fill', 'url(#paint0_linear)')
            .attr('rx', 4)
            .transition()
            .duration(300)
            .attr('height', d => height - y(d.value))
            .attr('y', d => y(d.value))
          svg
            .selectAll('text.title')
            .data(secondData)
            .enter()
            .append('text')
            .attr('class', 'barchart-label text-xs font-medium')
            .attr('stroke', '#A0AEC0')
            .attr('x', d => x(d.date) - barChartWidth / 3)
            .attr('y', height - 17)
            .text(function (d) {
              return d.value
            })
        }

        svg
          .append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', '#3754DB')
          .attr('stroke-width', 3)
          .attr(
            'd',
            d3
              .line<TLineChartRow>()
              .x(function (d) {
                return x(d.date)
              })
              .y(function (d) {
                return y(d.value)
              })
              .curve(d3.curveCardinal),
          )

        const tooltipContainer = svg
          .append('g')
          .attr('class', 'focus')
          .style('display', 'none')
        tooltipContainer.append('circle').attr('r', 10).attr('fill', '#D7DEFF')
        tooltipContainer.append('circle').attr('r', 8).attr('fill', '#3754DB')
        tooltipContainer.append('text').attr('x', 15).attr('dy', '.31em')
        tooltipContainer
          .append('rect')
          .attr('fill', '#141416')
          .attr('fill-opacity', 0.88)
          .attr('width', 57)
          .attr('height', 28)
          .attr('x', -28)
          .attr('y', -45)
          .attr('rx', 4)
          .attr('ry', 4)
        tooltipContainer
          .append('text')
          .attr('class', 'tooltip-value')
          .attr('stroke', '#ffffff')
          .attr('x', -13)
          .attr('y', -25)
        tooltipContainer
          .append('path')
          .attr(
            'd',
            'M0 0L2.58579 2.58579C3.36684 3.36684 4.63317 3.36683 5.41421 2.58579L8 0H0Z',
          )
          .attr('fill', '#141416')
          .attr('fill-opacity', 0.88)
          .attr('y', '-10')
          .attr('transform', 'translate(0,-17)')

        const bisectDate = d3.bisector(function (d: TLineChartRow) {
          return d.date
        }).left
        svg
          .append('rect')
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .attr('width', width)
          .attr('height', height)
          .on('mouseover', function () {
            tooltipContainer.style('display', null)
          })
          .on('mouseout', function () {
            tooltipContainer.style('display', 'none')
          })
          .on('mousemove', () => {
            const x0 = x.invert(d3.pointer(event)[0])
            const i = bisectDate(data, x0, 1)
            const d0 = data[i - 1]
            const d1 = data[i]
            const d = +x0 - +d0.date > +d1.date - +x0 ? d1 : d0
            tooltipContainer.attr(
              'transform',
              'translate(' + x(d.date) + ',' + y(d.value) + ')',
            )
            tooltipContainer.select('.tooltip-value').text(d.value)
          })
      }
    }
  }, [])

  return (
    <div>
      <div>
        <svg id='container'>
          <defs>
            <linearGradient
              id='paint0_linear'
              x1='16.5'
              y1='0'
              x2='16.5'
              y2={height}
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.29913' stop-color='#D4B9FF' />
              <stop offset='1' stop-color='#FF82AC' stop-opacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className='flex justify-center'
        style={{ width: width + margin.left + margin.right }}
      >
        <div className='text-gray-2d font-medium text-sm flex items-center mr-61px'>
          <div className='w-2 h-2 rounded-full bg-blue-37 mr-1.5'></div>
          {data1Label}
        </div>
        {!!data2 && (
          <div className='text-gray-2d font-medium text-sm flex items-center'>
            <div className='w-2 h-2 rounded-full bg-red-ff mr-1.5'></div>
            {data2Label}
          </div>
        )}
      </div>
    </div>
  )
}

export default LineChart
