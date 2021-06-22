import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import CommentModal, { TCommentModal } from './commentModal'
import comments from './commentModal.data'

const Template: Story<TCommentModal> = ({ comments, isOpen }) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <CommentModal
        comments={comments}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
      ></CommentModal>
    </>
  )
}

export const CommentModalDefault = Template.bind({})
CommentModalDefault.args = {
  comments,
}

export default {
  component: CommentModal,
  title: 'BidModals/CommentModal',
} as Meta
