import React, { useCallback, useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TAnimatedModalProps as Props } from './AnimatedModal'
import { Button } from '../Buttons'

export default {
  title: 'Animated Modal',
  component: Component,
} as Meta

const TemplateOptions: Story<Props> = props => {
  const [open, setOpen] = useState(false)

  const renderContent = useCallback(
    () => <div className='paper w-96 p-5'>Modal content</div>,
    [],
  )

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onOpenModal = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <>
      <Button onClick={onOpenModal} className='px-6'>
        Open modal
      </Button>
      <Component
        {...props}
        open={open}
        onClose={onClose}
        render={renderContent}
      />
    </>
  )
}

export const Modal = TemplateOptions.bind({})
Modal.args = {
  easyToClose: true,
  closeButton: true,
}
