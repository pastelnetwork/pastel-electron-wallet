import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Video, TVideoProps } from './Video'

export default {
  title: 'Icons/Video',
  component: Video,
} as Meta

const Template: Story<TVideoProps> = ({ ...args }) => {
  return <Video {...args} />
}

export const VideoIcon = Template.bind({})
VideoIcon.args = {
  size: 30,
}
