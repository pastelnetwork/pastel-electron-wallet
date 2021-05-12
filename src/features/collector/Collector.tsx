import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type LocationState = {
  param: string
}

export default function Collector(): JSX.Element {
  const location = useLocation<LocationState>()
  const [param, setParam] = useState('')

  useEffect(() => {
    if (location.state) {
      setParam(location.state?.param)
    }
  }, [location])

  return (
    <div>
      <h1>Collector</h1>
      <p>Param: {param}</p>
    </div>
  )
}
