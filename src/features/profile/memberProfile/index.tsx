import React, { useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral from '../components/ProfileGeneral'
import MultiToggleSwitch from '../../../common/components/MultiToggleSwitch'
import { useCurrencyName } from 'common/hooks/appInfo'

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

const Profile = (): JSX.Element => {
  const currencyName = useCurrencyName()
  const [tab, setTab] = useState(0)

  const general_data = {
    location: 'New York, US',
    language: 'English',
    categories: 'Motion Graphics, Illustration, Abstract',
    reputation: 3.89,
    buyerBans: 3,
    highestFeeRecieved: `136,200,000k ${currencyName} (#632)`,
    totalSalesAmount: `560,600,00k ${currencyName} (#211)`,
    totalItemsSold: '124 Copies across 5 NFTs',
    topCategoryPercentage: 'motion graphics 30%',
    bio:
      'I’m baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pinterest mumblecore tousled occupy brunch whatever ugh.',
  }

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  return (
    <div>
      <div className='mx-auto w-full flex flex-col text-gray-23 justify-center bg-gray-f8'>
        <div className='bg-white'>
          <div className='wrapper flex h-100px items-center bg-white px-60px pt-0'>
            <div className='font-bold pr-8 text-32px'>Katy Jailson Profile</div>
            <MultiToggleSwitch
              data={[
                { label: 'General' },
                { label: 'Portfolio' },
                { label: 'Board' },
              ]}
              activeIndex={tab}
              onToggle={onTabToggle}
            />
          </div>
        </div>
        <div className='wrapper flex py-8 px-60px'>
          <div className='flex w-full'>
            <div className='flex flex-col items-center lg:justify-between'>
              <ProfileCard {...profile_data} isMyProfile={true} />
              <div className='text-gray-400 text-sm mt-24 lg:mt-0'>
                Member Since May 15, 2021
              </div>
            </div>
            <div className='flex flex-col flex-grow pl-8'>
              {/* <ProfileTabs /> */}
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
