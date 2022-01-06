import React, { useCallback } from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelSpriteEditorToolModal.module.css'
import { closePastelSpriteEditorToolModal } from './PastelSpriteEditorToolModalSlice'

export default function PastelSpriteEditorToolModal(): JSX.Element | null {
  const { modalIsOpen } = useAppSelector(
    state => state.pastelSpriteEditorToolModal,
  )
  const dispatch = useAppDispatch()

  const onCloseModal = useCallback(() => {
    dispatch(closePastelSpriteEditorToolModal())
  }, [])

  if (!modalIsOpen) {
    return null
  }

  const renderIframeContent = () => (
    <div className={styles.iframe}>
      <iframe src='https://www.spritemate.com/' title='Spritemate tool' />
    </div>
  )

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      className={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closePastelSpriteEditorToolModal())}
        >
          X
        </button>
        {renderIframeContent()}
      </div>
    </Modal>
  )
}
