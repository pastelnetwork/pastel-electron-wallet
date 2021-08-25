import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { TSelectStepProps } from './SelectImageStep'
import Modal from 'common/components/AnimatedModal/AnimatedModal'
import { useAddNFTState } from '../AddNFT.state'

export default {
  title: 'Features/Add NFT/Select Image Step',
  component: Component,
} as Meta

const Template: Story<TSelectStepProps> = () => {
  const state = useAddNFTState({
    onClose() {
      // noop
    },
  })

  return (
    <Modal
      open
      onClose={() => {
        // noop
      }}
      closeButton
      render={() => <Component state={state} />}
    />
  )
}

export const SelectImageStep = Template.bind({})
SelectImageStep.args = {}
