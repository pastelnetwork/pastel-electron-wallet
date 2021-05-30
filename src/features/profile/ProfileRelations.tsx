import React from 'react'

const ProfileRelations = (): JSX.Element => {
  return (
    <div className='psl-psl-w-full psl-xl:w-1/2 psl-flex psl-flex-col psl-flex-grow psl-px-4 psl-xl:pl-12'>
      <div className='psl-flex'>
        <div className='psl-text-sm psl-border-b psl-px-4 psl-pt-2 psl-border-gray-b0 psl-text-gray-b0 psl-text-gray-33 psl-border-gray-33'>
          Followers (235)
        </div>
        <div className='psl-text-sm psl-border-b psl-px-4 psl-pt-2 psl-border-gray-b0 psl-text-gray-b0'>
          Following (162)
        </div>
        <div className='psl-text-sm psl-border-b psl-px-4 psl-pt-2 psl-border-gray-b0 psl-text-gray-b0'>
          Mutual (73)
        </div>
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
    <div className='psl-flex psl-flex-col psl-pt-2 psl-pr-4'>
      {followers.map((follower: FollowerProps, index: number) => (
        <Follower {...follower} key={index} />
      ))}
    </div>
  )
}

const Follower = ({ name }: FollowerProps): JSX.Element => {
  return (
    <div className='psl-flex psl-items-center psl-py-2 psl-text-md psl-pr-8'>
      <div className='psl-rounded-full psl-bg-pink-300 psl-w-10 psl-h-10'></div>
      <div className='psl-flex-grow psl-font-bold psl-pl-4'> {name} </div>
      <div className='psl-text-gray-400 psl-text-sm'>161 followers</div>
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
