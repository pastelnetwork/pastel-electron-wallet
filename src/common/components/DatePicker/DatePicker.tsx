import React, { ReactNode, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import cn from 'classnames'
// Components
import { Input } from '../Inputs'
// Assets
import CalendarIcon from 'common/assets/icons/ico-calendar.svg'
import ChevronIcon from 'common/assets/icons/ico-chevron.svg'

import './DatePicker.css'

type TBaseProps = {
  positionFixed?: boolean
  selected?: Date | null
  label?: string
  placeholder?: string
  selectsRange?: boolean
  startDate?: Date | null
  endDate?: Date | null
  variant?: 'separated' | 'default'
  footer?: ReactNode
  closeOnSelect?: boolean
  value?: string
  openToDate?: Date
}

type TSingle = TBaseProps & {
  onChange: (date: Date | null, event: React.SyntheticEvent) => void
}

type TRange = TBaseProps & {
  onChange: (date: [Date, Date] | null, event: React.SyntheticEvent) => void
}

type TDatePicker = TSingle | TRange

type TCustomHeader = {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}

const DatePicker = ({
  positionFixed = true,
  label,
  selected,
  onChange,
  placeholder,
  startDate,
  endDate,
  selectsRange,
  variant = 'default',
  footer,
  closeOnSelect,
  value,
  openToDate,
}: TDatePicker): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false)

  const customHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: TCustomHeader) => (
    <div className='flex justify-between px-4 pt-5 pb-1'>
      <h5 className='font-heavy'>
        {date.toLocaleString('default', { month: 'long' })}
      </h5>
      <div>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className='focus:outline-none p-1 mr-5'
        >
          <img src={ChevronIcon} className='transform rotate-90' />
        </button>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className='focus:outline-none p-1'
        >
          <img src={ChevronIcon} className='transform -rotate-90' />
        </button>
      </div>
    </div>
  )

  const inputChevronClasses = cn({
    'transition transition-transform duration-300': true,
    'transform rotate-180': isOpened,
  })

  const customInput = (): JSX.Element | null => {
    if (variant === 'default') {
      const prepend: JSX.Element = label ? (
        <span className='text-gray-b0 inline-block overflow-hidden whitespace-nowrap'>
          {label}:
        </span>
      ) : (
        <img src={CalendarIcon} />
      )
      return (
        <Input
          prepend={prepend}
          append={<img src={ChevronIcon} className={inputChevronClasses} />}
        />
      )
    } else if (variant === 'separated') {
      return (
        <Input
          textCenter
          appendOutside={
            <img src={CalendarIcon} className='w-6 h-6 cursor-pointer' />
          }
        />
      )
    } else {
      return null
    }
  }

  return (
    <ReactDatePicker
      customInput={customInput()}
      renderCustomHeader={customHeader}
      calendarClassName='date-picker'
      showPopperArrow={false}
      onCalendarOpen={() => setIsOpened(true)}
      onCalendarClose={() => setIsOpened(false)}
      selected={selected}
      onChange={onChange}
      placeholderText={placeholder}
      shouldCloseOnSelect={closeOnSelect || !selectsRange}
      popperModifiers={{
        preventOverflow: {
          enabled: true,
          boundariesElement: 'viewport',
        },
      }}
      popperProps={{
        positionFixed,
      }}
      selectsRange={selectsRange}
      startDate={startDate}
      endDate={endDate}
      openToDate={openToDate}
      value={value}
    >
      <div className='p-3 pb-5'>{footer}</div>
    </ReactDatePicker>
  )
}

export default DatePicker
