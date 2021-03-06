import React, { useState, useCallback } from 'react'
import cn from 'classnames'

import Followers from './ProfileFollowers'
import { translate } from 'features/app/translations'
import ico_users from 'common/assets/icons/ico-users.svg'

const cx_tab =
  'text-sm w-fit font-medium pt-1 pb-3 text-gray-b0 border-gray-f3 cursor-pointer'
const cx_tab_active =
  'text-sm w-fit border-b font-bold pt-1 pb-3 text-gray-33 border-gray-33 cursor-pointer'

const relationCounts = { followers: 235, friends: 0, following: 162 }

function ProfileRelationButton({
  setTab,
  tab,
  text,
  value,
}: {
  setTab: (val: string) => void
  tab: string
  text: string
  value: string
}): JSX.Element {
  const onClick = useCallback(() => {
    setTab(value)
  }, [value])

  return (
    <div
      className={tab == value ? cx_tab_active : cx_tab}
      onClick={onClick}
      role='button'
      tabIndex={0}
      aria-hidden='true'
    >
      {text}
    </div>
  )
}

function ProfileRelations(): JSX.Element {
  const [tab, setTab] = useState('Followers')
  const isEmpty = false

  const renderStatistics = () => (
    <div
      className={`flex justify-between ${
        !isEmpty ? 'mr-8' : ''
      } bg-gray-f8 z-10 relative`}
    >
      <div className='flex-grow z-10'>
        <ProfileRelationButton
          tab={tab}
          setTab={setTab}
          text={`${translate('followers')} (${relationCounts.followers})`}
          value='Followers'
        />
      </div>
      <div className='flex-grow z-10 flex justify-center'>
        <ProfileRelationButton
          tab={tab}
          setTab={setTab}
          text={`${translate('friends')} (${relationCounts.friends})`}
          value='Friends'
        />
      </div>
      <div className='flex-grow z-10 flex justify-end'>
        <ProfileRelationButton
          tab={tab}
          setTab={setTab}
          text={`${translate('following')} (${relationCounts.following})`}
          value='Following'
        />
      </div>
      <div className='absolute left-0 bottom-0 z-0 w-full border-t text-gray-b0' />
    </div>
  )

  return (
    <div
      className={cn(
        'w-full lg:w-2/5 flex flex-col flex-grow pr-4 lg:pr-0',
        !isEmpty ? 'lg:max-w-398px' : 'lg:max-w-359px',
      )}
    >
      {renderStatistics()}
      {tab == 'Followers' &&
        (isEmpty ? (
          <div className='bg-gray-e6 opacity-60 opacity mt-4 p-2 flex flex-col text-gray-71 rounded-lg flex-center h-234px'>
            <img src={ico_users} alt='Users' />
            <div className='text-gray-71 mt-2'>
              {translate('youHaveNoFollowers')}
            </div>
            <div className='text-gray-a0 mt-1 whitespace-pre text-center'>
              {translate('NoOneHasSubscribed')}
            </div>
          </div>
        ) : (
          <Followers />
        ))}
      {tab == 'Friends' && (
        <div className='text-center pt-8'>
          {translate('placeholderForFriendsView')}
        </div>
      )}
      {tab == 'Following' && (
        <div className='text-center pt-8'>
          {translate('placeholderForFollowingView')}
        </div>
      )}
    </div>
  )
}

export default ProfileRelations
