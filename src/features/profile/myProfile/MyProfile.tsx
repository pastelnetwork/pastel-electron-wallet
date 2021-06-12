import React, { useState } from 'react'
import ProfileCard from '../components/MyProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral from '../components/MyProfileGeneral'
import PageHeader from '../../../common/components/PageHeader'

const Profile = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const [isEmpty, setEmpty] = useState<boolean>(false)
  const [tab, setTab] = useState(0)

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  return (
    <div className='mx-auto w-full bg-gray-f8 text-gray-23'>
      <div className='wrapper pt-0 h-35px flex items-center'>
        <div className='text-sm text-gray-71'>My account / General</div>
      </div>
      <PageHeader
        title='My Account'
        routes={{
          data: [
            { label: 'Info' },
            { label: 'Comments', count: 2 },
            { label: 'Security', count: 2 },
          ],
          activeIndex: tab,
          onToggle: onTabToggle,
        }}
      />
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
          <div className='flex pl-2 justify-between flex-col lg:flex-col xl:flex-row flex-grow'>
            <ProfileGeneral editMode={editMode} isEmpty={isEmpty} />
            <ProfileRelations isEmpty={isEmpty} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile