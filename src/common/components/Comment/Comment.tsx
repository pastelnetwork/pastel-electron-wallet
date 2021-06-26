import React from 'react'
import Avatar from '../Avatar'
import { Input } from '../Inputs'
import Like from '../Like'
import cn from 'classnames'

export type TComment = {
  avatar: string
  name: string
  commentedOn: string
  when: string
  comment: string
  likes: number
  className?: string
}

const Comment = ({
  avatar,
  name,
  commentedOn,
  when,
  comment,
  className,
  likes,
}: TComment): JSX.Element => {
  const classes = cn('flex flex-wrap', className)
  return (
    <div className={classes}>
      <div className='mr-5'>
        <Avatar avatarSrc={avatar} />
      </div>
      <div className='flex-1'>
        <div className='flex flex-wrap justify-between'>
          <h6 className='font-extrabold mb-1'>{name}</h6>
          <Like count={likes} />
        </div>
        <p className='text-14px text-gray-71 font-medium mb-3'>
          Commented on <span className='text-link'>{commentedOn}</span> {when}
        </p>
        <p className='font-medium mb-6'>{comment}</p>
        <Input placeholder='Reply' className='w-full' />
      </div>
    </div>
  )
}

export default Comment
