import React, { useEffect } from 'react'
import * as d3 from 'd3'

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
}

const LineChart = ({
  data1,
  height = 300,
  width = 600,
  data2,
  margin,
  data1Label = 'View',
  data2Label = 'Likes',
}: TChartProps): JSX.Element => {
  useEffect(() => {
    const data: TLineChartRow[] = data1
    const svg = d3
      .select('#container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const extent = d3.extent(data, function (d) {
      return d.date
    })
    if (extent[0]) {
      const x = d3.scaleTime().domain(extent).range([0, width])
      const formatTime = d3.timeFormat('%b')
      const xAxis = d3.axisBottom(x).tickFormat(d => {
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
            .attr('stroke', '#DFE5EE')
            .attr('stroke-dasharray', '5,5')
          g.selectAll('.tick text')
            .attr('x', -25)
            .attr('dy', 5)
            .attr('class', 'text-gray-71 text-13px')
        })
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
        if (data2) {
          svg
            .append('path')
            .datum(data2)
            .attr('fill', 'none')
            .attr('stroke', '#FF82AC')
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
        }
        const tooltipContainer = svg
          .append('g')
          .attr('class', 'focus')
          .style('display', 'none')
        tooltipContainer.append('circle').attr('r', 6)
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
      <div id='container'></div>
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
