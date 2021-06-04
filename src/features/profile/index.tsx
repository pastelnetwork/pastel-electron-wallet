import React from 'react'
import styled from 'styled-components'
import ProfileCard from '../../common/components/Profile/ProfileCard'
import ProfileRelations from './ProfileRelations'
import ProfileTabs from './ProfileTabs'
import ProfileGeneral from './ProfileGeneral'

const Wrapper = styled.div`
  height: calculate(100vh - 40px);
  overflow-x: auto;
`

const Profile = (): JSX.Element => {
  return (
    <Wrapper>
      <div className='mx-auto w-full px-60px py-8 flex bg-gray-f8 text-gray-23 justify-center'>
        <div className='flex max-w-screen-xl'>
          <div className='flex flex-col items-center lg:justify-between'>
            <ProfileCard />
            <div className='text-gray-400 text-sm mt-24 lg:mt-0'>
              Member Since May 15, 2021
            </div>
          </div>
          <div className='flex flex-col flex-grow pl-8'>
            <ProfileTabs />
            <div className='flex justify-between flex-col lg:flex-col xl:flex-row'>
              <ProfileGeneral />
              <ProfileRelations />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Profile
