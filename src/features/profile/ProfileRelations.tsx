import React from 'react'

const ProfileRelations = (): JSX.Element => {
  return (
    <div className='w-full xl:w-1/2 flex flex-col flex-grow px-4 xl:pl-12'>
      <div className='flex'>
        <div className='text-sm border-b px-4 pt-2 border-gray-b0 text-gray-b0 text-gray-33 border-gray-33'>
          Followers (235)
        </div>
        <div className='text-sm border-b px-4 pt-2 border-gray-b0 text-gray-b0'>
          Following (162)
        </div>
        <div className='text-sm border-b px-4 pt-2 border-gray-b0 text-gray-b0'>
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
      <div className='rounded-full bg-pink-300 w-10 h-10'></div>
      <div className='flex-grow font-bold pl-4'> {name} </div>
      <div className='text-gray-400 text-sm'>161 followers</div>
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
