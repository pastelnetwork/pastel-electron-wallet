import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import ChangeUsernameModal, {
  TChangeUsernameModal,
} from './ChangeUsernameModal'

const Template: Story<TChangeUsernameModal> = ({ isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <ChangeUsernameModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></ChangeUsernameModal>
    </>
  )
}

export const ChangeUsernameModalDefault = Template.bind({})
ChangeUsernameModalDefault.args = {}

export default {
  component: ChangeUsernameModalDefault,
  title: 'Modals/ChangeUsernameModal',
} as Meta
