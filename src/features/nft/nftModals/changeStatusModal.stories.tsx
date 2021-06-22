import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ChangeStatusModal, { TChangeStatusModal } from './changeStatusModal'

const Template: Story<TChangeStatusModal> = ({
  title,
  statusOptions,
  listedOptions,
  durationOptions,
  isOpen,
}) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ChangeStatusModal
        title={title}
        statusOptions={statusOptions}
        listedOptions={listedOptions}
        durationOptions={durationOptions}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ChangeStatusModal>
    </>
  )
}

export const ChangeStatusModalDefault = Template.bind({})
const title = 'Diamonds in the sky'
const statusOptions = [
  { value: 'buy-it-now', label: 'Buy-it-now' },
  { value: 'auction', label: 'Auction' },
]
const listedOptions = [
  { value: 'listed', label: 'Listed' },
  { value: 'listed 2', label: 'Listed 2' },
]
const durationOptions = [
  { value: '12 hours', label: '12 hours' },
  { value: '6 hours', label: '6 hours' },
]
ChangeStatusModalDefault.args = {
  title,
  statusOptions,
  listedOptions,
  durationOptions,
}

export default {
  component: ChangeStatusModal,
  title: 'BidModals/ChangeStatusModal',
} as Meta
