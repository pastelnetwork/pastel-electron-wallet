import React from 'react'
import cn from 'classnames'
import Arrow from '../../common/components/Icons/Arrow'
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
    <div className='border border-gray-e7 h-70px rounded-lg mb-4'>
      <div className='flex items-center justify-between pl-2.5 pr-5 py-3'>
        <div className='flex h-full'>
          <div
            className={cn(
              'w-6 h-6 flex-center mr-18px rounded-full',
              type === 'in'
                ? 'bg-green-e5 text-green-38'
                : 'bg-red-ef text-red-7a',
            )}
          >
            <Arrow size={11} to={type === 'in' ? 'right' : 'left'} />
          </div>
          <div>
            <div className='text-gray-4a text-sm font-medium mb-1'>
              {type === 'in' ? 'Last received' : 'Last sent'}
            </div>
            <div className='text-gray-a0 text-xs'>
              {date.format('MM/DD/YYYY')}
            </div>
          </div>
        </div>
        <div className='font-extrabold text-gray-4a'>
          {formatNumber(amount)} {currencyName}
        </div>
      </div>
    </div>
  )
}
