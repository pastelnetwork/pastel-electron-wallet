import React, { useCallback } from 'react'
import { Story, Meta } from '@storybook/react'
import AnimatedModal from '../AnimatedModal'
import Component, { TFullScreenImageProps as Props } from './FullScreenImage'
import image from 'common/assets/images/nft-card-placeholder.png'
import { useToggle } from 'react-use'
import { Button } from '../Buttons'

export default {
  component: Component,
  title: 'Full Screen Image',
} as Meta

const Template: Story<Props> = args => {
  const [open, toggle] = useToggle(true)

  const renderContent = useCallback(
    () => <Component {...args} onClose={toggle} />,
    [],
  )

  return (
    <>
      <Button onClick={toggle}>Open full screen image</Button>
      <AnimatedModal
        open={open}
        onClose={toggle}
        easyToClose
        closeButton
        render={renderContent}
      />
    </>
  )
}

export const FullScreenImage = Template.bind({})
FullScreenImage.args = {
  image,
}
