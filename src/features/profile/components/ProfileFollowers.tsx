import svg_diamond from '../../../common/assets/icons/diamond.svg'
import svg_oval_1 from '../../../common/assets/icons/avatars/oval_1.svg'
import svg_oval_2 from '../../../common/assets/icons/avatars/oval_2.svg'
import svg_oval_3 from '../../../common/assets/icons/avatars/oval_3.svg'
import svg_oval_4 from '../../../common/assets/icons/avatars/oval_4.svg'
import svg_oval_5 from '../../../common/assets/icons/avatars/oval_5.svg'
import svg_oval_6 from '../../../common/assets/icons/avatars/oval_6.svg'
import svg_oval_7 from '../../../common/assets/icons/avatars/oval_7.svg'

export type FollowersProps = FollowerProps[]

export type FollowerProps = {
  name: string
  count: number
  avatar: string
  diamond?: boolean
}

const followers: FollowersProps = [
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
]

const Followers = (): JSX.Element => {
  return (
    <div className='flex flex-col pt-2 pr-4'>
      {followers.map((follower: FollowerProps, index: number) => (
        <Follower {...follower} key={index} />
      ))}
    </div>
  )
}

const Follower = ({
  name,
  count,
  avatar,
  diamond,
}: FollowerProps): JSX.Element => {
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

export default Followers
