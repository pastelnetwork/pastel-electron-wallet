import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ReviewTestModal, { TReviewTestModal } from './ReviewTestModal'

const Template: Story<TReviewTestModal> = ({ content, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ReviewTestModal
        content={content}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ReviewTestModal>
    </>
  )
}

export const StatusInReviewTestModal = Template.bind({})

export default {
  component: ReviewTestModal,
  title: 'BidModals/ReviewTestModal',
} as Meta
