import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component from './AddNFT'
import { useToggle } from 'react-use'
import { Button } from 'common/components/Buttons'

export default {
  title: 'Add NFT',
  component: Component,
} as Meta

const TemplateOptions: Story = () => {
  const [open, toggle] = useToggle(true)

  return (
    <>
      <Button
        type='button'
        className='font-extrabold inline-block px-6'
        onClick={toggle}
      >
        Add NFT
      </Button>
      <Component open={open} onClose={toggle} />
    </>
  )
}

export const AddNFT = TemplateOptions.bind({})
