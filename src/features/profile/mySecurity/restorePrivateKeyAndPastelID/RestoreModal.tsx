import React, { useState, useEffect } from 'react'

import RestoreByUpload from './RestoreByUpload'
import RestoreByCamera from './RestoreByCamera'
import { TRPCConfig } from '../../Profile'
import Modal from '../../../../common/components/AnimatedModal'
import { Button } from '../../../../common/components/Buttons'

type TRestoreModalProps = {
  rpcConfig: TRPCConfig
  modalIsOpen: boolean
  onCloseModal: (val: boolean) => void
}

export default function RestoreModal({
  rpcConfig,
  modalIsOpen,
  onCloseModal,
}: TRestoreModalProps): JSX.Element | null {
  const [selectedRestoreType, setSelectedRestoreType] = useState('')

  useEffect(() => {
    if (modalIsOpen) {
      setSelectedRestoreType('')
    }
  }, [modalIsOpen])

  const handleCloseModal = (state: boolean) => {
    onCloseModal(state)
  }

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => handleCloseModal(false)}
      closeButton
      render={() => (
        <div className='paper p-10 w-[690px]'>
          <div className='py-5'>
            {!selectedRestoreType ? (
              <div>
                <div className='text-gray-800 text-2xl font-extrabold mb-3'>
                  Restore your keys
                </div>
                <div className='font-medium text-sm text-gray-33 opacity-50'>
                  Please select restore method below.
                </div>
                <div className='text-center mt-6'>
                  <div>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => setSelectedRestoreType('upload')}
                    >
                      Upload QR Code Video
                    </Button>
                  </div>
                  <div className='mt-4'>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => setSelectedRestoreType('scan')}
                    >
                      Scan QR Code Video
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {selectedRestoreType === 'upload' ? (
                  <RestoreByUpload
                    rpcConfig={rpcConfig}
                    onBack={() => setSelectedRestoreType('')}
                  />
                ) : null}
                {selectedRestoreType === 'scan' ? (
                  <RestoreByCamera
                    rpcConfig={rpcConfig}
                    onBack={() => {
                      setSelectedRestoreType('')
                    }}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    />
  )
}
