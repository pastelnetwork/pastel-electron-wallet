import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import RestoreByUpload from './RestoreByUpload'
import RestoreByCamera from './RestoreByCamera'
import RestoreByPdf from './RestoreByPdf'
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
  const [turnOffCamera, setTurnOffCamera] = useState(false)

  useEffect(() => {
    if (modalIsOpen) {
      setSelectedRestoreType('')
      setTurnOffCamera(false)
    }
  }, [modalIsOpen])

  const handleCloseModal = (state: boolean) => {
    setTurnOffCamera(true)
    onCloseModal(state)
  }

  return (
    <Modal
      open={modalIsOpen}
      onClose={() => handleCloseModal(false)}
      closeButton
      render={() => (
        <div
          className={cn(
            'paper p-10',
            selectedRestoreType ? 'w-[690px]' : 'w-[791px]',
          )}
        >
          <div className='pt-5'>
            {!selectedRestoreType ? (
              <div>
                <div className='text-gray-800 text-2xl font-extrabold mb-3'>
                  Restore your keys
                </div>
                <div className='font-medium text-sm text-gray-33 opacity-50'>
                  Please select restore method below.
                </div>
                <div className='text-center mt-6 flex justify-center'>
                  <div className='mr-4 w-1/3'>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => setSelectedRestoreType('pdf')}
                    >
                      Select PDF Keys
                    </Button>
                  </div>
                  <div className='mr-4 w-1/3'>
                    <Button
                      className='w-full font-extrabold'
                      onClick={() => setSelectedRestoreType('upload')}
                    >
                      Select QR Code Video
                    </Button>
                  </div>
                  <div className='w-1/3'>
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
                    turnOffCamera={turnOffCamera}
                    onBack={() => {
                      setSelectedRestoreType('')
                    }}
                  />
                ) : null}
                {selectedRestoreType === 'pdf' ? (
                  <RestoreByPdf
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
