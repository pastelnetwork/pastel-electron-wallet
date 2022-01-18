import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../../common/components/Buttons'
import SecurityPasswordModal, {
  TSecurityPasswordModal,
} from './securityPasswordModal'

export const ReviewModalDefault: Story<TSecurityPasswordModal> = ({
  isOpen,
}: TSecurityPasswordModal) => {
  const [showModal, setShowModal] = React.useState(isOpen)
  const [status, setStatus] = useState('')
  const qrcodeData = ['']

  const handleConfirmChangePassword = () => {
    setStatus('success')
  }

  const setCurrentPassword = () => {
    // noop
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <SecurityPasswordModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
        handleConfirm={handleConfirmChangePassword}
        setCurrentPassword={setCurrentPassword}
        status={status}
        qrcodeData={qrcodeData.join('')}
      />
    </>
  )
}

export default {
  component: SecurityPasswordModal,
  title: 'MySecurityModals/SecurityPasswordModal',
} as Meta
