import React from 'react'
import Input from '../Input'

export interface BidInputProps {
  onBidChange(value: string): void
  bid?: string
}

const BidInput: React.FC<BidInputProps> = ({ onBidChange, bid }) => {
  const [fee, setFee] = React.useState(0)
  const handleBid = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBidChange(e.target.value)
    setFee(Number(e.target.value) * 5)
  }

  return (
    <>
      <Input
        type='number'
        placeholder='Enter your bid higher then current one'
        className='mb-6'
        value={bid}
        onChange={handleBid}
      />
      <p className='font-medium text-gray-500 text-center mb-6'>
        {fee ? `Estimated fee ${fee} PSL` : 'No data yet'}
      </p>
    </>
  )
}

export default BidInput
