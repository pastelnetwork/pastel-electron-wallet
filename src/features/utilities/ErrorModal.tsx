import React from 'react'

import { TitleModal } from 'common/components/Modal'
import { translate } from 'features/app/translations'
import error from 'common/assets/icons/ico-error.svg'

type TErrorModal = {
  message: string
  isOpen: boolean
  closeModal: () => void
}

export default function ErrorModal({
  message,
  isOpen,
  closeModal,
}: TErrorModal): JSX.Element | null {
  if (!isOpen) {
    return null
  }

  const renderMessageContent = () => (
    <div className='mt-6 text-center'>
      <div>
        <img
          src={error}
          alt='Restore failed'
          className='w-54px h-54px mx-auto'
        />
      </div>
      <div className='text-gray-800 text-2xl font-extrabold mt-26px'>
        {message}
      </div>
    </div>
  )

  return (
    <TitleModal
      isOpen={isOpen}
      handleClose={closeModal}
      classNames='max-w-[700px]'
    >
      <div className='mt-2 text-center text-gray-800 text-2xl font-extrabold mb-0.5'>
        {translate('errorExportingTransactions')}
      </div>
      {renderMessageContent()}
    </TitleModal>
  )
}
