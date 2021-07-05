import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import TransferHistoryModal, {
  TTransferHistoryModal,
} from './TransferHistoryModal'

const Template: Story<TTransferHistoryModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <TransferHistoryModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></TransferHistoryModal>
    </>
  )
}

export const TransferAuthorshipModalDefault = Template.bind({})
TransferAuthorshipModalDefault.args = {}

export default {
  component: TransferHistoryModal,
  title: 'BidModals/TransferHistoryModal',
} as Meta
