import React from 'react'
import ContentLoader from 'react-content-loader'
import cn from 'classnames'

export type TProps = {
  className?: string
  colorClass?: string
  width?: number
  height?: number
  radius?: number
}

export default function RectangleLoader({
  className = 'h-2.5',
  colorClass,
  width = 100,
  height = 10,
  radius = 4,
}: TProps): JSX.Element {
  return (
    <ContentLoader
      className={cn(className, colorClass)}
      backgroundColor={colorClass ? 'currentColor' : undefined}
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect x='0' y='0' rx={radius} ry={radius} width={width} height={height} />
    </ContentLoader>
  )
}
