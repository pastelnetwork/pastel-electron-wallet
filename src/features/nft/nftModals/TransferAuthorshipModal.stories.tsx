import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import TransferAuthorshipModal, {
  TTransferAuthorshipModal,
} from './TransferAuthorshipModal'

const Template: Story<TTransferAuthorshipModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <TransferAuthorshipModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></TransferAuthorshipModal>
    </>
  )
}

export const TransferAuthorshipModalDefault = Template.bind({})
TransferAuthorshipModalDefault.args = {}

export default {
  component: TransferAuthorshipModal,
  title: 'BidModals/TransferAuthorshipModal',
} as Meta
