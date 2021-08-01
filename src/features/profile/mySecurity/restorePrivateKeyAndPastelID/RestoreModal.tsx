import React, { useState, useEffect } from 'react'

import RestoreByUpload from './RestoreByUpload'
import RestoreByCamera from './RestoreByCamera'
import RestoreByPdf from './RestoreByPdf'
import { TRPCConfig } from '../../Profile'
import Modal from 'common/components/AnimatedModal'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'

type TRestoreModalProps = {
  rpcConfig: TRPCConfig
  modalIsOpen: boolean
  onCloseModal: (val: boolean) => void
}

enum Tabs {
  scanQRCodeVideo,
  selectPDF,
  selectQRCodeVideo,
}

const tabs = [
  { label: 'QR-Code' },
  { label: 'Crypto Keys' },
  { label: 'QR Code Video' },
]

export default function RestoreModal({
  rpcConfig,
  modalIsOpen,
  onCloseModal,
}: TRestoreModalProps): JSX.Element | null {
  const [turnOffCamera, setTurnOffCamera] = useState(false)
  const [tab, setTab] = useState(Tabs.selectPDF)

  useEffect(() => {
    if (modalIsOpen) {
      setTurnOffCamera(false)
    }
  }, [modalIsOpen])

  const handleCloseModal = (state: boolean) => {
    setTurnOffCamera(true)
    onCloseModal(state)
  }

  const onTabToggle = (index: number) => {
    setTab(index)
  }

  const routes = {
    data: tabs,
    activeIndex: tab,
    onToggle: onTabToggle,
  }

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => handleCloseModal(false)}
      closeButton
      render={() => (
        <div className='paper p-10 w-[556px]'>
          <div className='pt-5'>
            <div>
              <div className='text-gray-2d text-32px leading-10 font-extrabold mb-4'>
                Restore your account
              </div>
              <div className='font-normal text-h5 leading-6 text-gray-71'>
                Choose your restore method
              </div>
              <div className='mt-20px'>
                <MultiToggleSwitch {...routes} />
              </div>
            </div>
            <div className='mt-28px'>
              {tab === Tabs.selectQRCodeVideo ? (
                <RestoreByUpload rpcConfig={rpcConfig} />
              ) : null}
              {tab === Tabs.scanQRCodeVideo ? (
                <RestoreByCamera
                  rpcConfig={rpcConfig}
                  turnOffCamera={turnOffCamera}
                />
              ) : null}
              {tab === Tabs.selectPDF ? (
                <RestoreByPdf rpcConfig={rpcConfig} />
              ) : null}
            </div>
          </div>
        </div>
      )}
    />
  )
}
