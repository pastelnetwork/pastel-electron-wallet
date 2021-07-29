import React from 'react'
import cn from 'classnames'
import { LongArrow } from 'common/components/Icons'
import { Dayjs } from 'dayjs'
import { formatNumber } from '../../common/utils/format'

export type TTransactionItemProps = {
  type: 'in' | 'out'
  amount: number
  date: Dayjs
  currencyName: string
}

export default function TransactionItem({
  type,
  amount,
  date,
  currencyName,
}: TTransactionItemProps): JSX.Element {
  return (
    <div className='border border-gray-e7 h-70px rounded-lg mb-3 h-[76px]'>
      <div className='flex h-full items-center justify-between pl-3 pr-5 py-3'>
        <div className='flex h-full w-full'>
          <div
            className={cn(
              'flex-none w-6 h-6 flex-center mr-3 rounded-full',
              type === 'in'
                ? 'bg-green-e5 text-green-38'
                : 'bg-red-ef text-red-7a',
            )}
          >
            <LongArrow
              className={type === 'in' ? 'text-green-00' : 'text-warning-hover'}
              size={12}
              to={type === 'in' ? 'right' : 'left'}
            />
          </div>
          <div className='mt-0.5 w-full'>
            <div className='text-gray-4a text-sm font-medium mb-1'>
              {type === 'in' ? 'Last Received' : 'Last Sent'}
            </div>
            <div className='flex justify-between'>
              <div className='text-gray-a0 text-sm'>
                {date.format('MM/DD/YYYY')}
              </div>
              <div>
                <div className='font-extrabold text-sm text-gray-4a'>
                  {formatNumber(amount)} {currencyName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
