import React from 'react'
import cn from 'classnames'
// Components
import { Modal } from '../../../common/components/Modal'
import Comment from '../../../common/components/Comment'
import Scrollbar from '../../../common/components/Scrollbar'

type TComment = {
  id: number
  avatar: string
  name: string
  commentedOn: string
  when: string
  comment: string
  likes: number
  className?: string
}

export type TCommentModal = {
  comments: Array<TComment>
  isOpen: boolean
  handleClose: () => void
}

const CommentModal = ({
  comments,
  isOpen,
  handleClose,
}: TCommentModal): JSX.Element => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-lg'>
      <h2 className='mb-6'>Comments ({comments?.length})</h2>
      <Scrollbar maxHeight='425'>
        {comments.map(
          ({ id, avatar, name, when, comment, commentedOn, likes }, idx) => (
            <div
              key={id}
              className={cn(
                'border-gray-eb',
                idx !== comments.length - 1 && 'pb-7 mb-7 border-b',
              )}
            >
              <Comment
                avatar={avatar}
                name={name}
                when={when}
                comment={comment}
                commentedOn={commentedOn}
                likes={likes}
              />
            </div>
          ),
        )}
      </Scrollbar>
    </Modal>
  )
}

export default CommentModal
