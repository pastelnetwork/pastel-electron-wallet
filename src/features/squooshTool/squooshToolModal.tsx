import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './squooshToolModal.module.css'
import { closeSquooshToolModal } from './squooshToolModalSlice'

export default function squooshToolModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.squooshToolModal)
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closeSquooshToolModal())}
      className={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closeSquooshToolModal())}
        >
          X
        </button>
        <div className={styles.iframe}>
          <iframe
            src={`${window.location.protocol}//${window.location.hostname}:5100/`}
          />
        </div>
      </div>
    </Modal>
  )
}
