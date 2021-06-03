import React from 'react'
import styled from 'styled-components'
import ProfileCard from '../ProfileCard'
import ProfileRelations from '../ProfileRelations'
import ProfileTabs from '../ProfileTabs'
import ProfileGeneral from '../ProfileGeneral'

const Wrapper = styled.div`
  height: calculate(100vh - 40px);
  overflow-x: auto;
`

const profile_data = {
  username: '@zndrson',
  walletId: '0xc4c16a645aaaa4123b21a',
  reputation: 4.89,
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
  postcode: '#121',
  language: 'English',
  categories: 'motion graphics, illustration, abstract',
  reputation: 4.89,
  buyerBans: 3,
  highestFeeRecieved: '136,200,000k PSL (#632)',
  totalSalesAmount: '560,600,00k PSL (#211)',
  totalItemsSold: 14,
  topCategoryPercentage: 'motion graphics 30%',
  bio:
    'I’m baby readymade mikshk tatooed actually activated charcoal godard listicle. Mumblecore cronut kickstarter, bushwick wolf copper mug woke chia put a bird on it viral gentrify keytar synth. Twee chartreuse etsy, +1 dreamcatcher lumbersexual before they sold out drinking vinegar pinterest mumblecore tousled occupy brunch whatever ugh.',
}

const Profile = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='mx-auto w-full px-60px py-8 flex bg-gray-f8 text-gray-23 justify-center'>
        <div className='flex max-w-screen-xl'>
          <div className='flex flex-col items-center lg:justify-between'>
            <ProfileCard {...profile_data} isMyProfile={true} />
            <div className='text-gray-400 text-sm mt-24 lg:mt-0'>
              Member Since May 15, 2021
            </div>
          </div>
          <div className='flex flex-col flex-grow pl-8'>
            <ProfileTabs />
            <div className='flex justify-between flex-col lg:flex-col xl:flex-row'>
              <ProfileGeneral {...general_data} />
              <ProfileRelations />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Profile
