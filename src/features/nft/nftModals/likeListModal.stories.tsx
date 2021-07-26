import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import LikeListModal, { TLikeListModal } from './likeListModal'

const Template: Story<TLikeListModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <LikeListModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></LikeListModal>
    </>
  )
}

export const LikeListSimpleModal = Template.bind({})
LikeListSimpleModal.args = {}

export default {
  component: LikeListModal,
  title: 'BidModals/LikeListModal',
} as Meta
