import React, { useState } from 'react'
import ProfileCard from '../components/MyProfileCard'
import ProfileRelations from '../components/ProfileRelations'
import ProfileGeneral, {
  TCurrency,
} from '../components/MyProfileGeneral/MyProfileGeneral'
import { TOption } from '../../../common/components/Select'

export const nativeCurrencyOptions: TOption[] = [
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
  {
    label: 'USD',
    value: 'USD',
  },
]

const Profile = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false)
  const [nativeCurrency, setNativeCurrency] = useState<TOption | null>(
    nativeCurrencyOptions[0],
  )

  const isEmpty = false
  const currency = nativeCurrency?.value as TCurrency
  return (
    <div className='flex flex-col flex-grow items-center'>
      <div className='wrapper flex px-60px pb-8 justify-center pt-9 w-full'>
        <div className='flex flex-col items-center'>
          <ProfileCard
            editMode={editMode}
            setEditMode={setEditMode}
            isEmpty={isEmpty}
            nativeCurrencyOptions={nativeCurrencyOptions}
            nativeCurrency={nativeCurrency}
            onNativeCurrencyChange={setNativeCurrency}
          />
        </div>
        <div className='flex pl-80px justify-between flex-col lg:flex-row flex-grow'>
          <ProfileGeneral
            editMode={editMode}
            isEmpty={isEmpty}
            nativeCurrency={currency}
          />
          <ProfileRelations isEmpty={isEmpty} />
        </div>
      </div>
    </div>
  )
}

export default Profile
