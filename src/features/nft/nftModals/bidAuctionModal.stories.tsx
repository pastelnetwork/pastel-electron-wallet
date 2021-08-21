import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import BidAuctionModal, { TBidAuctionModal } from './bidAuctionModal'

const Template: Story<TBidAuctionModal> = ({ type, username, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <BidAuctionModal
        type={type}
        username={username}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></BidAuctionModal>
    </>
  )
}

export const BidAuctionMakeAnOfferModalDefault = Template.bind({})
BidAuctionMakeAnOfferModalDefault.args = {
  username: 'Banksy86',
  type: 'MakeOffer',
}

export const BidAuctionBuyItNowModalDefault = Template.bind({})
BidAuctionBuyItNowModalDefault.args = {
  username: 'Banksy86',
  type: 'Buy',
}

export const BidAuctionPlaceAutionBidModalDefault = Template.bind({})
BidAuctionPlaceAutionBidModalDefault.args = {
  username: 'Banksy86',
  type: 'Bid',
}

export default {
  component: BidAuctionModal,
  title: 'BidModals/BidAuctionModal',
} as Meta
