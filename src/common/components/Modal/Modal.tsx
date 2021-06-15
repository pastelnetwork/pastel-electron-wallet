import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
// Components
import { CloseButton } from '../Buttons'

ReactModal.setAppElement('#root')

export type TModal = {
  isOpen: boolean
  handleClose?: React.MouseEventHandler<Element>
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children?: ReactNode
}

const Modal: React.FC<TModal> = ({ isOpen, handleClose, size, children }) => {
  const modalClasses = cn({
    'relative bg-white rounded-2xl shadow-xSmall w-full max-h-full py-8 px-12 overflow-auto mx-auto': true,
    [`max-w-${size}`]: size,
  })

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalClasses}
      overlayClassName='fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-a6'
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
