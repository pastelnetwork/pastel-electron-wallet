import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import DealApprovedModal, { TDealApprovedModal } from './dealApprovedModal'

const Template: Story<TDealApprovedModal> = ({ content, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <DealApprovedModal
        content={content}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></DealApprovedModal>
    </>
  )
}

export const DealApprovedModalDefault = Template.bind({})
const content =
  'SuperDealer23 has sent 5,500 PSL to your wallet to pay for "Diamonds in the sky"'
DealApprovedModalDefault.args = {
  content,
}

export default {
  component: DealApprovedModal,
  title: 'BidModals/DealApprovedModal',
} as Meta
