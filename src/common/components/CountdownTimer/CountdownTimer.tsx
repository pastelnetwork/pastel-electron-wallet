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
  const [time, setTime] = useState<TTimeProps>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  let token: NodeJS.Timer | null = null

  const updateTime = () => {
    if (!countDownDate) {
      return
    }

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
      if (token) {
        clearInterval(token)
      }
    }
  }

  useEffect(() => {
    if (countDownDate) {
      token = setInterval(updateTime, 1000)
    }

    return () => {
      if (token) {
        clearInterval(token)
      }
    }
  }, [])

  if (!countDownDate) {
    return null
  }

  const strDays: string = time.days?.toString() || ''

  return (
    <span className={className}>
      {time.days > 0 ? `${strDays}d ` : ''}
      {time.hours}h {time.minutes}m {time.seconds}s
    </span>
  )
}
