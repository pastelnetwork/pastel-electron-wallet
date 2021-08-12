import React from 'react'
import cn from 'classnames'
import { LongArrow } from 'common/components/Icons'
import { formatNumber } from '../../common/utils/format'
import { TTransactionType } from 'types/rpc'
import { useCurrencyName } from 'common/hooks/appInfo'

export type TTransactionItemProps = {
  type: TTransactionType
  amount: number
  date: string
}

export default function TransactionItem({
  type,
  amount,
  date,
}: TTransactionItemProps): JSX.Element {
  const currencyName = useCurrencyName()
  return (
    <div className='border border-gray-e7 rounded-lg mb-3 h-[76px]'>
      <div className='flex h-full items-center justify-between pl-3 pr-5 py-3'>
        <div className='flex h-full w-full'>
          <div
            className={cn(
              'flex-none w-6 h-6 flex-center mr-3 rounded-full',
              type !== TTransactionType.SEND
                ? 'bg-green-e5 text-green-38'
                : 'bg-red-ef text-red-7a',
            )}
          >
            <LongArrow
              className={
                type !== TTransactionType.SEND
                  ? 'text-green-00'
                  : 'text-warning-hover'
              }
              size={12}
              to={type !== TTransactionType.SEND ? 'right' : 'left'}
            />
          </div>
          <div className='mt-0.5 w-full'>
            <div className='text-gray-4a text-sm font-medium mb-1'>
              {type !== TTransactionType.SEND ? 'Last Received' : 'Last Sent'}
            </div>
            <div className='flex justify-between'>
              <div className='text-gray-a0 text-sm'>{date}</div>
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
