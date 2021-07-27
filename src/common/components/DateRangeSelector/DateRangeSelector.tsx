import React, { useState, useEffect, useRef } from 'react'
import DateRangePicker, { OnSelectCallbackParam } from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'
import cn from 'classnames'
import * as momentRange from 'moment-range'
import caretDownIcon from '../../assets/icons/ico-caret-down.svg'
import calendarIcon from '../../assets/icons/ico-calendar.svg'
import './DateRangeSelector.css'

export type DateRangeSelectorProp = {
  value: momentRange.DateRange | undefined
  onSelect: (value: OnSelectCallbackParam) => void
}

const DateRangeSelector = ({
  value,
  onSelect,
}: DateRangeSelectorProp): JSX.Element => {
  const [isOpenCalendar, setOpenCalendar] = useState(false)

  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (calendarRef && !calendarRef.current?.contains(event.target as Node)) {
        setOpenCalendar(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    <div ref={calendarRef} className='relative'>
      <div
        onClick={() => setOpenCalendar(!isOpenCalendar)}
        className='shadow-input flex my-1 h-9 items-center text-gray-2d justify-between cursor-pointer  border border-gray-200 border-solid rounded'
      >
        <div className='flex'>
          <img src={calendarIcon} className='ml-4 mr-2' />
          {value
            ? value.start.format('MM.DD.YY') +
              ' ~ ' +
              value.end.format('MM.DD.YY')
            : 'All'}
        </div>
        <img
          src={caretDownIcon}
          className={cn(
            'transition duration-200 absolute ml-2 right-3 transform',
            isOpenCalendar && 'rotate-180',
          )}
        />
      </div>
      {isOpenCalendar && (
        <div
          className='absolute bg-white z-20'
          onBlur={() => setOpenCalendar(false)}
        >
          <DateRangePicker onSelect={onSelect} value={value} />
        </div>
      )}
    </div>
  )
}

export default DateRangeSelector
