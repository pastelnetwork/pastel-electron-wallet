import React, { useState, ReactNode, useCallback } from 'react'
import cn from 'classnames'
import SVG from 'react-inlinesvg'
import dayjs from 'dayjs'

import { Button } from 'common/components/Buttons'
import Link from 'common/components/Link'
import { translate } from 'features/app/translations'

import ico_heart from 'common/assets/icons/ico-heart.svg'
import ico_heart_empty from 'common/assets/icons/ico-heart-empty.svg'

export type TComment = {
  id: number
  avatar: string
  name: string
  liked?: number
  author?: string
  time: number
  comment: string
  replyId?: number
  profileUrl?: string
  portfolioUrl?: string
}

type TCommentCardProps = TComment & {
  onReply: (replyId: number, reply: string) => void
  className?: string
  hasBorder?: boolean
  children?: ReactNode
  hideReply?: boolean
  hideLike?: boolean
  onLikeClick: (commentId: number) => void
}

export default function CommentCard(props: TCommentCardProps): JSX.Element {
  const {
    id,
    avatar,
    name,
    liked,
    author,
    time,
    comment,
    className,
    hasBorder,
    children,
    onReply,
    hideReply,
    hideLike,
    onLikeClick,
    profileUrl,
    portfolioUrl,
  } = props

  const [reply, setReply] = useState('')
  const [isFocus, setIsFocus] = useState(false)

  const onChange = useCallback(e => {
    setReply(e.target.value)
  }, [])

  const onFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsFocus(false)
  }, [])

  const handleOnReply = useCallback(() => {
    onReply(id, reply)
  }, [])

  const handleOnLikeClick = useCallback(() => {
    onLikeClick(id)
  }, [])

  const renderCommentContent = () => (
    <div className='pr-82px'>
      <div className='mt-4 text-base font-medium text-gray-4a mb-[17px]'>
        {'"'}
        {comment}
        {'"'}
      </div>
      {children}
      {!hideReply ? (
        <>
          <div className='rounded bg-white px-4 pt-8px pb-3px shadow-4px'>
            <textarea
              className='w-full rounded outline-none h-22px resize-none overflow-hidden'
              value={reply}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={translate('reply')}
            />
          </div>
          {isFocus || !!reply ? (
            <div className='mt-4'>
              <Button
                onClick={handleOnReply}
                disabled={!reply}
                className='py-3 px-33px font-medium'
              >
                {translate('post')}
              </Button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )

  const renderUserInfo = () => (
    <div className='flex justify-between'>
      <Link
        to={profileUrl}
        className='text-base font-extrabold text-gray-11 cursor-pointer'
      >
        {name}
      </Link>
      {!hideLike ? (
        <div className='text-sm leading-18px font-medium text-gray-71 flex items-center'>
          {liked ? liked : null}
          <SVG
            onClick={handleOnLikeClick}
            src={liked ? ico_heart : ico_heart_empty}
            className={cn('cursor-pointer w-4 h-13px', liked && 'ml-9px')}
          />
        </div>
      ) : null}
    </div>
  )

  const renderUserAvatar = () => (
    <div className='mr-20px w-68px'>
      <Link to={profileUrl} className='cursor-pointer'>
        <img src={avatar} alt={name} className='w-48px h-48px rounded-full' />
      </Link>
    </div>
  )

  const renderCommentDate = () => (
    <span className='text-gray-71 pl-1'>{dayjs(time).fromNow()}</span>
  )

  return (
    <div
      className={cn(
        'w-full flex pr-33px',
        className,
        hasBorder && 'border-b-1px border-solid border-gray-d6',
      )}
    >
      {renderUserAvatar()}
      <div className='w-full'>
        {renderUserInfo()}
        <div className='flex text-sm leading-18px font-medium mt-6px'>
          {author ? (
            <p className='text-gray-71'>
              {translate('commentedOn')}{' '}
              <Link to={portfolioUrl} className='pl-1'>
                {author}.
              </Link>{' '}
            </p>
          ) : null}
          {renderCommentDate()}
        </div>
        {renderCommentContent()}
      </div>
    </div>
  )
}

CommentCard.defaultProps = {
  hideLike: false,
  hideReply: false,
  children: null,
  hasBorder: false,
  className: '',
}
