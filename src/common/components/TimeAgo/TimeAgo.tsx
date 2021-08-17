import React from 'react'
import cn from 'classnames'

export type TTimeAgoProps = {
  date: number
  className?: string
}

export default function TimeAgo({
  date,
  className,
}: TTimeAgoProps): JSX.Element {
  const now = new Date().getTime()
  const distance = now - date
  const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 30 * 365))
  const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  )
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

  if (months > 12) {
    return <div className={cn(className)}>{years}year(s) ago</div>
  }

  if (days > 30) {
    return <div className={cn(className)}>{months}month(s) ago</div>
  }

  return (
    <div className={cn(className)}>
      {days}d {hours}h {minutes}m ago
    </div>
  )
}
