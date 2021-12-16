import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react'
import DateRangeSelector, { TDateRangeProp } from './index'

export const DateRangeSelectorDefault: Story<TDateRangeProp> = () => {
  const [dates, setDates] = useState<TDateRangeProp>()

  const onSelectDateRange = useCallback(
    (dates: TDateRangeProp) => {
      setDates(dates)
    },
    [dates],
  )

  return (
    <div>
      <DateRangeSelector
        showFooter
        value={dates}
        onSelect={onSelectDateRange}
      />
    </div>
  )
}

export default {
  component: DateRangeSelector,
  title: 'DateRange Selector',
} as Meta
