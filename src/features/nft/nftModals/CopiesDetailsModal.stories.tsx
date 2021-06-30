import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import CopiesDetailsModal, { TCopiesDetailsModal } from './CopiesDetailsModal'

const Template: Story<TCopiesDetailsModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <CopiesDetailsModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></CopiesDetailsModal>
    </>
  )
}

export const CopiesDetailsModalDefault = Template.bind({})
CopiesDetailsModalDefault.args = {}

export default {
  component: CopiesDetailsModal,
  title: 'BidModals/CopiesDetailsModal',
} as Meta
