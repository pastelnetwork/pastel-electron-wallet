import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelSquooshToolModal.module.css'
import { closePastelSquooshToolModal } from './PastelSquooshToolModalSlice'

export default function PastelSquooshToolModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(
    state => state.pastelSquooshToolModal,
  )
  const dispatch = useAppDispatch()

  if (!modalIsOpen) {
    return <></>
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => dispatch(closePastelSquooshToolModal())}
      className={styles.modalWrapper}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closePastelSquooshToolModal())}
        >
          X
        </button>
        <div className={styles.iframe}>
          <iframe src='https://squoosh.app/' />
        </div>
      </div>
    </Modal>
  )
}
