import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import './Modal.css'
// Components
import { CloseButton } from '../../../common/components/Buttons'

ReactModal.setAppElement('#root')

export type TModalProps = {
  isOpen: boolean
  handleClose?: () => void
  children?: ReactNode
  title?: string
  classNames?: string
}

const TitleModal = ({
  isOpen,
  handleClose,
  children,
  title,
  classNames,
}: TModalProps): JSX.Element => {
  const modalClasses = cn(
    'z-50 relative bg-white rounded-2xl shadow-xSmall w-full max-h-full pt-10 pb-30px overflow-auto mx-auto focus:outline-none',
    classNames,
  )

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalClasses}
      overlayClassName='fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-1a bg-opacity-60 p-4'
      contentLabel='modal'
      onRequestClose={handleClose}
    >
      <div className='flex justify-between items-center px-10 pb-6'>
        <div className='text-h2 leading-none font-bold'>{title}</div>
        <CloseButton
          onClick={handleClose}
          className='absolute top-6 right-[26px]'
        />
      </div>
      <div className='pl-10 pr-18px'>{children}</div>
    </ReactModal>
  )
}

export default TitleModal
