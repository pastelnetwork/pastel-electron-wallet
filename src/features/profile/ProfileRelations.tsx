import React from 'react'
import styles from './Profile.module.css'
import cx from 'classnames'

const ProfileRelations = (): JSX.Element => {
  return (
    <div className='w-full xl:w-1/2 flex flex-col flex-grow px-4'>
      <div className='flex'>
        <div className={cx(styles.tab, styles.active)}>Followers (235)</div>
        <div className={cx(styles.tab)}>Following (162)</div>
        <div className={cx(styles.tab)}>Mutual (73)</div>
      </div>
      <Followers followers={followers} />
    </div>
  )
}

export interface FollowersProps {
  followers: FollowerProps[]
}

export interface FollowerProps {
  name: string
}

const Followers = ({ followers }: FollowersProps): JSX.Element => {
  return (
    <div className='flex flex-col pt-2 pr-4'>
      {followers.map((follower: FollowerProps, index: number) => (
        <Follower {...follower} key={index} />
      ))}
    </div>
  )
}

const Follower = ({ name }: FollowerProps): JSX.Element => {
  return (
    <div className='flex items-center py-2 text-md pr-8'>
      <div
        className={cx(
          'rounded-full bg-pink-300 w-10 h-10',
          styles.follower_avatar,
        )}
      ></div>
      <div className={cx('flex-grow font-bold pl-4', styles.follower_name)}>
        {' '}
        {name}{' '}
      </div>
      <div className={cx('text-gray-400 text-sm')}>161 followers</div>
    </div>
  )
}

const followers = [
  {
    name: 'Salley Fadel',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Edwardo Bea',
    count: 161,
  },
  {
    name: 'Aiya Gerald',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Aniya Harber',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Edwardo Bea',
    count: 161,
  },
  {
    name: 'Reymundo',
    count: 161,
  },
  {
    name: 'Sally Fadel',
    count: 161,
  },
]

export default ProfileRelations
