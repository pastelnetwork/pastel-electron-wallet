import React, { useState } from 'react'
// Components
import { Modal } from '../../../common/components/Modal'
import { Button } from '../../../common/components/Buttons'
import Select, { TOption } from '../../../common/components/Select/Select'
import { Input } from '../../../common/components/Inputs'
import DatePicker from '../../../common/components/DatePicker'
import Link from '../../../common/components/Link'
import { translate } from 'features/app/translations'

export type TChangeStatusModal = {
  title?: string
  isOpen: boolean
  statusOptions: Array<TOption>
  listedOptions: Array<TOption>
  durationOptions: Array<TOption>
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function ChangeStatusModal({
  isOpen,
  handleClose,
  title,
  statusOptions,
  listedOptions,
  durationOptions,
}: TChangeStatusModal): JSX.Element {
  const [status, setStatus] = useState<TOption | null>(statusOptions[0])
  const [listed, setListed] = useState<TOption | null>(listedOptions[0])
  const [duration, setDuration] = useState<TOption | null>(durationOptions[0])
  const [date, setDate] = useState<Date | null>(null)

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>
        {translate('changeStatusOf')} <br />“{title}”
      </h2>
      <div className='mb-6'>
        <Select
          placeholder={translate('select')}
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
              ? translate('fixedAskingPrice')
              : translate('minimumAutionPrice')
          }
          className='w-full mb-6'
        />
        {status?.value === 'buy-it-now' && (
          <Link>{translate('changeCopiesPricingPlan')}</Link>
        )}
        {status?.value === 'auction' && (
          <div className='grid grid-cols-2 gap-7 items-center'>
            <div className='flex items-center'>
              <DatePicker
                selected={date}
                onChange={setDate}
                label={translate('timeRange')}
                variant='separated'
                placeholder='  /    /  '
              />
            </div>
            <div className='flex items-center'>
              <h6 className='mr-2'>{translate('duration')}</h6>
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
        {translate('submit')}
      </Button>
    </Modal>
  )
}

export default ChangeStatusModal
