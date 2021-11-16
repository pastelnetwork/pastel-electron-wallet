import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import svg_diamond from 'common/assets/icons/ico-diamond.svg'
import svg_oval_1 from 'common/assets/images/avatars/oval-1.svg'
import svg_oval_2 from 'common/assets/images/avatars/oval-2.svg'
import svg_oval_3 from 'common/assets/images/avatars/oval-3.svg'
import svg_oval_4 from 'common/assets/images/avatars/oval-4.svg'
import svg_oval_5 from 'common/assets/images/avatars/oval-5.svg'
import svg_oval_6 from 'common/assets/images/avatars/oval-6.svg'
import svg_oval_7 from 'common/assets/images/avatars/oval-7.svg'
import { Button } from 'common/components/Buttons'

export type TFollower = {
  id: string
  name: string
  count: number
  avatar: string
  diamond?: boolean
  is_followed: boolean
}

export type TFollowers = TFollower[]

const followers: TFollowers = [
  {
    id: uuidv4(),
    name: 'Salley Fadel',
    is_followed: false,
    count: 161,
    avatar: svg_oval_1,
    diamond: true,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 162,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 16,
    avatar: svg_oval_3,
    is_followed: true,
  },
  {
    id: uuidv4(),
    name: 'Edwardo Bea',
    count: 163,
    avatar: svg_oval_4,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aiya Gerald',
    count: 161,
    avatar: svg_oval_5,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Edwardo Bea',
    count: 161,
    avatar: svg_oval_3,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_4,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Sally Fadel',
    count: 161,
    avatar: svg_oval_5,
    diamond: true,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_6,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_7,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Aniya Harber',
    count: 161,
    avatar: svg_oval_1,
    is_followed: false,
  },
  {
    id: uuidv4(),
    name: 'Reymundo',
    count: 161,
    avatar: svg_oval_2,
    is_followed: false,
  },
]

function Follower({
  name,
  count,
  avatar,
  diamond,
  is_followed,
}: TFollower): JSX.Element {
  return (
    <div className='flex items-center py-2 text-md'>
      <div className='rounded-full bg-pink-300 w-10 h-10 relative'>
        <img src={avatar} />
        {diamond && (
          <img src={svg_diamond} className='absolute bottom-0 right-0' />
        )}
      </div>
      <div className='flex-grow font-bold pl-4 text-gray-23'>
        <div className='text-lg font-extrabold text-gray-4a'>{name}</div>
        <div className='text-gray-a0 text-sm font-normal'>
          {count} followers
        </div>
      </div>
      <div className='text-gray-a0 text-sm'>
        {is_followed ? (
          <Button
            variant='secondary'
            disabled
            className='py-1.5 px-[13px] text-blue-9b'
          >
            Unfollow
          </Button>
        ) : (
          <Button variant='secondary' className='py-1.5 px-[13px]'>
            Follow
          </Button>
        )}
      </div>
    </div>
  )
}

function Followers(): JSX.Element {
  return (
    <div className='flex flex-col pt-2 max-h-700px overflow-y-auto pr-8 -mt-7'>
      <div className='pt-7' />
      {followers.map((follower: TFollower) => (
        <Follower {...follower} key={follower.id} />
      ))}
    </div>
  )
}

export default Followers
