import React, { useState } from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/Buttons'
import Select, { TOption } from '../../../common/components/Select/Select'
import { Input } from '../../../common/components/Inputs'
import DatePicker from '../../../common/components/DatePicker'
import Link from '../../../common/components/Link'

export type TChangeStatusModal = {
  title?: string
  isOpen: boolean
  statusOptions: Array<TOption>
  listedOptions: Array<TOption>
  durationOptions: Array<TOption>
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ChangeStatusModal = ({
  isOpen,
  handleClose,
  title,
  statusOptions,
  listedOptions,
  durationOptions,
}: TChangeStatusModal): JSX.Element => {
  const [status, setStatus] = useState<TOption | null>(statusOptions[0])
  const [listed, setListed] = useState<TOption | null>(listedOptions[0])
  const [duration, setDuration] = useState<TOption | null>(durationOptions[0])
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>
        Change status of <br />“{title}”
      </h2>
      <div className='mb-6'>
        <Select
          placeholder='Select'
          onChange={setListed}
          selected={listed}
          options={listedOptions}
          className='flex-1 mb-6'
        />
        <Select
          onChange={setStatus}
          selected={status}
          options={statusOptions}
          className='flex-1 mb-6'
        />
        <Input
          type='text'
          placeholder={
            status?.value === 'buy-it-now'
              ? 'Fixed asking price'
              : 'Minimum aution price'
          }
          className='w-full mb-6'
        />
        {status?.value === 'buy-it-now' && (
          <Link>Change copies pricing plan</Link>
        )}
        {status?.value === 'auction' && (
          <div className='grid grid-cols-2 gap-7 items-center'>
            <div className='flex items-center'>
              <DatePicker
                selected={date}
                onChange={setDate}
                label='Time range'
                variant='separated'
                placeholder='  /    /  '
              />
            </div>
            <div className='flex items-center'>
              <h6 className='mr-2'>Duration</h6>
              <Select
                selected={duration}
                onChange={setDuration}
                options={durationOptions}
                className='w-full'
              />
            </div>
          </div>
        )}
      </div>
      <Button variant='default' onClick={handleClose} className='w-full'>
        Submit
      </Button>
    </Modal>
  )
}

export default ChangeStatusModal
