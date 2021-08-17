import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ReassignTagModal, { TReassignTagModal } from './reassignTagModal'

const Template: Story<TReassignTagModal> = ({ title, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ReassignTagModal
        title={title}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ReassignTagModal>
    </>
  )
}

export const ReassignTagModalDefault = Template.bind({})
const title = 'Diamonds in the sky'
ReassignTagModalDefault.args = {
  title,
}

export default {
  component: ReassignTagModal,
  title: 'BidModals/ReassignTagModal',
} as Meta
