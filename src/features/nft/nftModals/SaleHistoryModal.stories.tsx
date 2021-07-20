import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from 'common/components/Buttons'
import { SaleHistoryModal, TSaleHistoryModal } from './SaleHistoryModal'

const Template: Story<TSaleHistoryModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <SaleHistoryModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></SaleHistoryModal>
    </>
  )
}

export const SaleHistoryModalDefault = Template.bind({})
SaleHistoryModalDefault.args = {}

export default {
  component: SaleHistoryModal,
  title: 'BidModals/SaleHistoryModal',
} as Meta
