import React from 'react'
import { Story, Meta } from '@storybook/react'
import BidInput, { BidInputProps } from './index'

export const BidInputDefault: Story<BidInputProps> = ({ bid }) => {
  const [bidValue, setBidValue] = React.useState(bid)
  const onBidChangeFunc = (value: string) => {
    setBidValue(value)
  }

  return (
    <div className='max-w-sm'>
      <BidInput bid={bidValue} onBidChange={onBidChangeFunc} />
    </div>
  )
}

export default {
  component: BidInput,
  title: 'Bid Input',
} as Meta
