import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral from '../components/ProfileGeneral'
import MultiToggleSwitch from '../../../common/components/MultiToggleSwitch'

const profile_data = {
  username: '@zndrson',
  walletId: '0xc4c16a645aaaa4123b21a',
  reputation: 3.69,
  name: 'Katy Jaison',
  description: 'Cosmic Perspective: Galatic Arch',
  address: 'New York, US',
  social: {
    facebook: 'www.facebook.com/dirk_jaison',
    twitter: 'www.twitter.com/@dirk_jaison',
  },
}

const general_data = {
  location: 'New York, US',
  language: 'English',
  categories: 'motion graphics, illustration, \nabstract',
  reputation: 3.89,
  buyerBans: 3,
  highestFeeRecieved: '136,200,000k PSL (#632)',
  totalSalesAmount: '560,600,00k PSL (#211)',
  totalItemsSold: 14,
  topCategoryPercentage: 'motion graphics 30%',
  bio:
    'I am a digital artist based in Paris, France. My work has been featured in various galleries in Paris and New York City. I love playing with the characteristics of light in all its forms, and I like to challenge the way color is normally perceived in nature. I use various tools to create my work, including Rhino for 3D modeling and and Maxwell for rendering, with other work done in Photoshop and Illustrator.',
}

const Profile = (): JSX.Element => {
  const [tab, setTab] = useState(0)

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  return (
    <div>
      <div className='mx-auto w-full flex flex-col text-gray-23 justify-center bg-gray-f8'>
        <div className='wrapper pt-0 h-35px flex items-center'>
          <div className='text-sm text-gray-71'>Member Profile / General</div>
        </div>
        <div className='bg-white'>
          <div className='wrapper flex h-20 items-center bg-white pl-60px pt-0'>
            <div className='font-bold pr-8 text-32px'>Katy Jailson Profile</div>
            <MultiToggleSwitch
              data={[
                { label: 'Info' },
                { label: 'Portfolio' },
                { label: 'Board' },
              ]}
              activeIndex={tab}
              onToggle={onTabToggle}
            />
          </div>
        </div>
        <div className='wrapper flex py-8 pl-60px pr-25px'>
          <div className='flex w-full'>
            <div className='flex flex-col items-center lg:justify-between'>
              <ProfileCard {...profile_data} isMyProfile={true} />
              <div className='text-gray-400 text-sm mt-24 lg:mt-0'>
                Member Since May 15, 2021
              </div>
            </div>
            <div className='flex flex-col flex-grow pl-8'>
              <div className='flex justify-between flex-col lg:flex-col xl:flex-row'>
                <ProfileGeneral {...general_data} />
                <ProfileRelations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
