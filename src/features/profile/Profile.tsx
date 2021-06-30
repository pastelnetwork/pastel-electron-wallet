import React, { useState } from 'react'
import ProfileGeneral from './myProfile/MyProfile'
import MySecurity from './mySecurity/MySecurity'
import MyComments from './myComments/MyComments'
import PageHeader from '../../common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from '../../common/components/Breadcrumbs'

type TProfileProps = {
  info: {
    currencyName: string
  }
}

enum Tabs {
  info,
  comments,
  security,
}

const Profile = (props: TProfileProps): JSX.Element => {
  const { info } = props
  const [tab, setTab] = useState(Tabs.info)

  const tabs = [
    { label: 'Info', count: 2 },
    {
      label: 'Comments',
      count: 26,
    },
    { label: 'Security' },
  ]

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: 'My account',
      route: '#',
    },
    {
      label: tabs[tab].label,
    },
  ]

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  return (
    <div className='mx-auto w-full bg-gray-f8 text-gray-23 h-auto overflow-hidden'>
      <Breadcrumbs className='h-35px items-center' breadcrumbs={breadcrumbs} />
      <PageHeader
        title='My Account'
        routes={{
          data: tabs,
          activeIndex: tab,
          onToggle: onTabToggle,
        }}
      />
      {tab === Tabs.info && <ProfileGeneral />}
      {tab === Tabs.comments && <MyComments />}
      {tab === Tabs.security && <MySecurity info={info} />}
    </div>
  )
}

export default Profile
