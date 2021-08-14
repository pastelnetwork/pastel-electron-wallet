import React, { useEffect, useState } from 'react'

export type TCountdownTimerProps = {
  countDownDate?: number
  className?: string
}

type TTimeProps = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({
  countDownDate,
  className,
}: TCountdownTimerProps): JSX.Element | null {
  if (!countDownDate) {
    return null
  }

  const [time, setTime] = useState<TTimeProps>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  let token: NodeJS.Timer

  const updateTime = () => {
    const now = new Date().getTime()
    const distance = countDownDate - now
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (distance > 0) {
      setTime({
        days,
        hours,
        minutes,
        seconds,
      })
    } else {
      setTime({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      })
      clearInterval(token)
    }
  }

  useEffect(() => {
    token = setInterval(updateTime, 1000)

    return () => {
      clearInterval(token)
    }
  }, [])

  return (
    <span className={className}>
      {time.days > 0 ? `${time.days}d ` : ''}
      {time.hours}h {time.minutes}m {time.seconds}s
    </span>
  )
}
