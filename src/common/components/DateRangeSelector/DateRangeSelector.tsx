import React, { useState } from 'react'
import cn from 'classnames'
import DatePicker from 'react-datepicker'

import dayjs from 'common/utils/initDayjs'
import { Caret } from 'common/components/Icons'
import { SelectButton } from '../../../common/components/Buttons'
import caretDownIcon from '../../assets/icons/ico-caret-down.svg'
import calendarIcon from '../../assets/icons/ico-calendar.svg'
import './DateRangeSelector.css'

type TCustomHeader = {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}

export type TDateRangeProp = {
  start: Date
  end: Date
}

export type DateRangeSelectorProp = {
  value?: TDateRangeProp
  onSelect: (value: TDateRangeProp) => void
  showFooter?: boolean
  defaultSelected?: boolean
}

type TDateRangeSelectorContentProp = {
  value?: TDateRangeProp
  startDate?: Date
  endDate?: Date
}

type TDateFooter = {
  value: string
  title: string
}

const dateButtons = [
  { value: 'today', title: 'Today' },
  { value: 'yesterday', title: 'Yesterday' },
  { value: 'last7days', title: 'Last 7 days' },
  { value: 'last30days', title: 'Last 30 days' },
]

function DateRangeSelectorContent({
  value,
  startDate,
  endDate,
}: TDateRangeSelectorContentProp): JSX.Element {
  if (!value) {
    return (
      <div className='flex'>
        <img src={calendarIcon} className='ml-4 mr-2' />
        All
      </div>
    )
  }

  if (!endDate) {
    return (
      <div className='flex'>
        <img src={calendarIcon} className='ml-4 mr-2' />
        {dayjs(startDate).format('MM.DD.YY')}
        {' - '}
      </div>
    )
  }

  return (
    <div className='flex'>
      <img src={calendarIcon} className='ml-4 mr-2' />
      {dayjs(startDate).format('MM.DD.YY') +
        ' - ' +
        dayjs(endDate).format('MM.DD.YY')}
    </div>
  )
}

export default function DateRangeSelector({
  value,
  onSelect,
  showFooter = false,
  defaultSelected = false,
}: DateRangeSelectorProp): JSX.Element {
  const [startDate, setStartDate] = React.useState<Date>(
    value?.start || new Date(),
  )
  const [endDate, setEndDate] = React.useState<Date>(value?.end || new Date())

  const [isOpenCalendar, setOpenCalendar] = useState(false)
  const [dateTitle, setDateTitle] = useState<TDateFooter | null>(
    defaultSelected ? dateButtons[0] : null,
  )

  const handleOnChange = (dates: [Date, Date] | null): void => {
    if (dates) {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)

      onSelect({
        start,
        end,
      })
      if (end) {
        setOpenCalendar(false)
      }
    }
  }

  const customHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: TCustomHeader) => (
    <div className='flex justify-between px-4 pt-5 pb-1'>
      <h5 className='font-extrabold text-base text-gray-4a'>
        <span className='mr-1'>{dayjs(date).format('MMM')}</span>
        {dayjs(date).year()}
      </h5>
      <div>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className='focus:outline-none p-1 mr-5'
          type='button'
        >
          <Caret
            to='left'
            size={12}
            className='text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400'
          />
        </button>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className='focus:outline-none p-1'
          type='button'
        >
          <Caret
            to='right'
            size={12}
            className='text-gray-1b text-opacity-40 hover:text-blue-400 active:text-red-400'
          />
        </button>
      </div>
    </div>
  )

  const handleDateSelect = (date: TDateFooter): void => {
    if (dateTitle?.value === date.value) {
      return
    }
    setDateTitle(date)
    const now = new Date()
    switch (date.value) {
      case 'today':
        setStartDate(now)
        setEndDate(now)
        onSelect({
          start: new Date(),
          end: new Date(),
        })
        break
      case 'yesterday':
        setStartDate(dayjs(new Date()).add(-1, 'days').toDate())
        setEndDate(now)
        onSelect({
          start: dayjs(new Date()).add(-1, 'days').toDate(),
          end: new Date(),
        })
        break
      case 'last7days':
        setStartDate(dayjs(new Date()).add(-1, 'weeks').toDate())
        setEndDate(now)
        onSelect({
          start: dayjs(new Date()).add(-1, 'weeks').toDate(),
          end: new Date(),
        })
        break
      case 'last30days':
        setStartDate(dayjs(new Date()).add(-30, 'days').toDate())
        setEndDate(now)
        onSelect({
          start: dayjs(new Date()).add(-30, 'days').toDate(),
          end: new Date(),
        })
        break
      default:
        break
    }
  }

  return (
    <div className='relative'>
      <div
        onClick={() => setOpenCalendar(!isOpenCalendar)}
        className='shadow-input flex my-1 h-9 items-center text-gray-2d justify-between cursor-pointer border border-gray-200 border-solid rounded hover:border-blue-3f active:border-blue-3f'
      >
        <DateRangeSelectorContent
          value={value}
          startDate={startDate}
          endDate={endDate}
        />
        <img
          src={caretDownIcon}
          className={cn(
            'transition duration-200 absolute ml-2 right-3 transform',
            isOpenCalendar && 'rotate-180',
          )}
        />
      </div>
      {isOpenCalendar && (
        <div className='absolute bg-white z-100'>
          <DatePicker
            renderCustomHeader={customHeader}
            calendarClassName='date-picker'
            showPopperArrow={false}
            onCalendarOpen={() => setOpenCalendar(true)}
            onCalendarClose={() => setOpenCalendar(false)}
            onChange={handleOnChange}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          >
            {showFooter ? (
              <div className='p-3 pb-5'>
                <div className='flex flex-col border border-gray-e6 rounded-md py-1'>
                  {dateButtons.map(date => (
                    <SelectButton
                      key={date.value}
                      isActive={date.value === dateTitle?.value}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date.title}
                    </SelectButton>
                  ))}
                </div>
              </div>
            ) : null}
          </DatePicker>
        </div>
      )}
    </div>
  )
}

DateRangeSelectorContent.defaultProps = {
  value: undefined,
  endDate: undefined,
  startDate: undefined,
}
