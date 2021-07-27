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
  titleClassName?: string
  headerClassName?: string
  bodyClassName?: string
  append?: ReactNode
}

const Modal = ({
  isOpen,
  handleClose,
  size,
  children,
  title,
  infoIcon,
  titleClassName = 'text-h2 mt-2 font-bold',
  headerClassName = 'px-10 pb-6',
  bodyClassName = 'px-10',
  append,
}: TModal): JSX.Element => {
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
      style={{
        content: {
          width: size,
        },
      }}
      onRequestClose={handleClose}
    >
      <div className={cn('flex justify-between', headerClassName)}>
        <div className={cn('leading-tight flex items-end', titleClassName)}>
          {title}
          {infoIcon ? <img src={iconInfo} className='ml-14px mb-6px' /> : ''}
          {append}
        </div>
        <ButtonClose className='-mt-4 -mr-4' onClick={handleClose} />
      </div>
      <div className={bodyClassName}>{children}</div>
    </ReactModal>
  )
}

export default Modal
