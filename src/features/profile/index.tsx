/* eslint-disable */
import React, { Component } from 'react'
import styles from './Profile.module.css'
import 'rc-rate/assets/index.css'
import '../../legacy/assets/css/rc-rate.custom.css'
import cx from 'classnames'
import ProfileCard from './ProfileCard'
import ProfileRelations from './ProfileRelations'
import ProfileTabs from './ProfileTabs'
import ProfileGeneral from './ProfileGeneral'

const Profile = (): JSX.Element => {
  return (
    <div
      className={cx(
        'px-8 py-10 w-full flex h-screen overflow-y-auto',
        styles.profile,
      )}
    >
      <div
        className={cx(
          'mx-auto w-full bg-white px-14 py-8 flex',
          styles.wrapper,
        )}
      >
        <div className='flex flex-col justify-between'>
          <ProfileCard />
          <div className='text-gray-400 text-sm'>Member Since May 15, 2021</div>
        </div>
        <div className='flex flex-col flex-grow pl-4'>
          <ProfileTabs />
          <div className='flex pt-4 pl-2 justify-between flex-col lg:flex-col xl:flex-row'>
            <ProfileGeneral />
            <ProfileRelations />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
