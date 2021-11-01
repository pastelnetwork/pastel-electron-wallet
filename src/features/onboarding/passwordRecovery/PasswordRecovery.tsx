import React, { useState } from 'react'
import shallow from 'zustand/shallow'

import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import CloseButton from '../common/closeButton'
import * as ROUTES from 'common/utils/constants/routes'
import RestoreByUpload from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByUpload'
import RestoreByCamera from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByCamera'
import RestoreByPdf from '../../profile/mySecurity/restorePrivateKeyAndPastelID/RestoreByPdf'
import { useRegisterStore } from '../register/Register.store'

enum Tabs {
  selectPDF,
  scanQRCodeVideo,
  selectQRCodeVideo,
}

const tabs = [
  { label: 'Crypto Keys' },
  { label: 'QR-Code' },
  { label: 'QR Code Video' },
]

export default function PasswordRecovery(): JSX.Element {
  const store = useRegisterStore(
    state => ({
      setPastelId: state.setPastelId,
    }),
    shallow,
  )
  const [turnOffCamera, setTurnOffCamera] = useState(false)
  const [tab, setTab] = useState(Tabs.selectPDF)

  const onTabToggle = (index: number) => {
    setTurnOffCamera(false)
    setTab(index)
    if (index !== Tabs.scanQRCodeVideo) {
      setTurnOffCamera(true)
    }
  }

  return (
    <div className='mx-60px my-11 w-517px'>
      <CloseButton gotoUrl={ROUTES.LOGIN} />
      <div className='font-extrabold text-gray-2d text-h1-heavy'>
        Password Recovery
      </div>
      <div className='text-gray-71 text-h5'>Choose your recovery method</div>
      <div className='mt-[19px]'>
        <MultiToggleSwitch
          data={tabs}
          activeIndex={tab}
          onToggle={onTabToggle}
          itemActiveClassName='bg-gray-4a rounded-full text-white'
          countInactiveClassName='bg-warning-hover font-extrabold'
        />
      </div>
      {tab === Tabs.selectPDF && (
        <div className='mt-[30px]'>
          <RestoreByPdf
            redirectTo={ROUTES.NEW_PASSWORD}
            setPastelId={store.setPastelId}
          />
        </div>
      )}
      {tab === Tabs.scanQRCodeVideo && (
        <div className='mt-[30px]'>
          <RestoreByCamera
            redirectTo={ROUTES.NEW_PASSWORD}
            setPastelId={store.setPastelId}
            turnOffCamera={turnOffCamera}
          />
        </div>
      )}
      {tab === Tabs.selectQRCodeVideo && (
        <div className='mt-[30px]'>
          <RestoreByUpload
            redirectTo={ROUTES.NEW_PASSWORD}
            setPastelId={store.setPastelId}
          />
        </div>
      )}
    </div>
  )
}
