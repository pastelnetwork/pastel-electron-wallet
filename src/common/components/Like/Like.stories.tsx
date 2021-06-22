import React from 'react'
import { Story, Meta } from '@storybook/react'
import Like, { TLike } from './Like'

export const LikeDefalt: Story<TLike> = () => <Like count={23} />

export default {
  component: Like,
  title: 'Like',
} as Meta
