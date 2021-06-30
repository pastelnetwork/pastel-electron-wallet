import React, { Fragment } from 'react'

import CommentCard, { TComment } from './CommentCard'

type TCommentsProps = {
  comments: TComment[]
  onReply: (replyId: number, reply: string) => void
  onLikeClick: (commentId: number) => void
}

export default function Comments({
  comments,
  onReply,
  onLikeClick,
}: TCommentsProps): JSX.Element {
  const generateComment = (replyId: number, level: number) => {
    const commentsData = comments.filter(comment => comment.replyId === replyId)

    return commentsData.map(comment => (
      <Fragment key={comment.id}>
        <CommentCard
          className={`${
            replyId === 0 ? 'bg-white rounded-xl pt-30px pb-8' : ''
          } ${level > 1 ? '' : 'pl-30px pb-8 mb-8'}`}
          {...comment}
          onReply={onReply}
          hasBorder={level === 1}
          hideLike={level > 1}
          hideReply={level > 1}
          onLikeClick={onLikeClick}
        >
          {level >= 1 ? generateComment(comment.id, level + 1) : null}
        </CommentCard>
        {level < 1 ? generateComment(comment.id, level + 1) : null}
      </Fragment>
    ))
  }

  return (
    <div className='overflow-y-auto overflow-x-hidden max-h-1293px pr-20px'>
      <div className='w-full'>{generateComment(0, 0)}</div>
    </div>
  )
}
