import React, { useState } from 'react'
import cn from 'classnames'
// Components
import { Modal } from '../../../common/components/Modal'
import Notification from '../../../common/components/Notification'
import Scrollbar from '../../../common/components/Scrollbar'
import Radio from 'common/components/Radio'
import Select, { TOption } from '../../../common/components/Select/Select'
import DatePicker from '../../../common/components/DatePicker'
import { SelectButton } from '../../../common/components/Buttons'
import { formatDate } from 'common/utils/format'
import dayjs from 'dayjs'

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

const TTypesOptions = [
  { value: 'psl', label: 'PSL' },
  { value: 'psl 1', label: 'PSL 1' },
  { value: 'psl 2', label: 'PSL 2' },
  { value: 'psl 3', label: 'PSL 3' },
]

const dateButtons = [
  { title: 'Today' },
  { title: 'Yesterday' },
  { title: 'Last 7 days' },
  { title: 'Last 30 days' },
]

const NotificationModal = ({
  notifications,
  isOpen,
  handleClose,
}: TNotificationModal): JSX.Element => {
  const [filter, setFilter] = useState<string>('all')
  const [type, setType] = useState<TOption | null>(TTypesOptions[0])
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dateTitle, setDateTitle] = useState<string>('Today')

  const handleSelect = (option: TOption | null): void => setType(option)

  const handleDate = (dates: [Date, Date] | null): void => {
    if (dates) {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
      if (start && !end) {
        setDateTitle(formatDate(dayjs(start)))
      } else if (start && end) {
        setDateTitle(`${formatDate(dayjs(start))} - ${formatDate(dayjs(end))}`)
      }
    }
  }

  const filteredData = notifications.filter(({ status }) =>
    filter === 'unread' ? status !== 'read' : true,
  )

  const handleDateSelect = (date: string): void => {
    if (dateTitle === date) {
      return
    }
    setDateTitle(date)
    switch (date) {
      case 'Today':
        setStartDate(new Date())
        setEndDate(null)
        break
      case 'Yesterday':
        setStartDate(dayjs(new Date()).add(-1, 'days').toDate())
        setEndDate(null)
        break
      case 'Last 7 days':
        setStartDate(dayjs(new Date()).add(-1, 'weeks').toDate())
        setEndDate(new Date())
        break
      case 'Last 30 days':
        setStartDate(dayjs(new Date()).add(-30, 'days').toDate())
        setEndDate(new Date())
        break
      case 'Last 3 month':
        setStartDate(dayjs(new Date()).add(-3, 'months').toDate())
        setEndDate(new Date())
        break
      case 'Last 12 month':
        setStartDate(dayjs(new Date()).add(-1, 'years').toDate())
        setEndDate(new Date())
        break
      default:
        break
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      className='max-w-4xl'
      overlayClassName='bg-background-modal bg-opacity-60'
    >
      <h2 className='mb-6'>Notifications</h2>
      <div className='relative py-4 mb-4'>
        <span className='absolute top-0 -left-12 w-screen max-w-4xl h-full bg-background-main'></span>
        <div className='grid grid-cols-3 gap-4 items-center'>
          <div className='flex'>
            <div className='mr-6'>
              <Radio
                checked={filter === 'all'}
                onChange={() => setFilter('all')}
                className='mr-3 z-10 w-5 h-5'
                checkedCircleBackgroundColor='bg-blue-3f'
                labelClassName='text-gray-4a z-10'
                smallCircleClass='z-10 w-2 h-2 bg-blue-e7'
              >
                All
              </Radio>
            </div>
            <Radio
              checked={filter === 'unread'}
              onChange={() => setFilter('unread')}
              className='mr-3 z-10 w-5 h-5'
              checkedCircleBackgroundColor='bg-blue-3f'
              labelClassName='text-gray-4a z-10'
              smallCircleClass='z-10 w-2 h-2 bg-blue-e7'
            >
              Unread
            </Radio>
          </div>
          <div className='grid grid-cols-2 gap-4 col-span-2'>
            <Select
              selected={type}
              onChange={handleSelect}
              options={TTypesOptions}
              label='Types'
              selectClassName='bg-white'
            />
            <DatePicker
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDate}
              label='Time range'
              footer={
                <div className='flex flex-col border border-gray-e6 rounded-md py-1'>
                  {dateButtons.map(({ title }, idx) => (
                    <SelectButton
                      key={idx}
                      isActive={title === dateTitle}
                      onClick={() => handleDateSelect(title)}
                    >
                      {title}
                    </SelectButton>
                  ))}
                </div>
              }
              closeOnSelect={false}
              value={dateTitle}
              openToDate={startDate || undefined}
              selectsRange
            />
          </div>
        </div>
      </div>
      <Scrollbar maxHeight='425'>
        {filteredData.map(({ id, type, title, status }, idx) => (
          <div
            key={id}
            className={cn(idx < notifications.length - 1 && 'pb-3')}
          >
            <Notification
              type={type}
              title={title}
              status={status as TNotification['status']}
            />
          </div>
        ))}
      </Scrollbar>
    </Modal>
  )
}

export default NotificationModal
