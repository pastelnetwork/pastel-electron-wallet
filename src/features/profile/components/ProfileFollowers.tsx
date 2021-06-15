import React from 'react'
import svg_diamond from 'common/assets/icons/ico-diamond.svg'
import svg_oval_1 from 'common/assets/images/avatars/oval-1.svg'
import svg_oval_2 from 'common/assets/images/avatars/oval-2.svg'
import svg_oval_3 from 'common/assets/images/avatars/oval-3.svg'
import svg_oval_4 from 'common/assets/images/avatars/oval-4.svg'
import svg_oval_5 from 'common/assets/images/avatars/oval-5.svg'
import svg_oval_6 from 'common/assets/images/avatars/oval-6.svg'
import svg_oval_7 from 'common/assets/images/avatars/oval-7.svg'

export type TFollowers = TFollower[]

export type TFollower = {
  name: string
  count: number
  avatar: string
  diamond?: boolean
}

const Followers = (): JSX.Element => {
  return (
    <div className='flex flex-col pt-2 pr-4 max-h-700px overflow-y-auto pr-8 -mt-7'>
      <div className='pt-7' />
      {followers.map((follower: TFollower, index: number) => (
        <Follower {...follower} key={index} />
      ))}
    </div>
  )
}

const Follower = ({ name, count, avatar, diamond }: TFollower): JSX.Element => {
  return (
    <div className='flex items-center py-2 text-md'>
      <div className='rounded-full bg-pink-300 w-10 h-10 relative'>
        <img src={avatar} />
        {diamond && (
          <img src={svg_diamond} className='absolute bottom-0 right-0' />
        )}
      </div>
      <div className='flex-grow font-bold pl-4 text-gray-23'> {name} </div>
      <div className='text-gray-a0 text-sm'>{count} followers</div>
    </div>
  )
}

const followers: TFollowers = [
  {
    name: 'Salley Fadel',
    count: 161,
    avatar: svg_oval_1,
    diamond: true,
  },
  {
    name: 'Aniya Harber',
    count: 162,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 16,
    avatar: svg_oval_3,
  },
  {
    name: 'Edwardo Bea',
    count: 163,
    avatar: svg_oval_4,
    diamond: true,
  },
  {
    name: 'Aiya Gerald',
    count: 161,
    avatar: svg_oval_5,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Edwardo Bea',
    count: 161,
    avatar: svg_oval_3,
    diamond: true,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_4,
  },
  {
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
  },
  {
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
  },
  {
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
  },
  {
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
  },
  {
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
  },
  {
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
  },
]

export default Followers
