import React from 'react'
import DatePicker from './index'

export const DatePickerSingle = (): JSX.Element => {
  const [date, setDate] = React.useState<Date | null>(null)
  return (
    <DatePicker selected={date} onChange={setDate} placeholder='Choose date' />
  )
}

export const DatePickerRange = (): JSX.Element => {
  const [startDate, setStartDate] = React.useState<Date | null>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null>(null)

  const handleDate = (dates: [Date, Date] | null): void => {
    if (dates) {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
    }
  }

  return (
    <DatePicker
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      onChange={handleDate}
      label='Time range'
      selectsRange
    />
  )
}

export default {
  component: DatePicker,
  title: 'Date Picker',
}
