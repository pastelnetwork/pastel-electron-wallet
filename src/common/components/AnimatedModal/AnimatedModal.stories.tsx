import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TAnimatedModalProps as Props } from './AnimatedModal'
import { Button } from '../Buttons'

export default {
  title: 'Animated Modal',
  component: Component,
} as Meta

const TemplateOptions: Story<Props> = props => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className='px-6'>
        Open modal
      </Button>
      <Component
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        render={() => <div className='paper w-96 p-5'>Modal content</div>}
      />
    </>
  )
}

export const Modal = TemplateOptions.bind({})
Modal.args = {
  easyToClose: true,
  closeButton: true,
}
