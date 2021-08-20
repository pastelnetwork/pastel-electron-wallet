import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ReviewOfferModal, { TReviewOfferModal, TOffer } from './reviewOfferModal'

const Template: Story<TReviewOfferModal> = ({ title, offers, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ReviewOfferModal
        title={title}
        offers={offers}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ReviewOfferModal>
    </>
  )
}

export const ReviewOfferModalDefault = Template.bind({})
const title = 'Diamonds in the sky'
const offers: Array<TOffer> = [
  { id: 1, user: 'SuperDealer23', price: 100000000 },
  { id: 2, user: 'Dealer24', price: 140000000 },
  { id: 3, user: 'SuperMax', price: 200000000 },
]
ReviewOfferModalDefault.args = {
  title,
  offers,
}

export default {
  component: ReviewOfferModal,
  title: 'BidModals/ReviewOfferModal',
} as Meta
