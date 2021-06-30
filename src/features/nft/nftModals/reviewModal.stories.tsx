import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ReviewModal, { TReviewModal } from './reviewModal'

const Template: Story<TReviewModal> = ({ title, content, isOpen, ...args }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ReviewModal
        title={title}
        content={content}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
        {...args}
      ></ReviewModal>
    </>
  )
}

export const ReviewModalDefault = Template.bind({})
const content = 'Please wait. Ususally it atkes 5-15 minutes'
const title = 'Diamonds in the sky'
ReviewModalDefault.args = {
  content,
  title,
}

export default {
  component: ReviewModal,
  title: 'BidModals/ReviewModal',
} as Meta
