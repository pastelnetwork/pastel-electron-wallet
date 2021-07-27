import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import BidHistoryModal, { TBidHistoryModal } from './bidHistoryModal'
import history from './bidHistoryModal.data'

const Template: Story<TBidHistoryModal> = ({ history, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <BidHistoryModal
        history={history}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></BidHistoryModal>
    </>
  )
}

export const BidHistoryModalDefault = Template.bind({})
BidHistoryModalDefault.args = {
  history,
}

export default {
  component: BidHistoryModal,
  title: 'BidModals/BidHistoryModal',
} as Meta
