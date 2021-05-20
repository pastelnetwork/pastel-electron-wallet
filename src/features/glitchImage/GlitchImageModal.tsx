import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './GlitchImageModal.module.css'
import { closeGlitchImageModal } from './GlitchImageModalSlice'

export default function glitchImageModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.glitchImageModal)
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closeGlitchImageModal())}
      className={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closeGlitchImageModal())}
        >
          X
        </button>
        <div className={styles.iframe}>
          <iframe src={'http://localhost:5102/'} />
        </div>
      </div>
    </Modal>
  )
}
