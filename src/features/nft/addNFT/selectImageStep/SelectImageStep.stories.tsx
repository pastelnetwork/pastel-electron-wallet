import React, { useCallback } from 'react'
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

  const onClose = useCallback(() => {
    // noop
  }, [])

  const renderContentModal = useCallback(() => <Component state={state} />, [
    state,
  ])

  return (
    <Modal open onClose={onClose} closeButton render={renderContentModal} />
  )
}

export const SelectImageStep = Template.bind({})
SelectImageStep.args = {}
