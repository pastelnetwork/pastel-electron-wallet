import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import BidBuyModal, { TBidBuyModal } from './bidBuyModal'

const Template: Story<TBidBuyModal> = ({ username, isOpen, info }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <BidBuyModal
        username={username}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
        info={info}
      ></BidBuyModal>
    </>
  )
}

export const BidBuyModalDefault = Template.bind({})
const username = 'Banksy86'
const info = { currencyName: 'PSL' }
BidBuyModalDefault.args = {
  username,
  info,
}

export default {
  component: BidBuyModal,
  title: 'BidModals/BidBuyModal',
} as Meta
