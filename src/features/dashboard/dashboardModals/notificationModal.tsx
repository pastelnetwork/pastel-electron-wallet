import React, { useCallback, useState } from 'react'
import cn from 'classnames'
import dayjs from 'dayjs'
// Components
import { Modal } from '../../../common/components/Modal'
import Notification from '../../../common/components/Notification'
import Scrollbar from '../../../common/components/Scrollbar'
import Radio from 'common/components/Radio'
import Select, { TOption } from '../../../common/components/Select/Select'
import DatePicker from '../../../common/components/DatePicker'
import { SelectButton } from '../../../common/components/Buttons'
import { formatDate } from 'common/utils/format'
import { translate } from 'features/app/translations'

export type TNotification = {
  id: number
  type: string
  title: string
  status: 'read' | 'unread'
}

export type TNotificationModal = {
  notifications: TNotification[]
  isOpen: boolean
  handleClose?: React.MouseEventHandler
}

function SelectDateButton({
  title,
  dateTitle,
  handleDateSelect,
}: {
  title: string
  dateTitle: string
  handleDateSelect: (val: string) => void
}): JSX.Element {
  const onClick = useCallback(() => {
    handleDateSelect(title)
  }, [])

  return (
    <SelectButton key={title} isActive={title === dateTitle} onClick={onClick}>
      {title}
    </SelectButton>
  )
}

function NotificationModal({
  notifications,
  isOpen,
  handleClose,
}: TNotificationModal): JSX.Element {
  const TTypesOptions = [
    { value: 'all', label: translate('all') },
    { value: 'bidding', label: translate('bidding') },
    { value: 'system', label: translate('system') },
    { value: 'wallet', label: translate('wallet') },
  ]

  const dateButtons = [
    { title: translate('today') },
    { title: translate('yesterday') },
    { title: translate('lastOfDays', { days: 7 }) },
    { title: translate('lastOfDays', { days: 30 }) },
  ]

  const [filter, setFilter] = useState<string>('all')
  const [type, setType] = useState<TOption | null>(TTypesOptions[0])
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dateTitle, setDateTitle] = useState<string>(translate('today'))

  const handleSelect = useCallback(
    (option: TOption | null): void => setType(option),
    [type],
  )

  const handleDate = useCallback(
    (dates: [Date, Date] | null): void => {
      if (dates) {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        if (start && !end) {
          setDateTitle(formatDate(dayjs(start)))
        } else if (start && end) {
          setDateTitle(
            `${formatDate(dayjs(start))} - ${formatDate(dayjs(end))}`,
          )
        }
      }
    },
    [startDate, endDate, dateTitle],
  )

  const filteredData = notifications.filter(({ status }) =>
    filter === 'unread' ? status !== 'read' : true,
  )

  const handleDateSelect = useCallback(
    (date: string): void => {
      if (dateTitle === date) {
        return
      }
      setDateTitle(date)
      switch (date) {
        case translate('today'):
          setStartDate(new Date())
          setEndDate(null)
          break
        case translate('yesterday'):
          setStartDate(dayjs(new Date()).add(-1, 'days').toDate())
          setEndDate(null)
          break
        case translate('lastOfDays', { days: 7 }):
          setStartDate(dayjs(new Date()).add(-1, 'weeks').toDate())
          setEndDate(new Date())
          break
        case translate('lastOfDays', { days: 30 }):
          setStartDate(dayjs(new Date()).add(-30, 'days').toDate())
          setEndDate(new Date())
          break
        case translate('lastOfMonth', { days: 3 }):
          setStartDate(dayjs(new Date()).add(-3, 'months').toDate())
          setEndDate(new Date())
          break
        case translate('lastOfMonth', { days: 12 }):
          setStartDate(dayjs(new Date()).add(-1, 'years').toDate())
          setEndDate(new Date())
          break
        default:
          break
      }
    },
    [dateTitle, startDate, endDate],
  )

  const onUnreadChange = useCallback(() => {
    setFilter('unread')
  }, [])

  const onFilterAllChange = useCallback(() => {
    setFilter('all')
  }, [])

  const renderFilter = () => (
    <div className='grid grid-cols-2 gap-4 col-span-2'>
      <Select
        selected={type}
        onChange={handleSelect}
        options={TTypesOptions}
        label={translate('types')}
        className='bg-white'
      />
      <DatePicker
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDate}
        label={translate('timeRange')}
        footer={
          <div className='flex flex-col border border-gray-e6 rounded-md py-1'>
            {dateButtons.map(({ title }) => (
              <SelectDateButton
                key={title}
                dateTitle={dateTitle}
                title={title}
                handleDateSelect={handleDateSelect}
              />
            ))}
          </div>
        }
        closeOnSelect={false}
        value={dateTitle}
        openToDate={startDate || undefined}
        selectsRange
      />
    </div>
  )

  const renderFilterStatus = () => (
    <div className='flex'>
      <div className='mr-6'>
        <Radio
          checked={filter === 'all'}
          onChange={onFilterAllChange}
          className='mr-3 z-10 w-5 h-5'
          checkedCircleBackgroundColor='bg-blue-3f'
          labelClassName='text-gray-4a z-10'
          smallCircleClass='z-10 w-2 h-2 bg-blue-e7'
        >
          {translate('all')}
        </Radio>
      </div>
      <Radio
        checked={filter === 'unread'}
        onChange={onUnreadChange}
        className='mr-3 z-10 w-5 h-5'
        checkedCircleBackgroundColor='bg-blue-3f'
        labelClassName='text-gray-4a z-10'
        smallCircleClass='z-10 w-2 h-2 bg-blue-e7'
      >
        {translate('unread')}
      </Radio>
    </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-4xl'
      overlayClassName='bg-background-modal bg-opacity-60'
    >
      <h2 className='mb-6'>{translate('notifications')}</h2>
      <div className='relative py-4 mb-4'>
        <span className='absolute top-0 -left-12 w-screen max-w-4xl h-full bg-background-main'></span>
        <div className='grid grid-cols-3 gap-4 items-center'>
          {renderFilterStatus()}
          {renderFilter()}
        </div>
      </div>
      <Scrollbar maxHeight='425'>
        {filteredData.map(({ id, type, title, status }, idx) => (
          <div
            key={id}
            className={cn(idx < notifications.length - 1 && 'pb-3')}
          >
            <Notification type={type} title={title} status={status} />
          </div>
        ))}
      </Scrollbar>
    </Modal>
  )
}

export default NotificationModal
