import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import cn from 'classnames'
import ButtonClose from 'common/components/Buttons/CloseButton'
import iconInfo from 'common/assets/icons/ico-info.svg'

ReactModal.setAppElement('#root')

export type TModal = {
  isOpen: boolean
  handleClose?: () => void
  size?: string
  children?: ReactNode
  title?: ReactNode
  infoIcon?: boolean
}

const Modal: React.FC<TModal> = ({
  isOpen,
  handleClose,
  size,
  children,
  title,
  infoIcon,
}) => {
  const modalClasses = cn({
    'relative bg-white rounded-2xl shadow-xSmall max-h-full py-8 overflow-auto mx-auto focus:outline-none': true,
    [`w-${size}`]: size,
  })

  return (
    <ReactModal
      isOpen={isOpen}
      className={modalClasses}
      overlayClassName='fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-1a bg-opacity-60 p-4'
      contentLabel='modal'
      onRequestClose={handleClose}
    >
      <div className='flex justify-between px-10 pb-6'>
        <div className='text-h2 mt-2 font-bold whitespace-pre leading-tight flex items-end'>
          {title}
          {infoIcon ? <img src={iconInfo} className='ml-14px mb-6px' /> : ''}
        </div>
        <ButtonClose className='-mt-4 -mr-4' onClick={handleClose} />
      </div>
      <div className='px-10'>{children}</div>
    </ReactModal>
  )
}

export default Modal
