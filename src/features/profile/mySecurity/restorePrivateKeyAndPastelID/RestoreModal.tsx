import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import RestoreByUpload from './RestoreByUpload'
import RestoreByCamera from './RestoreByCamera'
import RestoreByPdf from './RestoreByPdf'
import Modal from 'common/components/AnimatedModal'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'

type TRestoreModalProps = {
  modalIsOpen: boolean
  onCloseModal: (val: boolean) => void
}

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

export default function RestoreModal({
  modalIsOpen,
  onCloseModal,
}: TRestoreModalProps): JSX.Element | null {
  const [turnOffCamera, setTurnOffCamera] = useState(false)
  const [tab, setTab] = useState(Tabs.selectPDF)
  const [hideHeader, setHideHeader] = useState(false)

  useEffect(() => {
    if (modalIsOpen) {
      setTab(Tabs.selectPDF)
      setHideHeader(false)
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
            {!hideHeader && (
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
            )}

            <div className={cn(!hideHeader ? 'mt-28px' : '')}>
              {tab === Tabs.selectQRCodeVideo ? (
                <RestoreByUpload onHideHeader={setHideHeader} />
              ) : null}
              {tab === Tabs.scanQRCodeVideo ? (
                <RestoreByCamera
                  turnOffCamera={turnOffCamera}
                  onHideHeader={setHideHeader}
                />
              ) : null}
              {tab === Tabs.selectPDF ? (
                <RestoreByPdf onHideHeader={setHideHeader} />
              ) : null}
            </div>
          </div>
        </div>
      )}
    />
  )
}
