import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './GlitchImageModal.module.css'
import { closeGlitchImageModal } from './GlitchImageModalSlice'

import { glitch } from '../constants/ServeStatic'

export default function glitchImageModal(): JSX.Element | null {
  const { modalIsOpen } = useAppSelector(state => state.glitchImageModal)
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return null
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
          <iframe src={`http://localhost:${glitch.staticPort}/`} />
        </div>
      </div>
    </Modal>
  )
}
