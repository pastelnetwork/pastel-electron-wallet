import React from 'react'

import { translate } from 'features/app/translations'
import { TComment } from './Comment.types'

type TCommentProps = {
  comment: TComment
}

export default function Comment({ comment }: TCommentProps): JSX.Element {
  const renderCOmmentContent = () => (
    <div className='leading-5'>
      <div className='text-extrabold text-black text-13px'>
        {comment.author.name}
      </div>
      <div className='text-gray-4a text-13px'>{comment.message}</div>
      <div className='flex text-xs space-x-18px'>
        <div className='text-gray-a6 leading-5'>
          {comment.publishedAt.fromNow(true)}
        </div>
        <button
          type='button'
          className='text-gray-a6 hover:text-gray-b0 leading-5 font-extrabold'
        >
          {translate('reply')}
        </button>
      </div>
    </div>
  )

  return (
    <div className='flex space-x-2 md:space-x-3'>
      <div className='w-8 h-8 rounded-full overflow-hidden'>
        <img
          src={comment.author.avatar}
          className='object-cover'
          alt='Avatar'
        />
      </div>
      {renderCOmmentContent()}
    </div>
  )
}
