import React, { useState } from 'react'
import ProfileCard from './ProfileCard'
import ProfileRelations from './ProfileRelations'
import ProfileTabs from './ProfileTabs'
import ProfileGeneral from './ProfileGeneral'

const Profile = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className='mx-auto w-full flex bg-gray-f8 text-gray-23'>
      <div className='flex flex-col flex-grow items-center'>
        <div className='w-full bg-white flex justify-center'>
          <ProfileTabs />
        </div>
        <div className='flex px-60px pb-8 max-w-screen-xl justify-center pt-9'>
          <div className='flex flex-col items-center'>
            <ProfileCard editMode={editMode} setEditMode={setEditMode} />
          </div>
          <div className='flex pl-2 justify-between flex-col lg:flex-col xl:flex-row'>
            <ProfileGeneral editMode={editMode} />
            <ProfileRelations />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
