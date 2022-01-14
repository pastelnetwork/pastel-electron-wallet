import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import ProfileCard from '../components/MyProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral, {
  TCurrency,
} from '../components/MyProfileGeneral/MyProfileGeneral'
import { TOption } from '../../../common/components/Select'
import { TGetResponse } from 'api/walletNode/userData'
import { walletNodeApi } from 'api/walletNode/walletNode.api'

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
  const [isLoading, setLoading] = useState(false)
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

  const handleUpdateUserData = async () => {
    if (userData) {
      setLoading(true)
      delete userData['username']
      try {
        await walletNodeApi.userData.update({
          ...userData,
          categories: userData.categories.join(','),
        })
        updateUserData()
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
        setLoading(false)
      }
    }
  }

  const handleNativeCurrencyChange = (option: TOption | null) => {
    setNativeCurrency(option)
    if (userData) {
      setUserData({
        ...userData,
        native_currency: option?.value || '',
      })
    }
  }

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
        handleUpdateUserData={handleUpdateUserData}
        setUserData={setUserData}
        user={user}
        userData={userData}
        isLoading={isLoading}
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
