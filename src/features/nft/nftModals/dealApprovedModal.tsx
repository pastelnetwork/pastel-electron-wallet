import React from 'react'
import parse from 'html-react-parser'
// Components
import { Congratulation } from 'common/components/Icons/Congratulation'
import { Modal } from 'common/components/Modal'
import { translate } from 'features/app/translations'

export type TDealApprovedModal = {
  content?: string
  isOpen: boolean
  handleClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function DealApprovedModal({
  content,
  isOpen,
  handleClose,
}: TDealApprovedModal): JSX.Element {
  const renderCongratulationsContent = () => (
    <h2 className='mb-2 text-gray-2d'>
      {parse(translate('dealApprovedModalCongratulationsMessage'))}
    </h2>
  )

  const renderCongratulationsIcon = () => (
    <div className='flex justify-center'>
      <div className='w-[50px] h-[50px] bg-blue-e7 flex items-center justify-center rounded-full'>
        <Congratulation size={24} className='text-gray-2d' />
      </div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} className='max-w-md'>
      <div className='text-center'>
        {renderCongratulationsIcon()}

        {renderCongratulationsContent()}
        <p className='text-gray-71 text-lg'>{content}</p>
      </div>
    </Modal>
  )
}

export default DealApprovedModal
