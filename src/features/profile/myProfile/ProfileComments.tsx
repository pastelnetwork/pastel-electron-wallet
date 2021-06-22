import React, { useState } from 'react'
import ProfileCard from '../components/MyProfileCard'
import ProfileGeneral from '../components/MyProfileGeneral'
import ProfileCommentFilter from '../components/ProfileCommentFilter'

const ProfileComments = (): JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [isEmpty, setEmpty] = useState<boolean>(false)

  return (
    <div className='flex flex-col flex-grow items-center'>
      <div className='wrapper flex px-60px pb-8 justify-center pt-9 w-full'>
        <div className='flex flex-col items-center'>
          <ProfileCard
            editMode={editMode}
            setEditMode={setEditMode}
            isEmpty={isEmpty}
            setEmpty={setEmpty}
          />
        </div>
        <div className='flex pl-2 justify-between flex-col 1200px:flex-row flex-grow'>
          <ProfileGeneral editMode={editMode} isEmpty={isEmpty} />
          <ProfileCommentFilter />
        </div>
      </div>
    </div>
  )
}

export default ProfileComments
