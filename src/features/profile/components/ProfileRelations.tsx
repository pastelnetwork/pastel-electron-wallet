import React, { useState } from 'react'
import Followers from './ProfileFollowers'

const cx_tab =
  'text-sm border-b font-medium px-4 pt-1 pb-3 text-gray-b0 border-gray-f3 cursor-pointer flex-grow'
const cx_tab_active =
  'text-sm border-b font-bold px-4 pt-1 pb-3 text-gray-33 border-gray-33 cursor-pointer flex-grow'

const relationCounts = { followers: 235, following: 162, mutual: 73 }

const ProfileRelations = (): JSX.Element => {
  const [tab, setTab] = useState('Followers')

  return (
    <div className='w-full xl:w-2/5 flex flex-col flex-grow px-4 xl:pl-2 2xl:pl-6 xl:pr-0'>
      <div className='flex justify-between mr-8 bg-gray-f8 z-10'>
        <div
          className={tab == 'Followers' ? cx_tab_active : cx_tab}
          onClick={() => setTab('Followers')}
        >
          Followers ({relationCounts.followers})
        </div>
        <div
          className={tab == 'Following' ? cx_tab_active : cx_tab}
          onClick={() => setTab('Following')}
        >
          Following ({relationCounts.following})
        </div>
        <div
          className={tab == 'Mutual' ? cx_tab_active : cx_tab}
          onClick={() => setTab('Mutual')}
        >
          Mutual ({relationCounts.mutual})
        </div>
      </div>
      {tab == 'Followers' && <Followers />}
      {tab == 'Following' && (
        <div className='text-center pt-8'>
          This is placeholder for Following View.
        </div>
      )}
      {tab == 'Mutual' && (
        <div className='text-center pt-8'>
          This is placeholder for Mutual View.
        </div>
      )}
    </div>
  )
}

export default ProfileRelations
