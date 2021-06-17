import React, { useState } from 'react'
import ProfileGeneral from './myProfile/MyProfile'
import MySecurity from './mySecurity/MySecurity'
import PageHeader from '../../common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from '../../common/components/Breadcrumbs'

type TProfileProps = {
  info: {
    currencyName: string
  }
}

const Profile = (props: TProfileProps): JSX.Element => {
  const { info } = props
  const [selectIndex, setSelectIndex] = useState(0)

  const tabs = [
    { label: 'Info', count: 2, component: <ProfileGeneral /> },
    {
      label: 'Comments',
      count: 26,
      component: <div className='text-center'> No comments </div>,
    },
    { label: 'Security', component: <MySecurity info={info} /> },
  ]

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: 'My account',
      route: '#',
    },
    {
      label: tabs[selectIndex].label,
    },
  ]

  const onTabToggle = (index: number) => {
    setSelectIndex(index)
  }

  return (
    <div className='mx-auto w-full bg-gray-f8 text-gray-23'>
      <Breadcrumbs className='h-35px items-center' breadcrumbs={breadcrumbs} />
      <PageHeader
        title='My Account'
        routes={{
          data: tabs,
          activeIndex: selectIndex,
          onToggle: onTabToggle,
        }}
      />
      {tabs[selectIndex]?.component}
    </div>
  )
}

export default Profile
