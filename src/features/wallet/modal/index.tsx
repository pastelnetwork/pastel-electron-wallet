import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
// Components
import ButtonClose from '../../../common/components/button-close'

ReactModal.setAppElement('#root')

export type TModalProps = {
  isOpen: boolean
  handleClose?: () => void
  size?: string
  children?: ReactNode
  title?: string
}

const Modal: React.FC<TModalProps> = ({
  isOpen,
  handleClose,
  size,
  children,
  title,
}) => {
  const modalClasses = cn({
    'relative bg-white rounded-2xl shadow-xSmall w-full max-h-full py-8 overflow-auto mx-auto focus:outline-none': true,
    [`max-w-${size}`]: size,
  })

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
        <ButtonClose onClick={handleClose} />
      </div>
      <div className='px-10'>{children}</div>
    </ReactModal>
  )
}

export default Modal
