import React from 'react'
import { TComment } from './Comment.types'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import avatar1 from 'common/assets/images/mock/avatar-1.png'
import avatar2 from 'common/assets/images/mock/avatar-2.png'
import avatar3 from 'common/assets/images/mock/avatar-3.png'
import dayjs from 'dayjs'

const commentsPerPageCount = 3
const commentsCount = 121
const twoDaysAgo = dayjs().subtract(2, 'days')

const comments: TComment[] = [
  {
    id: 1,
    author: {
      avatar: avatar1,
      name: 'Ben Mingo',
    },
    message: 'Awesome! 😍',
    publishedAt: twoDaysAgo,
  },
  {
    id: 2,
    author: {
      avatar: avatar2,
      name: 'The Noc Design',
    },
    message: 'cool✨',
    publishedAt: twoDaysAgo,
  },
  {
    id: 3,
    author: {
      avatar: avatar3,
      name: 'Michael Brewer',
    },
    message: 'Extremely convincing!',
    publishedAt: twoDaysAgo,
  },
]

export default function Comments(): JSX.Element {
  return (
    <div className='flex-grow flex flex-col'>
      <div className='font-extrabold text-sm text-gray-a1 mb-18px'>
        Latest comments{' '}
        <span className='text-gray-71'>
          ({commentsPerPageCount} of {commentsCount})
        </span>
      </div>
      <div className='space-y-3.5'>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <div className='flex-grow' />
      <div className='py-6 text-center'>
        <Link to='#' className='link font-extrabold text-xs leading-3'>
          All Comments
        </Link>
      </div>
    </div>
  )
}
