import React, { useCallback } from 'react'
import { Story, Meta } from '@storybook/react'
import Modal, { TModal } from './Modal'

const Template: Story<TModal> = function ({ isOpen, ...args }) {
  const [showModal, setShowModal] = React.useState(isOpen)

  const onClick = useCallback(() => {
    setShowModal(true)
  }, [])

  return (
    <>
      <button className='cursor-pointer' onClick={onClick} type='button'>
        Show modal
      </button>
      <Modal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        {...args}
      >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          rerum, sequi voluptatibus, repellendus, laboriosam ut deserunt fugit
          necessitatibus quae dolore quod! Iste, id nesciunt! Ex corrupti a
          autem. Corrupti, ratione!
        </p>
      </Modal>
    </>
  )
}

export const ModalDefault = Template.bind({})
const className = 'max-w-lg'
ModalDefault.args = {
  className,
}

export default {
  component: Modal,
  title: 'Modal',
} as Meta
