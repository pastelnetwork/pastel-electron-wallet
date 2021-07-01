import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import OwnershipHistoryModal, {
  TOwnershipHistoryModal,
} from './OwnershipHistoryModal'

const Template: Story<TOwnershipHistoryModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <OwnershipHistoryModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></OwnershipHistoryModal>
    </>
  )
}

export const OwnershipHistoryModalDefault = Template.bind({})
OwnershipHistoryModalDefault.args = {}

export default {
  component: OwnershipHistoryModal,
  title: 'BidModals/OwnershipHistoryModal',
} as Meta
