import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelSpriteEditorToolModal.module.css'
import { closePastelSpriteEditorToolModal } from './PastelSpriteEditorToolModalSlice'

export default function PastelSpriteEditorToolModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(
    state => state.pastelSpriteEditorToolModal,
  )
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closePastelSpriteEditorToolModal())}
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
        <div className={styles.iframe}>
          <iframe src='https://www.spritemate.com/' />
        </div>
      </div>
    </Modal>
  )
}
