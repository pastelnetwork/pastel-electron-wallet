import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'

import RestoreByUpload from './RestoreByUpload'
import RestoreByCamera from './RestoreByCamera'
import RestoreByPdf from './RestoreByPdf'
import Modal from 'common/components/AnimatedModal'
import MultiToggleSwitch from 'common/components/MultiToggleSwitch'
import { translate } from 'features/app/translations'

type TRestoreModalProps = {
  modalIsOpen: boolean
  onCloseModal: (val: boolean) => void
}

enum Tabs {
  selectPDF,
  scanQRCodeVideo,
  selectQRCodeVideo,
}

export default function RestoreModal({
  modalIsOpen,
  onCloseModal,
}: TRestoreModalProps): JSX.Element | null {
  const tabs = [
    { label: translate('cryptoKeys') },
    { label: translate('qrCode') },
    { label: translate('qrCodeVideo') },
  ]
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

  const renderContentModal = useCallback(
    () => (
      <div className='paper p-10 w-[556px]'>
        <div className='pt-5'>
          {!hideHeader && (
            <div>
              <div className='text-gray-2d text-32px leading-10 font-extrabold mb-4'>
                {translate('restoreYourAccountButton')}
              </div>
              <div className='font-normal text-h5 leading-6 text-gray-71'>
                {translate('chooseYourRestoreMethod')}
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
    ),
    [tab, turnOffCamera, hideHeader],
  )

  const onClose = useCallback(() => {
    handleCloseModal(false)
  }, [])

  return (
    <Modal
      open={modalIsOpen}
      onClose={onClose}
      closeButton
      render={renderContentModal}
    />
  )
}
