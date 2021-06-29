import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ViewsStatsModal, { TViewsStatsModal } from './ViewsStatsModal'

const Template: Story<TViewsStatsModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ViewsStatsModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ViewsStatsModal>
    </>
  )
}

export const ViewsStatsModalDefault = Template.bind({})
ViewsStatsModalDefault.args = {}

export default {
  component: ViewsStatsModal,
  title: 'BidModals/ViewsStatsModal',
} as Meta
