import React from 'react'
import { Story, Meta } from '@storybook/react'

import AvatarGroup, { TAvatarGroupProps } from './AvatarGroup'
import Avatar from '../../../common/assets/images/avatar-placeholder.png'

export default {
  title: 'AvatarGroup',
  component: AvatarGroup,
} as Meta

const Template: Story<TAvatarGroupProps> = ({
  urlData,
  limitNumber,
  ...args
}: TAvatarGroupProps) => {
  return <AvatarGroup limitNumber={limitNumber} urlData={urlData} {...args} />
}

export const SimpleAvatarGroup = Template.bind({})

SimpleAvatarGroup.args = {
  urlData: Array(7).fill(Avatar),
  limitNumber: 4,
}
