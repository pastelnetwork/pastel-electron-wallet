import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ClaimTicketModal, { TClaimTicketModal } from './ClaimTicketModal'

const Template: Story<TClaimTicketModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ClaimTicketModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ClaimTicketModal>
    </>
  )
}

export const ClaimTicketModalDefault = Template.bind({})
ClaimTicketModalDefault.args = {}

export default {
  component: ClaimTicketModal,
  title: 'BidModals/ClaimTicketModal',
} as Meta
