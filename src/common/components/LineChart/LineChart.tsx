import React, { useEffect } from 'react'
import * as d3 from 'd3'
import dayjs from 'dayjs'
import cn from 'classnames'

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
  label1className?: string
  label2className?: string
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
  } else if (type === 'month') {
    return data.filter(
      item =>
        !(dayjs(item.date).diff(dayjs().startOf('year')) < 0) &&
        !(dayjs().endOf('year').diff(dayjs(item.date)) < 0),
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
  data1Label = 'Total Views',
  data2Label = 'Likes',
  barChartWidth = 33,
  type = 'month',
  label1className = 'bg-blue-37',
  label2className = 'bg-red-ff',
}: TChartProps): JSX.Element => {
  useEffect(() => {
    const data: TLineChartRow[] = filterData(data1, type)
    const svg = d3
      .select('#container')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    const extent = []
    if (type === 'week') {
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
    } else if (type === 'month') {
      extent.push(dayjs().startOf('year'))
      extent.push(dayjs().endOf('year'))
    }
    if (extent[0]) {
      const x = d3.scaleTime().domain(extent).range([0, width])
      const formatTime = d3.timeFormat(`${type === 'week' ? '%a' : '%b'}`)
      const xAxis = d3
        .axisBottom(x)
        .tickArguments(type === 'week' ? [7] : [12])
        .tickFormat(d => {
          const date = new Date(d.toString())
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
            .attr('strokeWidth', 1)
          g.selectAll('.tick text')
            .attr('dy', 15)
            .attr('class', 'text-gray-71 text-13px')
        })
      const maxValue = d3.max(data, function (d) {
        return +d.value
      })
      if (maxValue) {
        const y = d3
          .scaleLinear()
          .domain([0, maxValue + maxValue / 5])
          .range([height, 0])
        const yAxis = d3.axisRight(y).tickSize(width).tickArguments([4])
        svg.append('g').call(g => {
          g.call(yAxis)
          g.select('.domain').remove()
          g.selectAll('.tick line')
            .attr('x1', -30)
            .attr('x2', width + 30)
            .attr('stroke', '#DFE5EE')
            .attr('strokeDasharray', '5,5')
          g.selectAll('.tick text')
            .attr('x', -60)
            .attr('dy', 5)
            .attr('class', 'text-gray-71 text-13px')
        })
        if (data2) {
          const secondData = filterData(data2, type)
          const selection = svg.selectAll('rect').data(secondData)
          selection
            .enter()
            .append('rect')
            .attr('x', d => x(d.date) - barChartWidth / 2)
            .attr('y', 0)
            .attr('width', barChartWidth)
            .attr('height', 0)
            .attr(
              'fill',
              type === 'week' ? 'url(#gradient1)' : 'url(#gradient2)',
            )
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
          .attr('fill', '#334D6E')
          .attr('width', 57)
          .attr('height', 32)
          .attr('x', -28)
          .attr('y', -45)
          .attr('rx', 4)
          .attr('ry', 4)
        tooltipContainer
          .append('text')
          .attr('class', 'tooltip-value font-medium text-xs')
          .attr('stroke', '#ffffff')
          .attr('x', -13)
          .attr('y', -25)
        tooltipContainer
          .append('path')
          .attr(
            'd',
            'M0 0L2.58579 2.58579C3.36684 3.36684 4.63317 3.36683 5.41421 2.58579L8 0H0Z',
          )
          .attr('fill', '#334D6E')
          .attr('y', '-10')
          .attr('transform', 'translate(-5,-14)')

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
              id='gradient1'
              x1='16.5'
              y1='0'
              x2='16.5'
              y2={height}
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.29913' stopColor='#D4B9FF' />
              <stop offset='1' stopColor='#FF82AC' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='gradient2'
              x1='16.5'
              y1='0'
              x2='16.5'
              y2={height}
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.29913' stopColor='#9FDDFF' />
              <stop offset='1' stopColor='#FF82AC' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className='flex justify-center mt-6'
        style={{ width: width + margin.left + margin.right }}
      >
        <div className='text-gray-2d font-medium text-sm flex items-center mr-61px'>
          <div
            className={cn('w-2 h-2 rounded-full mr-1.5', label1className)}
          ></div>
          {data1Label}
        </div>
        {!!data2 && (
          <div className='text-gray-2d font-medium text-sm flex items-center'>
            <div
              className={cn('w-2 h-2 rounded-full mr-1.5', label2className)}
            ></div>
            {data2Label}
          </div>
        )}
      </div>
    </div>
  )
}

export default LineChart
