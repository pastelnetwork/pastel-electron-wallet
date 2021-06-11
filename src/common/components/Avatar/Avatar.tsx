import React from 'react'
import cn from 'classnames'
import commentIcon from '../../assets/icons/ico-bg-comment.svg'
import keyIcon from '../../assets/icons/ico-bg-key.svg'
import heartIcon from '../../assets/icons/ico-bg-heart.svg'

export type TAvatarProps = {
  avatarSrc: string
  iconType?: 'comment' | 'key' | 'heart' | 'none'
  position?: 'top' | 'bottom'
  classes?: string
}

const MemberCard: React.FC<TAvatarProps> = ({
  avatarSrc,
  iconType = 'none',
  classes = 'w-12 h-12',
  position = 'bottom',
}) => {
  return (
    <div className={cn(classes, 'relative')}>
      <img
        src={avatarSrc}
        alt='avatar image'
        className={cn(classes, 'rounded-full')}
      />
      {iconType === 'comment' && (
        <img
          src={commentIcon}
          alt='comment Icon'
          className={
            position === 'bottom'
              ? 'absolute -bottom-1 -right-5px'
              : 'absolute top-0 right-0'
          }
        />
      )}
      {iconType === 'key' && (
        <img
          src={keyIcon}
          alt='comment Icon'
          className={
            position === 'bottom'
              ? 'absolute -bottom-1 -right-5px'
              : 'absolute top-0 right-0'
          }
        />
      )}
      {iconType === 'heart' && (
        <img
          src={heartIcon}
          alt='comment Icon'
          className={
            position === 'bottom'
              ? 'absolute -bottom-1 -right-5px'
              : 'absolute top-0 right-0'
          }
        />
      )}
    </div>
  )
}

export default MemberCard
