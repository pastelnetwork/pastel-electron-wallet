import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TAddNFTProps } from './AddNFT'
import { useToggle } from 'react-use'
import { Button } from 'common/components/Buttons'

export default {
  title: 'Features/Add NFT',
  component: Component,
} as Meta

const Template: Story<TAddNFTProps> = () => {
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

export const AddNFT = Template.bind({})
AddNFT.args = {}
