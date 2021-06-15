import React from 'react'
import { InputNumberFormat } from '../Inputs'
import NumberFormat from 'react-number-format'

export type TBidInput = {
  onBidChange(value: string): void
  bid?: string
}

const BidInput: React.FC<TBidInput> = ({ onBidChange, bid }) => {
  const [fee, setFee] = React.useState(0)
  const handleBid = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBidChange(e.target.value)
    setFee(Number(e.target.value.replaceAll(',', '')) * 5)
  }

  return (
    <>
      <InputNumberFormat
        type='text'
        displayType='input'
        placeholder='Enter your bid higher then current one'
        className='mb-6'
        value={bid}
        onChange={handleBid}
      />
      <div>
        {fee ? (
          <p className='font-medium text-gray-a6 text-center mb-6'>
            Estimated fee{' '}
            <NumberFormat
              value={fee}
              displayType={'text'}
              thousandSeparator={true}
            />{' '}
            PSL
          </p>
        ) : (
          <p className='font-medium text-gray-a6 text-center mb-6'>
            No data yet
          </p>
        )}
      </div>
    </>
  )
}

export default BidInput
