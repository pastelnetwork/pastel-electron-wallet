import React from 'react'
import { Story, Meta } from '@storybook/react'
import Comment, { TComment } from './Comment'
import avatarPlaceholder from '../../../common/assets/images/avatar-placeholder.png'

export const CommentDefault: Story<TComment> = () => (
  <div className='max-w-lg'>
    <Comment
      name='Reymundo'
      avatar={avatarPlaceholder}
      commentedOn='Unity Dashboard kit.'
      when='19h'
      comment='Awesome! 😍'
      likes={23}
    />
  </div>
)

export default {
  component: Comment,
  title: 'Comment',
} as Meta
