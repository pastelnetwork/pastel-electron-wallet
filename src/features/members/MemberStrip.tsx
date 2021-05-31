import React from 'react'

export type MemberCard = {
  avatar: string
  name: string
  followers: number | string
  role?: string
}

export interface MemberStripProps {
  memberCard: MemberCard
  heighestSold: number | string
  totalSell: number | string
  images: string[]
  // onFollowClick: () => void
}

const MemberStrip: React.FC<MemberStripProps> = ({
  memberCard,
  heighestSold,
  images,
  totalSell,
}) => {
  return (
    <div className='flex space-x-4'>
      {/* Member Card */}
      <div className='w-3/12 md:w-244px'>
        <MemberCard {...memberCard} />
      </div>
      <div className='w-9/12 md:flex-grow border-b border-navigation-background'>
        <div className='flex space-x-4 h-full'>
          {/* Sale data */}
          <div className='flex flex-col justify-center h-full'>
            <h6 className='text-gray-a0 pb-1'>Highest sold</h6>
            <div className='w-max text-h6 font-semibold border py-1 px-2 rounded-4px border-success-pressed text-success-pressed'>
              {heighestSold} PSL
            </div>
            <div className='text-gray-1a font-semibold pt-3 text-h6'>
              Total sell <span className='text-gradient'>{totalSell} PSL</span>
            </div>
          </div>
          {/* Images */}
          <div className='flex space-x-4 h-full overflow-x-auto'>
            {images.map(imgSrc => (
              <div className='flex flex-col justify-center h-full '>
                <div className='w-28 h-24 object-cover'>
                  <img src={imgSrc} className='rounded-xl' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const MemberCard: React.FC<MemberCard> = props => {
  return (
    <div className='px-5 py-7 bg-background-main rounded-2xl'>
      <div className='flex space-x-4'>
        <img src={props.avatar} className='w-88px h-88px' />
        <div className='flex flex-col justify-between'>
          <div>
            <h5 className='text-gray-1a font-semibold'>{props.name}</h5>
            <h6 className='text-gray-a0'>{props.followers} followers</h6>
          </div>
          <button className='rounded-3xl border-gray-1a border py-1'>
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemberStrip
