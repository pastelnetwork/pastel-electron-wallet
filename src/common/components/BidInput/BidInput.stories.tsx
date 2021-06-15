import React from 'react'
import { Story, Meta } from '@storybook/react'
import BidInput, { TBidInput } from './BidInput'

export const BidInputDefault: Story<TBidInput> = ({ bid }) => {
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
