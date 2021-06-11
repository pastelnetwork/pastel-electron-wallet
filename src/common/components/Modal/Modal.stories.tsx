import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TModalProps as Props } from './Modal'

export default {
  title: 'Modal',
  component: Component,
} as Meta

const TemplateOptions: Story<Props> = props => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className='btn-primary w-32' onClick={() => setOpen(true)}>
        Open modal
      </button>
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
