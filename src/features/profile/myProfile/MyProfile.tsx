import React, { useState, useEffect, useCallback } from 'react'

import ProfileCard from '../components/MyProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral, {
  TCurrency,
} from '../components/MyProfileGeneral/MyProfileGeneral'
import { TOption } from '../../../common/components/Select'
import { TGetResponse } from 'api/walletNode/userData'

export const nativeCurrencyOptions: TOption[] = [
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
  {
    label: 'CNY',
    value: 'CNY',
  },
  {
    label: 'JPY',
    value: 'JPY',
  },
  {
    label: 'GBP',
    value: 'GBP',
  },
  {
    label: 'AUD',
    value: 'AUD',
  },
  {
    label: 'NGN',
    value: 'NGN',
  },
  {
    label: 'IDR',
    value: 'IDR',
  },
]

function Profile({
  user,
  updateUserData,
}: {
  user?: TGetResponse
  updateUserData: () => void
}): JSX.Element {
  const [editMode, setEditMode] = useState(false)
  const userCurrency = nativeCurrencyOptions.find(
    c => c.value === user?.native_currency,
  )
  const [nativeCurrency, setNativeCurrency] = useState<TOption | null>(
    userCurrency || nativeCurrencyOptions[0],
  )
  const [userData, setUserData] = useState<TGetResponse | undefined>()
  const currency = nativeCurrency?.value as TCurrency

  useEffect(() => {
    if (user && !userData) {
      setUserData(user)
    }
  }, [user])

  const handleNativeCurrencyChange = useCallback(
    (option: TOption | null) => {
      setNativeCurrency(option)
      if (userData) {
        setUserData({
          ...userData,
          native_currency: option?.value || '',
        })
      }
    },
    [userData],
  )

  const renderProfileContent = () => (
    <div className='flex pl-80px justify-between flex-col lg:flex-row flex-grow'>
      <ProfileGeneral
        editMode={editMode}
        nativeCurrency={currency}
        user={user}
        setUserData={setUserData}
        userData={userData}
      />
      <ProfileRelations />
    </div>
  )

  const renderProfileCard = () => (
    <div className='flex flex-col items-center'>
      <ProfileCard
        editMode={editMode}
        setEditMode={setEditMode}
        nativeCurrencyOptions={nativeCurrencyOptions}
        nativeCurrency={nativeCurrency}
        onNativeCurrencyChange={handleNativeCurrencyChange}
        handleUpdateUserData={updateUserData}
        user={user}
        userData={userData}
      />
    </div>
  )

  return (
    <div className='flex flex-col flex-grow items-center'>
      <div className='wrapper flex px-60px pb-8 justify-center pt-9 w-full'>
        {renderProfileCard()}
        {renderProfileContent()}
      </div>
    </div>
  )
}

export default Profile

Profile.defaultProps = {
  user: undefined,
}
