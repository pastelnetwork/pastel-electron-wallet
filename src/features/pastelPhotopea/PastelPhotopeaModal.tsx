import React from 'react'
import Modal from 'react-modal'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import styles from './PastelPhotopeaModal.module.css'
import { closePastelPhotopeaModal } from './PastelPhotopeaModalSlice'

export default function PastelPhotopeaModal(): JSX.Element {
  const { modalIsOpen } = useAppSelector(state => state.pastelPhotopeaModal)
  const dispatch = useAppDispatch()

  return (
    <Modal
      isOpen
      onRequestClose={() => dispatch(closePastelPhotopeaModal())}
      className={styles.modalWrapper}
      overlayClassName={`${styles.overlay} ${modalIsOpen ? styles.open : ''}`}
    >
      <div className={styles.modalContent}>
        <button
          type='button'
          className={styles.btn_close}
          onClick={() => dispatch(closePastelPhotopeaModal())}
        >
          X
        </button>
        <div className={styles.iframe}>
          <iframe id='photopea' src='https://www.photopea.com' />
        </div>
      </div>
    </Modal>
  )
}
