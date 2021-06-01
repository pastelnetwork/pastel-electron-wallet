import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
// Components
import ButtonClose from '../ButtonClose'

ReactModal.setAppElement('#root')

export interface ModalProps {
  isOpen: boolean
  handleClose?: React.MouseEventHandler<Element>
  size?: string
  children?: ReactNode
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  size,
  children,
}) => {
  const modalClasses = cn({
    'relative bg-white rounded-2xl shadow-xSmall w-full max-h-full py-8 sm:px-12 px-4 overflow-auto mx-auto': true,
    [`max-w-${size}`]: size,
  })

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalClasses}
      overlayClassName='fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-500 p-4'
      onRequestClose={handleClose}
    >
      <ButtonClose
        onClick={handleClose}
        className='absolute md:right-5 right-3 md:top-5 top-3 '
      />
      {children}
    </ReactModal>
  )
}

export default Modal