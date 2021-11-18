import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './GlitchImageModal.module.css'
import { closeGlitchImageModal } from './GlitchImageModalSlice'

import { glitch } from '../../common/constants/ServeStatic'

export default function GlitchImageModal(): JSX.Element | null {
  const { modalIsOpen } = useAppSelector(state => state.glitchImageModal)
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return null
  }

  const renderIframeContent = () => {
    const port: string = glitch.staticPort?.toString() || ''
    return (
      <div className={styles.iframe}>
        <iframe src={`http://localhost:${port}/`} title='Glitch Image Tool' />
      </div>
    )
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
        {renderIframeContent()}
      </div>
    </Modal>
  )
}
