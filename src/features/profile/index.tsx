import React from 'react'
import 'rc-rate/assets/index.css'
import '../../legacy/assets/css/rc-rate.custom.css'
import ProfileCard from './ProfileCard'
import ProfileRelations from './ProfileRelations'
import ProfileTabs from './ProfileTabs'
import ProfileGeneral from './ProfileGeneral'

const Profile = (): JSX.Element => {
  return (
    <div className='mx-auto w-full px-60px py-8 flex max-w-screen-xl bg-gray-f8 text-gray-23'>
      <div className='flex flex-col items-center lg:justify-between'>
        <ProfileCard />
        <div className='text-gray-400 text-sm mt-24 lg:mt-0'>
          Member Since May 15, 2021
        </div>
      </div>
      <div className='flex flex-col flex-grow pl-4'>
        <ProfileTabs />
        <div className='flex pt-4 pl-2 justify-between flex-col lg:flex-col xl:flex-row'>
          <ProfileGeneral />
          <ProfileRelations />
        </div>
      </div>
    </div>
  )
}

export default Profile
