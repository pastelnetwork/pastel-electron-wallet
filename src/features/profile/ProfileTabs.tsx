import React from 'react'
import styles from './Profile.module.css'
import cx from 'classnames'

const ProfileTabs = (): JSX.Element => {
  return (
    <div className='w-72 flex border rounded-full ml-4 text-md'>
      <div className={cx(styles.tab_round, styles.active)}>General</div>
      <div className={cx(styles.tab_round)}>
        Portfolio
        <div
          className={cx(
            'w-4 h-4 rounded-full bg-gray-400 text-white flex justify-center items-center ml-2',
            styles.badge,
          )}
        >
          7
        </div>
      </div>
      <div className={cx(styles.tab_round)}>
        Board
        <div
          className={cx(
            'w-4 h-4 rounded-full bg-gray-400 text-white flex justify-center items-center ml-2',
            styles.badge,
          )}
        >
          12
        </div>
      </div>
    </div>
  )
}

export default ProfileTabs
