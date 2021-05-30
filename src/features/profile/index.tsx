import React from 'react'
import 'rc-rate/assets/index.css'
import '../../legacy/assets/css/rc-rate.custom.css'
import ProfileCard from './ProfileCard'
import ProfileRelations from './ProfileRelations'
import ProfileTabs from './ProfileTabs'
import ProfileGeneral from './ProfileGeneral'

const Profile = (): JSX.Element => {
  return (
    <div className='psl-mx-auto psl-w-full psl-px-60px psl-py-8 psl-flex psl-max-w-screen-xl psl-bg-gray-f8 psl-text-gray-23'>
      <div className='psl-flex psl-flex-col psl-items-center psl-lg:justify-between'>
        <ProfileCard />
        <div className='psl-text-gray-400 psl-text-sm psl-mt-24 psl-lg:mt-0'>
          Member Since May 15, 2021
        </div>
      </div>
      <div className='psl-flex psl-flex-col psl-flex-grow psl-pl-4'>
        <ProfileTabs />
        <div className='psl-flex psl-pt-4 psl-pl-2 psl-justify-between psl-flex-col psl-lg:flex-col psl-xl:flex-row'>
          <ProfileGeneral />
          <ProfileRelations />
        </div>
      </div>
    </div>
  )
}

export default Profile
