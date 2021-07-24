import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useKey } from 'react-use'
import cn from 'classnames'
import { X } from 'common/components/Icons'

export type TAnimatedModalProps = {
  open: boolean
  onClose?(): void
  render(): React.ReactNode
  className?: string
  closeButton?: boolean
  easyToClose?: boolean // close by clicking on background or pressing Esc
}

const AnimatedModal = (props: TAnimatedModalProps): JSX.Element | null => {
  // local open state is for closing animation
  const [localOpen, setLocalOpen] = useState(props.open)

  if (!props.open && !localOpen) {
    return null
  }

  // logic is moved to separate component to init hooks, functions, variables only when AnimatedModal is open
  return <AnimatedModalInner {...props} setLocalOpen={setLocalOpen} />
}

export default AnimatedModal

const AnimatedModalInner = ({
  open,
  onClose,
  closeButton,
  easyToClose,
  render,
  className,
  setLocalOpen,
}: TAnimatedModalProps & { setLocalOpen(open: boolean): void }) => {
  const modalRef = useRef<HTMLDivElement>()

  useEffect(() => {
    if (!open) {
      const el = modalRef.current
      if (!el) {
        return
      }

      el.classList.add('opacity-0')
      el.addEventListener(
        'transitionend',
        () => {
          setLocalOpen(false)
        },
        {
          once: true,
        },
      )
    }
  }, [open])

  useKey('Escape', () => easyToClose && onClose?.())

  const setModalRef = (el: HTMLDivElement | null) => {
    modalRef.current = el || undefined
    if (el) {
      setLocalOpen(true)
      el.getBoundingClientRect()
      el.classList.remove('opacity-0')
    }
  }

  const onClickBackground = (e: MouseEvent) => {
    if (easyToClose && e.target === modalRef.current) {
      onClose?.()
    }
  }

  return (
    <div
      ref={setModalRef}
      className='fixed inset-0 z-50 bg-gray-1a bg-opacity-60 transition duration-200 opacity-0'
      onClick={onClickBackground}
    >
      <div className='overflow-auto relative h-full w-full z-10'>
        <div className='min-h-full py-10 flex-center'>
          <div className={cn('relative', className)}>
            {closeButton && (
              <button
                className='absolute top-6 right-6 flex-center w-7 h-7 rounded-md transition duration-200 text-gray-55 bg-white border border-gray-ec hover:border-gray-8e hover:bg-gray-f6 active:bg-gray-f6 active:border-gray-55'
                onClick={onClose}
              >
                <X size={8} />
              </button>
            )}
            {render()}
          </div>
        </div>
      </div>
    </div>
  )
}
