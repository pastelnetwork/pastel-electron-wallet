import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import PricePlanModal, { TPricePlanModal } from './PricePlanModal'

const Template: Story<TPricePlanModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <PricePlanModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></PricePlanModal>
    </>
  )
}

export const PricePlanModalDefault = Template.bind({})
PricePlanModalDefault.args = {}

export default {
  component: PricePlanModal,
  title: 'BidModals/PricePlanModal',
} as Meta
