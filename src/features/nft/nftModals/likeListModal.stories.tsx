import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Button } from '../../../common/components/Buttons'
import LikeListModal, { TLikeListModal } from './likeListModal'
import likes from './likeListData'

const Template: Story<TLikeListModal> = ({
  title,
  content,
  isOpen,
  ...args
}) => {
  const [showModal, setShowModal] = React.useState(isOpen)

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Show modal</Button>
      <LikeListModal
        title={title}
        content={content}
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false)
        }}
        {...args}
      ></LikeListModal>
    </>
  )
}

export const LikeListModalDefault = Template.bind({})
const content = likes
const title = 'Diamonds in the sky'
LikeListModalDefault.args = {
  content,
  title,
}

export default {
  component: LikeListModal,
  title: 'BidModals/LikeListModal',
} as Meta
