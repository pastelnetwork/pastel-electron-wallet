import React from 'react'
import { Story, Meta } from '@storybook/react'
import Bid, { TBid } from './Bid'
import Avatar from '../../assets/images/avatar-placeholder.png'

export const BidDefault: Story<TBid> = () => (
  <div className='w-80 max-w-full'>
    <Bid name='Ben Mingo' bid='12.300 PSL' date={new Date()} avatar={Avatar} />
  </div>
)

export default {
  component: Bid,
  title: 'Bid',
} as Meta
