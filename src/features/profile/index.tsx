import React, { useState } from 'react'

import MySecurity from './mySecurity/MySecurity'
import MultiToggleSwitch from '../../common/components/MultiToggleSwitch'

type TProfileProps = {
  info: {
    currencyName: string
  }
}

const Profile = (props: TProfileProps): JSX.Element => {
  const { info } = props

  const tabs = [
    {
      label: 'General',
    },
    {
      label: 'Board',
      count: 12,
    },
    {
      label: 'Security',
      component: <MySecurity info={info} />,
    },
  ]

  const [selectIndex, setSelectIndex] = useState(0)

  return (
    <>
      <div className='flex items-center bg-white py-30px px-60px'>
        <span className='font-avenir font-extrabold text-h1 leading-10 mr-41.5px'>
          My Profile
        </span>
        <MultiToggleSwitch
          activeIndex={selectIndex}
          data={tabs}
          onToggle={setSelectIndex}
        />
      </div>
      {tabs[selectIndex]?.component}
    </>
  )
}

export default Profile
