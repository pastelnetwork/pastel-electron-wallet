import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
// Components
import { CloseButton } from '../Buttons'

ReactModal.setAppElement('#root')

export type TModal = {
  isOpen: boolean
  handleClose?: React.MouseEventHandler
  children?: ReactNode
  className?: string
  overlayClassName?: string
}

const Modal = ({
  isOpen,
  handleClose,
  children,
  className,
  overlayClassName,
}: TModal): JSX.Element => {
  const modalClasses = cn(
    className,
    'relative bg-white rounded-2xl shadow-xSmall w-full max-h-full py-8 px-12 overflow-auto mx-auto',
  )

  const modalOverlayClassName = cn(
    'fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-a6',
    overlayClassName,
  )

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalClasses}
      overlayClassName={modalOverlayClassName}
      onRequestClose={handleClose}
    >
      <CloseButton
        onClick={handleClose}
        className='absolute md:right-5 right-3 md:top-5 top-3 '
      />
      {children}
    </ReactModal>
  )
}

export default Modal
