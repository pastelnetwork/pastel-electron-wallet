import React, { useState } from 'react'
import cn from 'classnames'
import Followers from './ProfileFollowers'
import ico_users from 'common/assets/icons/ico-users.svg'

const cx_tab =
  'text-sm w-fit font-medium pt-1 pb-3 text-gray-b0 border-gray-f3 cursor-pointer'
const cx_tab_active =
  'text-sm w-fit border-b font-bold pt-1 pb-3 text-gray-33 border-gray-33 cursor-pointer'

const relationCounts = { followers: 235, friends: 0, following: 162 }

export type TProfileRelations = {
  isEmpty?: boolean
}

const ProfileRelations = ({ isEmpty }: TProfileRelations): JSX.Element => {
  const [tab, setTab] = useState('Followers')

  return (
    <div
      className={cn(
        'w-full lg:w-2/5 flex flex-col flex-grow pr-4 lg:pr-0',
        !isEmpty ? 'lg:max-w-398px' : 'lg:max-w-359px',
      )}
    >
      <div
        className={`flex justify-between ${
          !isEmpty ? 'mr-8' : ''
        } bg-gray-f8 z-10 relative`}
      >
        <div className='flex-grow z-10'>
          <div
            className={tab == 'Followers' ? cx_tab_active : cx_tab}
            onClick={() => setTab('Followers')}
          >
            Followers ({relationCounts.followers})
          </div>
        </div>
        <div className='flex-grow z-10 flex justify-center'>
          <div
            className={tab == 'Friends' ? cx_tab_active : cx_tab}
            onClick={() => setTab('Friends')}
          >
            Friends ({relationCounts.friends})
          </div>
        </div>
        <div className='flex-grow z-10 flex justify-end'>
          <div
            className={tab == 'Following' ? cx_tab_active : cx_tab}
            onClick={() => setTab('Following')}
          >
            Following ({relationCounts.following})
          </div>
        </div>
        <div className='absolute left-0 bottom-0 z-0 w-full border-t text-gray-b0' />
      </div>
      {tab == 'Followers' &&
        (isEmpty ? (
          <div className='bg-gray-e6 opacity-60 opacity mt-4 p-2 flex flex-col text-gray-71 rounded-lg flex-center h-234px'>
            <img src={ico_users} />
            <div className='text-gray-71 mt-2'>You have no followers</div>
            <div className='text-gray-a0 mt-1 whitespace-pre text-center'>
              {'No one has subscribed to you yet \nbut you can'}
            </div>
          </div>
        ) : (
          <Followers />
        ))}
      {tab == 'Friends' && (
        <div className='text-center pt-8'>
          This is placeholder for friends View.
        </div>
      )}
      {tab == 'Following' && (
        <div className='text-center pt-8'>
          This is placeholder for Following View.
        </div>
      )}
    </div>
  )
}

export default ProfileRelations
