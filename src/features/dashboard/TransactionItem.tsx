import React from 'react'
import cn from 'classnames'
import Arrow from '../../common/components/Icons/Arrow'

type Props = {
  type: 'in' | 'out'
  amount: string
}

export default function TransactionItem({ type, amount }: Props): JSX.Element {
  return (
    <div className='border border-gray-e7 h-70px rounded-lg mb-4'>
      <div className='flex items-center justify-between px-2.5 py-3.5'>
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
            <div className='text-gray-a0 text-xs'>04/04/2021</div>
          </div>
        </div>
        <div className='font-extrabold text-gray-4a'>{amount}</div>
      </div>
    </div>
  )
}
