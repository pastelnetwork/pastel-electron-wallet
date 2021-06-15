import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../../common/components/Buttons'
import SecurityPasswordModal, {
  TSecurityPasswordModal,
} from './securityPasswordModal'

export const ReviewModalDefault: Story<TSecurityPasswordModal> = ({
  isOpen,
}) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <SecurityPasswordModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></SecurityPasswordModal>
    </>
  )
}

export default {
  component: SecurityPasswordModal,
  title: 'MySecurityModals/SecurityPasswordModal',
} as Meta
