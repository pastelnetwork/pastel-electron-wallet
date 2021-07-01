import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './squooshToolModal.module.css'
import { closeSquooshToolModal } from './squooshToolModalSlice'

import { squoosh } from '../../common/constants/ServeStatic'

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
          <iframe src={`http://localhost:${squoosh.staticPort}/`} />
        </div>
      </div>
    </Modal>
  )
}
