import React, { useState, useEffect, useCallback } from 'react'

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
import { getUserData, TGetResponse } from 'api/walletNode/userData'
import { getCurrentAccount } from 'common/utils/User'

import { useCurrencyName } from '../../common/hooks/appInfo'

enum Tabs {
  general,
  board,
  security,
}

export default function Profile(): JSX.Element {
  const currencyName = useCurrencyName()
  const [tab, setTab] = useState(Tabs.general)
  const [qrcodeData, setQRcodeData] = useState<string[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [user, setUser] = useState<TGetResponse>()

  const tabs = [
    { label: 'General', count: 1122 },
    {
      label: 'Message Board',
      count: 12,
    },
    { label: 'My Security', count: 12 },
  ]

  const breadcrumbs: TBreadcrumb[] = [
    {
      label: 'My Account',
      route: '#',
    },
    {
      label: tabs[tab].label,
    },
  ]

  const fetchUserData = useCallback(async () => {
    const currentUser = getCurrentAccount()
    if (currentUser) {
      const userDetail = await getUserData({ pastelId: currentUser.pastelId })
      if (userDetail) {
        setUser(userDetail)
      }
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const chunkQuantity = 500
      const results = await fetchPastelIDAndPrivateKeys()
      if (results) {
        const chunks = splitStringIntoChunks(results, chunkQuantity)
        setQRcodeData(chunks)
      }
    }
    if (!qrcodeData.length) {
      fetchData()
        .then(() => {
          // noop
        })
        .catch(() => {
          // noop
        })
        .finally(() => {
          // noop
        })
    }

    fetchUserData()
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      })
      .finally(() => {
        // noop
      })
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
                Restore your account and {currencyName} addresses from a backup
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
      {tab === Tabs.general && (
        <ProfileGeneral user={user} updateUserData={fetchUserData} />
      )}
      {tab === Tabs.board && (
        <MyComments user={user} updateUserData={fetchUserData} />
      )}
      {tab === Tabs.security && (
        <MySecurity currencyName={currencyName} qrcodeData={qrcodeData} />
      )}
      <RestoreModal modalIsOpen={modalIsOpen} onCloseModal={setModalIsOpen} />
    </div>
  )
}
