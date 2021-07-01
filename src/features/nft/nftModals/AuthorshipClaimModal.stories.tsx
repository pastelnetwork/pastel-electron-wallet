import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import AuthorshipClaimModal, {
  TAuthorshipClaimModal,
} from './AuthorshipClaimModal'

const Template: Story<TAuthorshipClaimModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <AuthorshipClaimModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></AuthorshipClaimModal>
    </>
  )
}

export const AuthorshipClaimModalDefault = Template.bind({})
AuthorshipClaimModalDefault.args = {}

export default {
  component: AuthorshipClaimModal,
  title: 'BidModals/AuthorshipClaimModal',
} as Meta
