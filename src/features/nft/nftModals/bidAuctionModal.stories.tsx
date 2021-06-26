import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import BidAuctionModal, { TBidAuctionModal } from './bidAuctionModal'

const Template: Story<TBidAuctionModal> = ({
  type,
  username,
  isOpen,
  info,
}) => {
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
        info={info}
      ></BidAuctionModal>
    </>
  )
}

export const BidAuctionModalDefault = Template.bind({})
const username = 'Banksy86'
const type = 'MakeOffer'
const info = { currencyName: 'PSL' }
BidAuctionModalDefault.args = {
  username,
  type,
  info,
}

export default {
  component: BidAuctionModal,
  title: 'BidModals/BidAuctionModal',
} as Meta
