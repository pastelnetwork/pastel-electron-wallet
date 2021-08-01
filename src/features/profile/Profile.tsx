import React, { useState, useEffect } from 'react'

import { useAppSelector } from 'redux/hooks'
import ProfileGeneral from './myProfile/MyProfile'
import MySecurity from './mySecurity/MySecurity'
import {
  fetchPastelIDAndPrivateKeys,
  splitStringIntoChunks,
} from './mySecurity/common/utils'
import MyComments from './myComments/MyComments'
import RestoreModal from './mySecurity/restorePrivateKeyAndPastelID/RestoreModal'
import PageHeader from '../../common/components/PageHeader'
import Breadcrumbs, { TBreadcrumb } from '../../common/components/Breadcrumbs'
import { Button } from 'common/components/Buttons'

export type TRPCConfig = {
  username: string
  password: string
  url: string
}

type TProfileProps = {
  rpcConfig: TRPCConfig
}

enum Tabs {
  general,
  board,
  security,
}

const Profile = (props: TProfileProps): JSX.Element => {
  const {
    info: { currencyName },
  } = useAppSelector(state => state.appInfo)
  const { rpcConfig } = props
  const [tab, setTab] = useState(Tabs.general)
  const [qrcodeData, setQRcodeData] = useState<string[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const tabs = [
    { label: 'General', count: 1122 },
    {
      label: 'Board',
      count: 12,
    },
    { label: 'My Security', count: 12 },
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

  useEffect(() => {
    const fetchData = async () => {
      const chunkQuantity = 500
      const results = await fetchPastelIDAndPrivateKeys(rpcConfig)
      if (results) {
        const chunks = splitStringIntoChunks(results, chunkQuantity)
        setQRcodeData(chunks)
      }
    }
    if (!qrcodeData.length) {
      fetchData()
    }
  }, [])

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
      >
        {tab === Tabs.security ? (
          <div className='flex items-center'>
            <div className='mr-20px font-normal text-sm text-gray-4a text-right'>
              <p className='mb-2px'>Already have a PastelID?</p>
              <p className='mb-0'>
                Restore your account and PSL addresses from a backup
              </p>
            </div>
            <div className='w-120px'>
              <Button
                variant='default'
                className='w-full'
                onClick={() => setModalIsOpen(true)}
              >
                Restore
              </Button>
            </div>
          </div>
        ) : null}
      </PageHeader>
      {tab === Tabs.general && <ProfileGeneral />}
      {tab === Tabs.board && <MyComments />}
      {tab === Tabs.security && (
        <MySecurity
          currencyName={currencyName}
          rpcConfig={rpcConfig}
          qrcodeData={qrcodeData}
        />
      )}
      <RestoreModal
        rpcConfig={rpcConfig}
        modalIsOpen={modalIsOpen}
        onCloseModal={setModalIsOpen}
      />
    </div>
  )
}

export default Profile
