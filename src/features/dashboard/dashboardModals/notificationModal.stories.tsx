import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import NotificationModal, { TNotificationModal } from './notificationModal'
import notificationData from './notificationModal.data'

const Template: Story<TNotificationModal> = ({ notifications, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <NotificationModal
        notifications={notifications}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></NotificationModal>
    </>
  )
}

export const NotificationModalDefault = Template.bind({})
const notifications = notificationData
NotificationModalDefault.args = {
  notifications,
}

export default {
  component: NotificationModal,
  title: 'Dashboard/NotificationModal',
} as Meta
