import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component from './AddNFT'
import { useToggle } from 'react-use'

export default {
  title: 'AddNFT',
  component: Component,
} as Meta

const TemplateOptions: Story = () => {
  const [open, toggle] = useToggle(true)

  return (
    <>
      <button
        type='button'
        className='btn-primary inline-block px-6'
        onClick={toggle}
      >
        Add NFT
      </button>
      <Component open={open} onClose={toggle} />
    </>
  )
}

export const AddNFT = TemplateOptions.bind({})
